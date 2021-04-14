import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const { MONGODB_URI_AZURE, MONGODB_URI_ALIBABA, MONGODB_DB, MONGODB_SERVER } = process.env

const mongoURI = MONGODB_SERVER == 'azure' ? MONGODB_URI_AZURE : MONGODB_URI_ALIBABA

const client = new MongoClient(mongoURI, {
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