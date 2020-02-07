import { Request, Response } from 'express';

import { getEventById } from '../db-access/events/get';
import { deleteEventById } from '../db-access/events/delete';
import { updateEvent } from '../db-access/events/put';
import { dbEvent } from '../db-access/events/interface';

export async function event(req: Request, res: Response) {
  try {
    const id = parseInt(req.params['id'], 10);
    switch (req.method) {
      case 'GET':
        res.send(await getEventById(id));
        break;
      case 'DELETE':
        res.send({ deletedCount: await deleteEventById(id) });
        break;
      case 'PUT':
        const dbev: dbEvent = {
          id: 0,
          title: req.body.title,
          description: req.body.description,
          authorityLevel: parseInt(req.body.authorityLevel, 10),
          startDate: new Date(req.body.startDate),
          endDate: new Date(req.body.endDate)
        };
        res.send(await updateEvent(id, dbev));
        break;
      default:
        res.statusCode = 405;
        res.send({ error: 'method not supported' });
    }
  } catch (error) {
    res.statusCode = 500;
    res.send({ error });
  }
}
