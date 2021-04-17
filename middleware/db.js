/*  ./middleware/db.js     */
import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const { MONGODB_URI, MONGODB_DB } = process.env

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(MONGODB_DB);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;