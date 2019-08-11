export class QueryBuilder {

  constructor() {
    
  }

  public newAppointment(appointment): string {
    // if merge creates a new node, set all the appointment properties
    var queryArray: string [] = [];
    queryArray.push(
      `MERGE (el:Appointment {title: '${appointment.title}'})`,
      `ON CREATE SET`
    );
    var setProperties: string[] = [
      `el.description = '${appointment.description}'`,
      `el.startTime = '${appointment.start.time}'`,
      `el.startYear = '${appointment.start.date.year}'`,
      `el.startMonth = '${appointment.start.date.month}'`,
      `el.startDay = '${appointment.start.date.day}'`,
      `el.endTime = '${appointment.end.time}'`,
      `el.endYear = '${appointment.end.date.year}'`,
      `el.endMonth = '${appointment.end.date.month}'`,
      `el.endDay = '${appointment.end.date.day}'`
    ];
    if(appointment.participants) {
      // if the appointment has participants it also has a deadline
      setProperties.push(
        `el.deadlineYear = '${appointment.deadline.year}'`,
        `el.deadlineMonth = '${appointment.deadline.month}'`,
        `el.deadlineDay = '${appointment.deadline.day}'`
      );
      // add all the properties that have to be set to the query
      queryArray.push( setProperties.join(',\n') );
      // match all the participants
      queryArray.unshift(
        `MATCH p = (a:Person)`,
        `WHERE ${appointment.participants.map( el => `a.name = '${el.name}'` ).join(' OR ')}`
      );
      // create the realtionship between all the participants and the appointment with an empty "count" proterty
      queryArray.push(
        `FOREACH (n IN nodes(p)| CREATE (el)-[:includes {count: ''}]->(n))`
      );
    } else {
      // add all the properties that have to be set to the query
      queryArray.push( setProperties.join(',\n') );
    }
    return(queryArray.join('\n'));
  }

  public getPerson(name: string): string {
    if(name === '*') return `MATCH (n:Person) RETURN n.name as name`;
    return `MATCH (n:Person {name: '${name}'}) RETURN n.name as name`;
  }

  public getAppointment(title: string): string {
    var queryArray: string[] = [];
    // match all Appointments
    if(title === '*') queryArray.push('MATCH (a:Appointment)');
    // match only the Appointment with the right title
    else queryArray.push(`MATCH (a:Appointment {title: '${title}'})`);
    // if the Appointment also has realtionships with Persons match them aswell
    queryArray.push(
      'OPTIONAL MATCH (a)-[c:includes]->(b:Person)',
      'RETURN a as appointment, collect(b) as person, collect(c) as response'
    );
    return queryArray.join('\n');
  }

  public updateAppointment(oldTitle: string, appointment): string[] {
    // the relationships have to be handled in 2 queries, first change data and delete the old relations
    // then create the new relations in a transaction
    var query = [
      // get the Appointment and change the properties
      `MATCH (appo:Appointment {title: '${oldTitle}'})`,
      `SET`
    ];
    var setProperties: string[] = [
      `appo.title = '${appointment.title}'`,
      `appo.description = '${appointment.description}'`,
      `appo.startTime = '${appointment.start.time}'`,
      `appo.startYear = '${appointment.start.date.year}'`,
      `appo.startMonth = '${appointment.start.date.month}'`,
      `appo.startDay = '${appointment.start.date.day}'`,
      `appo.endTime = '${appointment.end.time}'`,
      `appo.endYear = '${appointment.end.date.year}'`,
      `appo.endMonth = '${appointment.end.date.month}'`,
      `appo.endDay = '${appointment.end.date.day}'`
    ];
    if(appointment.participants) {
      // if it has participants it also has a deadline
      setProperties.push(
        `appo.deadlineYear = '${appointment.deadline.year}'`,
        `appo.deadlineMonth = '${appointment.deadline.month}'`,
        `appo.deadlineDay = '${appointment.deadline.day}'`
      );
      query.push(
        // add all the properties that have to be set to the query
        setProperties.join(',\n')
        // if it is an event, remove all the now unused relationships
        + '\n' +
        [
          `WITH appo`,
          `MATCH (appo)-[el:includes]->(p:Person) WHERE p.name =~ '(?!${appointment.participants.map( el => el.name ).join('|')}).*'`,
          `DELETE el`
        ].join('\n')
      );
      // query.concat(
      // );
    } else {
      // add all the properties that have to be set to the query
      query.push( setProperties.join(',\n') );
    }
    var queryCollection: string [] = [ query.join('\n') ];
    if(appointment.participants) {
      appointment.participants.forEach( elem => {
        queryCollection.push([
          `MATCH (appo:Appointment {title: '${appointment.title}'}), (p:Person {name: '${elem.name}'})`,
          `MERGE (appo)-[el:includes]->(p)`,
          `ON CREATE SET el.count = ''`,
          `ON MATCH SET el.cout = '${elem.response ? elem.response : ""}'`
          // `SET el.count = ''`
        ].join('\n'));
      });
    }
    console.log(JSON.stringify(queryCollection));
    return queryCollection;
  }
}