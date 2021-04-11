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

            <>
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
                                            <>
                                                <div key={key} className="text-center bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-black">
                                                    {section.title}
                                                    </dt>
                                                </div>
                                                { section.components.map( (com,id)=> (    
                                                    renderData(com,val,id) 
                                                ))}
                                            </>
                                        ))}    
                                    </dl>
                                </div>        
                            ))}
                        </div>
                    </div>
                </div>
            </>

    );
};

function renderData(params, variable, id) {

        if( typeof variable[params.key] !== 'object' ){

            return (
                <div key={id} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        {params.label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {variable[params.key]}
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
                                                    
                                renderSubdata(com, newArr, num) 
                                
                            ))}

                        </ul>
                    </dd>
                </div>
            );

        }
}

function renderSubdata(params, array, key) {

//    console.log( params + variable + array + key )

    return (
        
        <li key={key} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div className="w-0 flex-1 flex items-center">

                <span className="ml-2 flex-1 w-0 truncate">
                    {params}
                </span>
            </div>
            <div className="ml-4 flex-shrink-0">
                    {array[params]}
            </div>
        </li>

    )

}