import nextConnect from 'next-connect';
import middleware from '../../middleware/db';

const handler = nextConnect();
const col_name = 'submissions';

handler.use(middleware);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
    const key = req.query.key

    const data = await getDatas(      
      req.db,
      key ? key : '',
    );
  
    if (req.query.key && data.length > 0) {
      // This is safe to cache because from defines
      //  a concrete range of data
      res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }
  
    res.json(data);
  });
  
export async function getDatas(db, keys) {
    const key = 'data.' + keys
    return db
      .collection(col_name)
      .find(
        { 'data.age': { '$exists': 1 } },
        { 
            skip: 0, 
            projection: { [key]: 1, _id: 0}
        }   
      )
      .sort({ created: -1 })
      .toArray()
      .then(items => { return items })
      .catch(err => console.error(`Failed to find documents: ${err}`))
  }

export default handler;