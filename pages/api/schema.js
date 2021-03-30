import nextConnect from 'next-connect';
import middleware from '../../middleware/db';

const handler = nextConnect();
const col_name = 'forms';

handler.use(middleware);

handler.get(async (req, res) => {

    let data = await req.db.collection(col_name)
        .find(
            { 'path': 'ieq-poe',  },
            { fields:{components: 1, _id: 0} }
            )
        .toArray()
        .then(items => { return items })
        .catch(err => console.error(`Failed to find documents: ${err}`))


    res.json(data);
});

export default handler;