/*  ./pages/api/result.js     */
import { ObjectId, ObjectID } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../../middleware/db';
const { MONGODB_FORM_ID } = process.env

const handler = nextConnect();
const col_name = 'submissions';
handler.use(middleware);
const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
    const formID = req.query.form || MONGODB_FORM_ID;
    const form = new ObjectID(formID)
    const key = req.query.key || false 
    const subkey = req.query.subkey || false    
    var aggregation = []
    var matches = ''

    if(!subkey) {
        matches = 'data.' + key
    } else {
        matches = 'data.' + key + '.' + subkey
    }

    const group = '$' + matches
    
    aggregation = [
        { $match: { 
            "form": form,
            [matches] : { $exists: true }, 
            "deleted": {$eq : null}
        }},
        { $group: { _id: group, count: { $sum: 1 } } },
        { $sort : { _id : 1 } }
    ];

    // console.log(JSON.stringify(aggregation))

    let data = await req.db.collection(col_name)
        .aggregate(aggregation)
        .toArray()
        .then(items => { return items })
        .catch(err => console.error(`Failed to find documents: ${err}`))

    if (typeof req.query.nocache === 'undefined' && data.length > 0) {
        res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }
    
    res.json(data);
});

export default handler;