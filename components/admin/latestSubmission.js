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
    const filters = ['type','key','label','suffix','prefix','questions','values']
    var x=0
    var inputs={}
    for (let i = 0; i < schems.length; i++) {
        // direct input
        if(schems[i].input) {
            inputs={}
            inputs=filterProps(schems[i],filters)
            renders.push(inputs)
            x++
        // panel
        }else if(schems[i].type=='panel'){
			let obj = schems[i].components
            var panel = {}
            panel.id = i
            panel.key = schems[i].key
            panel.title = schems[i].title
            // console.log('panel['+i+']=>'+JSON.stringify(panel))
			for (let j = 0; j < obj.length; j++) {
				if (obj[j].type == 'columns'){
					let col = obj[j].columns
					for (let k = 0; k < col.length; k++) {
						let subcol = [] = col[k].components
						for (let l = 0; l < subcol.length; l++) {
							if (subcol[l].input) {
                                inputs={}
                                inputs.panel = (schems[i].type=='panel') ? panel : false
                                inputs=filterProps(subcol[l],filters,inputs)
                                console.log('inputs['+x+']=>'+JSON.stringify(inputs))
                                renders.push(inputs)
                                x++
							}
						}
					}
				}else if (obj[j].input) {
                    inputs={}
                    inputs.panel = (schems[i].type=='panel') ? panel : false
                    inputs=filterProps(obj[j],filters,inputs)
                    renders.push(inputs)
				}
			}			
        }
    }

    console.log('results->'+JSON.stringify(results))
    console.log('schems->'+JSON.stringify(schems))
    console.log('renders->'+JSON.stringify(renders))
    
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
                                                {renders.filter(el => el.panel.id == key).map( (comp, num) => ( 
                                                    renderNew(comp, val, num)
                                                ))} 
                                            </div>
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
                <div key={id} className={`${tableClass} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
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
                
                //console.log('comp[' + i + ']=>' + JSON.stringify(comp))

                for (let j = 0; j < comp.length; j++) {

                    if( typeof variable[comp[j].key] !== 'object' ){

                        key = variable[comp[j].key]
                        val = comp[j].key
                        rawData = realValue(key, val, schema)
                        //console.log('key[' + j + ']=>' + JSON.stringify(key))
                        //console.log('val[' + j + ']=>' + JSON.stringify(val))
                        //console.log('var[' + j + ']=>' + JSON.stringify(variable))

                        renderSubdata(key, variable, val, schema, id)

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

function renderNew(comp, val, id) {

    var table = ["bg-gray-50", "bg-white"]
    var tableClass = (id % 2 == 0) ? table[0] : table[1]
    var value = val[comp.key]

    console.log('comp[' + id + ']=>' + JSON.stringify(comp))
    console.log('val[' + id + ']=>' + JSON.stringify(val[comp.key]))

    switch (comp.type) {
        case 'select':
        case 'radio':

            let choices = comp.values
            for (let j = 0; j < choices.length; j++) {
                if(choices[j].value==value){
                    value = choices[j].label
                }
            }            

            break;
    
        default:
            break;
    }

    if( typeof val[comp.key] !== 'object' ){
        return (
        <div key={id} className={`${tableClass} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
            <dt className="text-sm font-medium text-gray-500">
                {comp.label}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {value}
            </dd>
        </div>
        )
    } else if( comp.type == 'survey' ) {

        return (
            <div key={id} className={`${tableClass} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500">
                    {comp.label}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        
                        { comp.questions.map( (com, num)=> (    
                                                
                            renderSurvey(com, comp.values, value, num) 
                            
                        ))}

                    </ul>
                </dd>
            </div>
        );

    }

}

function renderSurvey(question, values, value, num) {
   
    var table = ["bg-gray-50", "bg-white"]
    var tableClass = (num % 2 == 0) ? table[0] : table[1]
        
    for (let j = 0; j < values.length; j++) {
        if(values[j].value==value){
            value = values[j].label
        }
    }

    return (
        
        <li key={num} className={`${tableClass}pl-3 pr-4 py-3 flex items-center justify-between text-sm`}>
            <div className="w-0 flex-1 flex items-center">

                <span className="ml-2 flex-1 w-0 truncate">
                    {question.label}
                </span>
            </div>
            <div className="ml-4 flex-shrink-0">
                    {value}
            </div>
        </li>

    )

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
                        if( objCol[l].key==rawKey){
                            values = objCol[l]
                            break
                        }
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

                    if(typeof realVal === 'object'){
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
    }
    return rawData
}

function filterProps(objects={},props=[],inputs={}){
    for (let i = 0; i < props.length; i++) {
        inputs[props[i]] = objects.hasOwnProperty(props[i]) ? objects[props[i]] : false
    }
    if( inputs.type=='select' && props.includes('values') ){
        inputs.values = objects.data.values
    }
    return inputs
}