/*  ./components/admin/generalData.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";

export const Table = () => {
    
    const fetcher = url => fetch(url).then(res => res.json());
    const { data } = useSWR(() => '/api/submissions/?limit=1&page=1&nocache=1', fetcher)
    const datas = data ? [].concat(...data) : [];

    const results = [];
    datas.forEach(function(value, index, array) {
        results.push(value.data);
    }); 
        
    const { data: schem } = useSWR(() => '/api/label/?nocache=1', fetcher)
    const schems = schem ? [].concat(...schem) : [];

    const renders = []
    for (let i = 0; i < schems.length; i++) {
        // get input directly
        if(schems[i].input) {
            renders.push(schems[i])
        // panel or columns
        }else{
			
			let obj = schems[i].components
			for (let j = 0; j < obj.length; j++) {
				if (obj[j].type == 'columns'){
					let col = obj[j].columns
					for (let k = 0; k < col.length; k++) {
						let subcol = col[k].components
						for (let l = 0; l < subcol.length; l++) {
							if (subcol[l].input) {
								renders.push(subcol[l])
							}
						}
					}
				}else if (obj[j].input) {
						renders.push(obj[j])
				}
			}
			
        }
    }

    console.log(JSON.stringify(results))
    console.log(JSON.stringify(renders))
    
    return (

                <div className="w-full p-3">
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600 text-center">Latest Entry</h5>
                        </div>
                        <div className="p-5">
                            { results.map( (val, index) => (
                                <div key={index} className="pb-10 border-gray-400 border mx-4">
                                    <dl>
                                        { schems.map( (section, key) => (                                       
                                            <div key={key} >
                                                <div className="text-center bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-black">
                                                    {section.title}
                                                    </dt>
                                                </div>
                                                { section.components.map( (com,id)=> (  
                                                    renderData(com, val, schems, id) 
                                                ))}
                                            </div>
                                        ))}    
                                    </dl>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

    );
};

function renderData(params, variable, schema, id) {

    var key = variable[params.key]  // variables[parameters.key]
    var val = params.key            // parameters.key
    var rawData = realValue(key, val, schema)
    var table = ["bg-gray-50", "bg-white"]
    var tableClass = (id % 2 == 0) ? table[0] : table[1]

    if(params.input) {

        if( typeof key !== 'object' ){

            return (
                <div key={id} className={`${tableClass} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">
                        {params.label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {rawData}
                    </dd>
                </div>
            );

        } else {

            const obj = variable[params.key];
            const objNames = Object.keys(obj);
            const objVal = Object.values(obj);
            var newArr = []

            for (let k in obj){

                newArr[k] = obj[k]

            }

            // console.log('objNames => ' + JSON.stringify(objNames) )
            // console.log('objVal => ' + JSON.stringify(objVal) )
            // console.log('newArr => ' + JSON.stringify(newArr) )

            return (
                <div className={`${tableClass} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text-sm font-medium text-gray-500">
                        {params.label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            
                            { objNames.map( (com, num)=> (    
                                                    
                                renderSubdata(com, newArr, params.key, schema, num) 
                                
                            ))}

                        </ul>
                    </dd>
                </div>
            );

        }
    } else {

        if(params.type == 'columns') {

            let column = params.columns
            for (let i = 0; i < column.length; i++) {

                let comp = column[i].components
                
                console.log('comp[' + i + ']=>' + JSON.stringify(comp))

                for (let j = 0; j < comp.length; j++) {

                    if( typeof variable[comp[j].key] !== 'object' ){

                        key = variable[comp[j].key]
                        rawData = realValue(key, val, schema)
                        console.log('key[' + j + ']=>' + JSON.stringify(key))
                        console.log('val[' + j + ']=>' + JSON.stringify(val))
                        console.log('var[' + j + ']=>' + JSON.stringify(variable))

                        renderSubdata(key, variable, key, schema, id)

                            return (
                                <div key={id} className={`${tableClass} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                                    <dt className="text-sm font-medium text-gray-500">
                                        {comp[j].label}
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {rawData}
                                    </dd>
                                </div>
                            );
                        
                    } 
                }
            }
        }
    }
}

function renderSubdata(subparams, array, key, schema, id) {
   
    let rawTitle = realValue(subparams, key, schema, true)
    let rawData = realValue(array[subparams], key, schema) 
    var table = ["bg-gray-50", "bg-white"]
    var tableClass = (id % 2 == 0) ? table[0] : table[1]
    
    return (
        
        <li key={id} className={`${tableClass}pl-3 pr-4 py-3 flex items-center justify-between text-sm`}>
            <div className="w-0 flex-1 flex items-center">

                <span className="ml-2 flex-1 w-0 truncate">
                    {rawTitle}
                </span>
            </div>
            <div className="ml-4 flex-shrink-0">
                    {rawData}
            </div>
        </li>

    )

}

function realValue(key, value, schema, title=false){

    let rawData = key
    let rawKey = value

    for (let i = 0; i < schema.length; i++) {

        let obj = schema[i].components

        for (let j = 0; j < obj.length; j++) {

            // console.log('obj[j].key =>' + obj[j].key)

            var values

            if (obj[j].type == 'columns') {
                let col = obj[j].columns
                for (let k = 0; k < col.length; k++) {

                    let objCol = col[k].components
                    // console.log('objCol[' + k + ']=>' + JSON.stringify(objCol))
                    // console.log('key[' + k + ']=>' + JSON.stringify(key))

                    for (let l = 0; l < objCol.length; l++) {
                        values = objCol[l].key
                    }

                }

            } else {
                
                values = obj[j]
            }
            
            if (rawKey == values.key) {


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

                    for (let k = 0; k < realVal.length; k++) {

                        if(rawData == realVal[k].value || rawData === realVal[k].value ) {

                            rawData = realVal[k].label
                            break;
                        }
                    }
                }
            }
        }
    }
    return rawData
}