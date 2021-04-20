/* ./function/getGroupKeys.js */

// Function to exract only key for specific form input (key)
export const getGroupKeys = (key, schema, title=false) => {
    let groupKeys=[]
    for (let i = 0; i < schema.length; i++) {
        let obj = schema[i].components
        for (let j = 0; j < obj.length; j++) {
            // console.log('obj[j].key =>' + obj[j].key)
            if (key == obj[j].key) {
                let values = obj[j]
                // For dropdown select input
                if( values.hasOwnProperty('data') ){
                    values = values.data
                }
                // radio input directly have this property
                if( values.hasOwnProperty('values') ){
                    let realVal = values.values
                    if(title){
                        realVal = values.questions
                    }
                    // console.log('realVal =>' + JSON.stringify(realVal))
                    for (let k = 0; k < realVal.length; k++) {
                        var foo = {};
                        foo[realVal[k].value.toString()] = realVal[k].label
                        groupKeys.push(foo);                        
                        // console.log('realVal[k] =>' + k + JSON.stringify(realVal[k]))
                    }
                }
            }
        }
    }
    return groupKeys
}