import { ObjectID } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../../middleware/db';
const { MONGODB_FORM_ID } = process.env

const handler = nextConnect();
const col_name = 'submissions';
handler.use(middleware);
const maxAge = 1 * 24 * 60 * 60;
const form =  new ObjectID(MONGODB_FORM_ID)

handler.get(async (req, res) => {
    let data = await req.db.collection(col_name)
        .find({
            "form": form
        })
        .toArray()
        .then(items => { return items.length })
        .catch(err => console.error(`Failed to find documents: ${err}`))

    if (typeof req.query.nocache === 'undefined' && data.length > 0) {
        res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }

    res.json(data);
});

export default handler;