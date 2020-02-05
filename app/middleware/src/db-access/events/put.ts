import { ConnectionProvider } from '../connection';
import { dbEvent } from './interface';
import { toDbDate } from '../utils';

export function updateEvent(id: number, event: dbEvent): Promise<dbEvent> {
  return new Promise(async (resolve, reject) => {
    let connection = await ConnectionProvider.Instance.connection;
    connection.query(
      `UPDATE Events SET title = '${event.title}', description = '${event.description}', startDate = '${toDbDate(
        event.startDate
      )}', endDate = '${toDbDate(event.endDate)}', authorityLevel = ${event.authorityLevel} WHERE id = ${id};`,
      (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          event.id = id;
          resolve(event);
        }
      }
    );
  });
}
