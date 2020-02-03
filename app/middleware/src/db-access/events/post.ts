import { ConnectionProvider } from '../connection';
import { dbEvent } from './interface';

export function createEvent(event: dbEvent): Promise<dbEvent> {
  return new Promise(async (resolve, reject) => {
    let connection = await ConnectionProvider.Instance.connection;
    connection.query(
      `INSERT INTO Events (title, description, startDate, endDate, authorityLevel)
            VALUES ('${event.title}', '${event.description}', '${toDbDate(event.startDate)}', '${toDbDate(event.endDate)}', ${
        event.authorityLevel
      });`,
      (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function toDbDate(jsd: Date): string {
  return `${jsd.getFullYear()}-${('0' + jsd.getMonth()).slice(-2)}-${('0' + jsd.getDate()).slice(-2)} ${(
    '0' + jsd.getHours()
  ).slice(-2)}:${('0' + jsd.getMinutes()).slice(-2)}:${('0' + jsd.getSeconds()).slice(-2)}`;
}
