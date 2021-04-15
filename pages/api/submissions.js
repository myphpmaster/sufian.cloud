import { ObjectID } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../../middleware/db';
const handler = nextConnect();
const col_name = 'submissions';
const { MONGODB_SERVER } = process.env

handler.use(middleware);
const maxAge = 1 * 24 * 60 * 60;

/*
handler.get(async (req, res) => {

    let data = await req.db.collection(col_name)
        .find(
            { 'data.age': { '$exists': 1 } },
            { 
                skip: req.query.skip ? parseInt(req.query.skip, 0) : 0, 
                limit: req.query.limit ? parseInt(req.query.limit, 5) : 5, 
                fields:{data: 1, _id: 0}, 
                sort:{ _id: -1 } }
            )
        .toArray()
        .then(items => { return items })
        .catch(err => console.error(`Failed to find documents: ${err}`))

    res.json(data);
});
*/

handler.get(async (req, res) => {
    const data = await getDatas(
      req.db,
      req.query.limit ? parseInt(req.query.limit, 5) : 5,
      req.query.limit ? req.query.limit*(req.query.page-1) : 0,
    );
  
    if (typeof req.query.nocache === 'undefined' && data.length > 0) {
      // This is safe to cache because from defines
      //  a concrete range of data
      res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }
  
    res.json(data);
  });
  
export async function getDatas(db, limits, skips) {
    // const form = new ObjectID("606e53e9642f2cd011d871b4")
    const form = MONGODB_SERVER=='azure' ? new ObjectID("605f377e249aa13843b38138") : new ObjectID("606e53e9642f2cd011d871b4")
    
    return db
      .collection(col_name)
      .find({
        "form": form
      })
      .project({
            data: 1, 
            _id: 0
      })
      .sort({ created: -1 })
      .skip(skips)
      .limit(limits || 5)
      .toArray()
      .then(items => { return items })
      .catch(err => console.error(`Failed to find documents: ${err}`))
  }

export default handler;