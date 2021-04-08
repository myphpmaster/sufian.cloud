import nextConnect from 'next-connect';
import { useRouter } from "next/router";
import middleware from '../../../middleware/db';

const handler = nextConnect();
const maxAge = 1 * 24 * 60 * 60;
const col_name = 'forms';

handler.use(middleware);

handler.get(async (req, res) => {

  const path = req.query.path ? req.query.path : null
  let data = await req.db.collection(col_name)
      .find(
          { 'path': path,  },
          )
      .toArray()
      .then(items => { return items })
      .catch(err => console.error(`Failed to find documents: ${err}`))

  if (data) {
      res.setHeader('cache-control', `public, max-age=${maxAge}`);
  }
  
  res.json(data[0].display);
});

export default handler;