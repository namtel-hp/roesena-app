import { ConnectionProvider } from '../connection';
import { dbEvent } from './interface';

export function getEventById(id: number): Promise<dbEvent> {
  return new Promise(async (resolve, reject) => {
    let connection = await ConnectionProvider.Instance.connection;
    connection.query(`SELECT * FROM Events WHERE id = ${id};`, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

export function getAllEvents(): Promise<dbEvent[]> {
  return new Promise(async (resolve, reject) => {
    let connection = await ConnectionProvider.Instance.connection;
    connection.query(`SELECT * FROM Events;`, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
