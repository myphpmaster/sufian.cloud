/*  ./components/admin/generalData.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";

export const Table = () => {
    
    const fetcher = url => fetch(url).then(res => res.json());
    const { data } = useSWR(() => '/api/submissions?limit=1&page=1', fetcher)
    const datas = data ? [].concat(...data) : [];

    const results = [];
    datas.forEach(function(value, index, array) {
        results.push(value.data);
    }); 
        
    const { data: schem } = useSWR(() => '/api/label', fetcher)
    const schems = schem ? [].concat(...schem) : [];

//    console.log(results)
    
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

    let key = variable[params.key]  // variables[parameters.key]
    let val = params.key            // parameters.key
    let rawData = realValue(key, val, schema)

    if(!validType(params.type)) return

    if( typeof variable[params.key] !== 'object' ){

        return (
            <div key={id} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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

//          console.log('objNames => ' + JSON.stringify(objNames) )
//          console.log('objVal => ' + JSON.stringify(objVal) )
//          console.log('newArr => ' + JSON.stringify(newArr) )

        return (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
}

function renderSubdata(subparams, array, key, schema, id) {
   
    let rawTitle = realValue(subparams, key, schema, true)
    let rawData = realValue(array[subparams], key, schema) 
    
    return (
        
        <li key={id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
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

            if (rawKey == obj[j].key) {

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

function validType(type){
    const types = [
        'number',
        'radio',
        'text',
        'select',
        'survey',
    ]
    return types.includes(type) ? true : false
}