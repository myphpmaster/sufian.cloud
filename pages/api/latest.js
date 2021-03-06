/*  ./pages/api/latest.js     */
import nextConnect from 'next-connect';
import { ObjectId, ObjectID } from 'bson';
import middleware from '../../middleware/db';
const { MONGODB_FORM_ID } = process.env

const handler = nextConnect();
const col_name = 'submissions';
handler.use(middleware);
const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
    const formID = req.query.form ? req.query.form : MONGODB_FORM_ID;
    const form = new ObjectID(formID)
    var today = new Date();    
    today.setHours(0,0,0,0);

    const from = req.query.from ? new Date(req.query.from) : today    
    const data = await getDatas(      
        req.db,
        from,
        form,
    );
    
    if (typeof req.query.nocache === 'undefined' && req.query.from && data.length > 0) {
        // This is safe to cache because from defines
        //  a concrete range of data
        res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }
    
    res.json(data);
});

export async function getDatas(db, from, form) {
    
    return db
      .collection(col_name)
      .find({ 
            'form': form,
            'created': { $gte: from },
            "deleted": {$eq : null} 
      })
      .sort({ created: -1 })
      .limit(0)
      .toArray()
      .then(items => { return items.length })
      .catch(err => console.error(`Failed to find documents: ${err}`))
  }

export default handler;