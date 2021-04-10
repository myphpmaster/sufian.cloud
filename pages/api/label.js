import nextConnect from 'next-connect';
import middleware from '../../middleware/db';

const handler = nextConnect();
const col_name = 'forms';
handler.use(middleware);
const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {

    const key = req.query.key ? req.query.key : false;

    const data = await getDatas(      
      req.db,
      key ? key : '',
    );

    if (data.length > 0) {
        res.setHeader('cache-control', `public, max-age=${maxAge}`);
    }

    data.pop()

    var result = [];
  
    if(key){
      data.forEach(function(o){if (o.key == key) result.push(o);} );
      result = purge(result[0].components)
      
      
    }else{
      result = data
    }

    res.json(result);

  });
  
export async function getDatas(db, keys) {

    return db
      .collection(col_name)
      .find({ 
          'path': 'ieq-poe',
      })
      .project({
        components: 1, 
          _id: 0
      })
      .sort({ created: -1 })
      .toArray()
      .then(items => { return items[0].components })
      .catch(err => console.error(`Failed to find documents: ${err}`))

  }

export default handler;

function purge(array) {
  
  array.forEach(element => {    
    delete element.autofocus
    delete element.tableView
    delete element.input
    delete element.inputType
    delete element.placeholder
    delete element.prefix	
    delete element.suffix
    delete element.defaultValue
    delete element.protected
    delete element.persistent
    delete element.hidden
    delete element.clearOnHide
    delete element.validate
    delete element.lockKey
    delete element.type
    delete element.labelPosition
	  delete element.tags
	  delete element.conditional
	  delete element.properties
    delete element.dataSrc
    delete element.valueProperty
    delete element.refreshOn
    delete element.filter
    delete element.authenticate
    delete element.template
    delete element.multiple
    delete element.unique
    delete element.shortcut
    delete element.fieldSet
    delete element.optionsLabelPosition

  });

    return array
}