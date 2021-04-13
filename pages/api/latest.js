import nextConnect from 'next-connect';
import { ObjectId, ObjectID } from 'bson';
import middleware from '../../middleware/db';

const handler = nextConnect();
const col_name = 'submissions';
handler.use(middleware);
const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {

    var today = new Date();    
    today.setHours(0,0,0,0);

    const from = req.query.from ? new Date(req.query.from) : today
//    console.log(from)
    
    const data = await getDatas(      
        req.db,
        from,
    );
    
    if (req.query.from && data.length > 0) {
        // This is safe to cache because from defines
        //  a concrete range of data
        res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }
    
    res.json(data);
});

export async function getDatas(db, from) {
    // const form = new ObjectID("606e53e9642f2cd011d871b4")
    const form = new ObjectID("605f377e249aa13843b38138")
    
    return db
      .collection(col_name)
      .find({ 
            'form': form,
            'created': { $gte: from }         
      })
      .sort({ created: -1 })
      .limit(0)
      .toArray()
      .then(items => { return items.length })
      .catch(err => console.error(`Failed to find documents: ${err}`))
  }

export default handler;