import { Request, Response } from 'express';

import { getEventById } from '../db-access/events/get';
import { createEvent } from '../db-access/events/post';
import { dbEvent } from '../db-access/events/interface';

export function events(req: Request, res: Response) {
  switch (req.method) {
    case 'GET':
      try {
        let id: number;
        id = parseInt(req.params['id'], 10);
        getEventById(id).then(val => {
          res.send(val);
        });
      } catch (e) {
        // bad request
        res.statusCode = 500;
        res.send({ error: 'id has to be an int' });
      }
      break;
    case 'POST':
      let dbev: dbEvent = {
        id: 0,
        title: req.body.title,
        description: req.body.description,
        authorityLevel: parseInt(req.body.authorityLevel, 10),
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate)
      };
      res.send(createEvent(dbev));
      break;
    default:
      res.statusCode = 404;
      res.send({ error: 'method not supported' });
  }
}
