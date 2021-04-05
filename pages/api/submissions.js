import nextConnect from 'next-connect';
import middleware from '../../middleware/db';

const handler = nextConnect();
const col_name = 'submissions';

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
      req.query.skip ? parseInt(req.query.skip, 0) : req.query.limit*(req.query.page-1),
    );
  
    if (req.query.from && data.length > 0) {
      // This is safe to cache because from defines
      //  a concrete range of data
      res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }
  
    res.json(data);
  });
  
  /*
  handler.post(async (req, res) => {
    if (!req.user) {
      return res.status(401).send('unauthenticated');
    }
  
    if (!req.body.content) return res.status(400).send('You must write something');
  
    const post = await insertPost(req.db, {
      content: req.body.content,
      creatorId: req.user._id,
    });
  
    return res.json({ post });
  });
  */

export async function getDatas(db, limits, skips) {
    return db
      .collection(col_name)
      .find(
        { 'data.age': { '$exists': 1 } },
        { 
            skip: skips, 
            projection:{data: 1, _id: 0}, 
            sort:{ _id: -1 }              
        }   
      )
      .sort({ created: -1 })
      .limit(limits || 5)
      .toArray()
      .then(items => { return items })
      .catch(err => console.error(`Failed to find documents: ${err}`))
  }

export default handler;