import { ObjectID } from 'bson';
import { getDB } from '../../dbConnection.js';

export async function get(req, res) {
  const { id } = req.params;

  const result = await getDB()
    .collection('events')
    .findOne({ _id: new ObjectID(id) });
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(result));
}