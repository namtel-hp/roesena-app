import * as mysql from 'mysql';

export class ConnectionProvider {
  private static instance: ConnectionProvider;
  private connectionInstance: mysql.Connection;

  public static get Instance(): ConnectionProvider {
    if (!ConnectionProvider.instance) {
      // create the static instance if none is there already
      this.instance = new this();
    }
    return this.instance;
  }

  public closeConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.connectionInstance) reject('no connection');
      this.connectionInstance.end(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public get connection(): Promise<mysql.Connection> {
    return new Promise(async (resolve, reject) => {
      if (this.connectionInstance) {
        resolve(this.connectionInstance);
      } else {
        let connection = mysql.createConnection({
          host: 'database',
          user: 'root',
          password: 'my_secret_pw',
          database: 'RoeSeNa'
        });
        connection.connect(err => {
          if (err) {
            reject(err);
          } else {
            this.connectionInstance = connection;
            resolve(connection);
          }
        });
      }
    });
  }
}
