import nextConnect from 'next-connect';
import middleware from '../../middleware/db';
const { MONGODB_FORM_PATH } = process.env
const maxAge = 1 * 24 * 60 * 60;
const handler = nextConnect();
const col_name = 'forms';

handler.use(middleware);

handler.get(async (req, res) => {

    let data = await req.db.collection(col_name)
        .find(
            { 
                'path': MONGODB_FORM_PATH,  
            }
        )
        .toArray()
        .then(items => { return items })
        .catch(err => console.error(`Failed to find documents: ${err}`))

    if (typeof req.query.nocache === 'undefined' && data.length > 0) {
        res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }
    
    res.json(data[0]);
});

export default handler;