import { ConnectionProvider } from '../connection';
import { dbEvent } from './interface';
import { toDbDate } from '../utils';

export function createEvent(event: dbEvent): Promise<dbEvent> {
  return new Promise(async (resolve, reject) => {
    let connection = await ConnectionProvider.Instance.connection;
    connection.query(
      `INSERT INTO Events (title, description, startDate, endDate, authorityLevel)
            VALUES ('${event.title}', '${event.description}', '${toDbDate(event.startDate)}', '${toDbDate(event.endDate)}', ${
        event.authorityLevel
      });`,
      (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          event.id = results.insertId;
          resolve(event);
        }
      }
    );
  });
}
