import { ConnectionProvider } from '../connection';

export function deleteEventById(id: number): Promise<number> {
  return new Promise(async (resolve, reject) => {
    let connection = await ConnectionProvider.Instance.connection;
    connection.query(`DELETE FROM Events WHERE id = ${id};`, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.affectedRows);
      }
    });
  });
}
