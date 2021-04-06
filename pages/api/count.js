import nextConnect from 'next-connect';
import middleware from '../../middleware/db';

const handler = nextConnect();
const col_name = 'submissions';
handler.use(middleware);
const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
    let data = await req.db.collection(col_name)
        .find(
            { 'data.age': { $exists: 1 } },
            )
        .toArray()
        .then(items => { return items.length })
        .catch(err => console.error(`Failed to find documents: ${err}`))

    if (data.length > 0) {
        res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }

    res.json(data);
});

export default handler;