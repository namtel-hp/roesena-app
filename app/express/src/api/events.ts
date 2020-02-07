import { Request, Response } from 'express';

import { getAllEvents } from '../db-access/events/get';
import { createEvent } from '../db-access/events/post';
import { dbEvent } from '../db-access/events/interface';

export async function events(req: Request, res: Response) {
  switch (req.method) {
    case 'GET':
      try {
        res.send(await getAllEvents());
      } catch (error) {
        res.statusCode = 500;
        res.send({ error });
      }
      break;
    case 'POST':
      try {
        const dbev: dbEvent = {
          id: 0,
          title: req.body.title,
          description: req.body.description,
          authorityLevel: parseInt(req.body.authorityLevel, 10),
          startDate: new Date(req.body.startDate),
          endDate: new Date(req.body.endDate)
        };
        res.send(await createEvent(dbev));
      } catch (error) {
        res.statusCode = 500;
        res.send({ error });
      }
      break;
    default:
      res.statusCode = 405;
      res.send({ error: 'method not supported' });
  }
}
