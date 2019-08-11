import { Record, ResultSummary } from 'neo4j-driver/types/v1';
import { Request, Response } from 'express';

import { QueryBuilder } from './query-builder';

import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import neo4j = require('neo4j-driver');

// create the Application that listens to the requests
const app: express.Application = express();
app.use(bodyParser.json());
app.use(cors({optionsSuccessStatus: 200}));
app.listen(3000, () => new Server() );

// establish connection to the neo4j database in the docker network
const databaseDriver = neo4j.v1.driver(
  'bolt://rsn-database:7687',
  neo4j.v1.auth.basic('neo4j', 'test')
);

class Server {

  public QueryBuilder = new QueryBuilder();

  constructor() {
    console.log('Backend started.');
    app.route('/api/appointments/:title').get( (req, res) => this.getAppointment(req, res) );
    app.route('/api/person/:name').get( (req, res) => this.getPerson(req, res) );
    app.route('/api/appointments').post( (req, res) => this.postAppointment(req, res) );
    app.route('/api/appointments/:title').put( (req, res) => this.updateAppointment(req, res) );
  }

  private updateAppointment(req: Request, res: Response) {
    console.log('PUT Appointment: ' + req.body.title);
    const querys = this.QueryBuilder.updateAppointment(req.params['title'], req.body);
    if(querys.length === 1) {
      this.runQuery(
        querys[0],
        () => {
          // update successful
          console.log("\x1b[32m%s\x1b[0m" ,"Done.");
          res.status(201).send(req.body);
        },
        (err) => {
          console.log('\x1b[31m%s\x1b[0m', `Connection to database failed.\nError: ${err.message}`);
          res.status(500).send(req.body);
        }
      )
    } else {
      this.runTransaction(
        querys,
        () => {
          console.log("\x1b[32m%s\x1b[0m" ,"Done.");
          res.status(201).send(req.body);
        },
        () => {
          console.log(querys);
          console.log('\x1b[31m%s\x1b[0m', `Connection to database failed.`);
          res.status(500).send(req.body);
        }
      );
    }
  }

  private postAppointment(req: Request, res: Response) {
    console.log('POST Appointment: ' + req.body.title);
    this.runQuery(
      this.QueryBuilder.newAppointment(req.body),
      (_, summary: ResultSummary<neo4j.v1.Integer>) => {
        if(summary.counters.nodesCreated() === 0) {
          // nothing was created because the "match" part of the merge found an appointment
          console.log("\x1b[33m%s\x1b[0m" ,"Appointment exists already.");
          res.status(409).send(req.body);
        } else {
          // new one was created
          console.log("\x1b[32m%s\x1b[0m" ,"Done.");
          res.status(201).send(req.body);
        }
      },
      (err: Error) => {
        console.log('\x1b[31m%s\x1b[0m', `Connection to database failed.\nError: ${err.message}`);
        res.status(500).send(req.body);
      }
    );
  }

  private getPerson(req: Request, res: Response) {
    // display in console that a request was recieved
    console.log('GET Person: ' + req.params['name']);
    this.runQuery(
      this.QueryBuilder.getPerson(req.params['name']),
      (records: Record[]) => {
        if(records.length === 0) {
          console.log("\x1b[33m%s\x1b[0m" ,"No Persons matched.");
          res.status(404).send(req.body);
        } else {
          console.log("\x1b[32m%s\x1b[0m" ,"Done.");
          const data: any[] = records.map( el => el.get('name') );
          // if data is only one element don't send it as array
          res.status(200).send(data.length === 1 ? data[0] : data);
        }
      },
      (err: Error) => {
        console.log('\x1b[31m%s\x1b[0m', `Connection to database failed.\nError: ${err.name}`);
        res.status(500).send(req.body);
      }
    );
  }

  private getAppointment(req: Request, res: Response) {
    // display in console that a request was recieved
    console.log('GET Appointment/Event: ' + req.params['title']);
    this.runQuery(
      this.QueryBuilder.getAppointment(req.params['title']),
      (records: Record[]) => {
        if(records.length === 0) {
          console.log("\x1b[33m%s\x1b[0m" ,"No Appointments matched.");
          res.status(404).send(req.body);
        } else {
          // var appos: any[] = [];
          console.log("\x1b[32m%s\x1b[0m" ,"Done.");
          // if data is only one element don't send it as array
          res.status(200).send(records.map( rec => transformToAppointment(rec) ));
        }
      },
      (err: Error) => {
        console.log('\x1b[31m%s\x1b[0m', `Connection to database failed.\nError: ${err.name}`);
        res.status(500).send(req.body);
      }
    );
  }

  private runQuery(
    query: string,
    onCompleteCallback: (data: Record[], summary: ResultSummary<neo4j.v1.Integer>) => void,
    onErrorCallback: (err: Error) => void
  ) {
    // create session to run statement in
    const session = databaseDriver.session();
    // the elements the query returned
    var responses: Record[] = [];
    // run the statement
    session.run(query).subscribe({
      onNext: (record: Record) => {
        responses.push(record);
      },
      onCompleted: (sum) => {
        session.close();
        onCompleteCallback(responses, sum);
      },
      onError: onErrorCallback
    });
  }

  private runTransaction(querys: string[], onSuccess: () => void, onErr: () => void): boolean {
    const session = databaseDriver.session();
    const transaction = session.beginTransaction();
    var successTracker: number = 0;
    querys.forEach( (query, index) => {
      transaction.run(query).subscribe({
        onCompleted: () => {
          console.log(index + ' completed');
          successTracker++;
          // everything was successful
          if(successTracker === querys.length) {
            console.log("committing!");
            transaction.commit();
            session.close();
            onSuccess();
          // some querys failed
          } else if(successTracker < 0) {
            transaction.rollback();
            console.log("rolling back!");
            onErr();
          }
        },
        onError: error => {
          console.log(index + "error" + error);
          successTracker = -1;
        }
      });
    });
    return true;
  }
}

function transformToAppointment(rec: Record): any {
  // the appointment data (and the deadline stuff if it's an event)
  var elem = rec.get('appointment').properties;
  if(rec.get('person').length > 0) {
    elem.participants = [];
    rec.get('person').forEach( (el, ind) => {
      // add the responses of the participants
      elem.participants.push({name: el.properties.name, response: rec.get('response')[ind].properties.count});
    });
  }
  return elem;
}