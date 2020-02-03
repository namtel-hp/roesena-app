import { ConnectionProvider } from '../connection';
import { dbEvent } from './interface';

export function getEventById(id: number): Promise<dbEvent> {
  return new Promise(async (resolve, reject) => {
    let connection = await ConnectionProvider.Instance.connection;
    // WHERE id = ${id}
    connection.query(`SELECT * from Events;`, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
