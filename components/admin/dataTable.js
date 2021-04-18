/*  ./components/admin/generalData.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";

export const Table = () => {
    
  var [isPage, setPage] = useState(1);
  console.log(JSON.stringify(isPage))

  const fetcher = url => fetch(url).then(res => res.json());
  const { data } = useSWR(() => `/api/submissions/?limit=10&page=${isPage}`, fetcher)
  const datas = data ? [].concat(...data) : [];

  const results = [];
  datas.forEach(function(value, index, array) {
      var data={}
      data.date = value.created
      data.data = value.data
      results.push(data);
  }); 
      
  // Get total no. of respondents
  const { data: count } = useSWR(() => '/api/count/', fetcher)

  const { data: schem } = useSWR(() => '/api/label/', fetcher)
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
    } else if(schems[i].type=='panel'){
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
                              // console.log('inputs['+x+']=>'+JSON.stringify(inputs))
                              renders.push(inputs)
                              x++
            }
          }
        }
      } else if (obj[j].input) {
                  inputs={}
                  inputs.panel = (schems[i].type=='panel') ? panel : false
                  inputs=filterProps(obj[j],filters,inputs)
                  renders.push(inputs)
        }
      }			
    }
  }

    //console.log('results->'+JSON.stringify(results))
    //console.log('schems->'+JSON.stringify(schems))
    //console.log('renders->'+JSON.stringify(renders))
    
    return (

        <div className="w-full">
          <div className="bg-white border rounded shadow">
            <div className="p-4">
              <div className="flex">
                  <div className="flex-none w-1/8">
                      { (isPage > 1) && 
                      <a className="bg-gray-50 hover:bg-blue-50 w-1/3 inline-block md:w-auto items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700" 
                          onClick={() => setPage(isPage => isPage - 1)}
                          href="#">Previous</a>
                      }
                  </div>
                  <div className="flex-grow self-center">
                      <h2 className="font-bold uppercase text-gray-600 text-center">Page {isPage} of </h2>
                  </div>
                  <div className="flex-none w-1/8">
                      { (isPage < count ) &&
                      <a className="bg-gray-50 hover:bg-blue-50 w-1/3 inline-block md:w-auto items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700" 
                          onClick={() => setPage(isPage => isPage + 1)}
                          href="#">Next</a>
                      }
                  </div>
              </div>
          </div>
          <div className="p-4">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Entry Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Gender
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            State
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Link</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.map((respond) => (
                          <tr key={respond.date}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {respond.date}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{respond.data.jobscope}</div>
                              <div className="text-sm text-gray-500">{respond.data.state}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{respond.data.gender}</div>
                                  <div className="text-sm text-gray-500">{respond.data.age}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{respond.data.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>    
          </div>    
        </div>  
      </div>
    );
};

function renderData(comp, val, id) {

    var table = ["bg-gray-50", "bg-white"]
    var tableClass = (id % 2 == 0) ? table[0] : table[1]
    var value = val[comp.key]
    const oriVal = value

    //console.log('comp[' + id + ']=>' + JSON.stringify(comp))
    //console.log('val[' + id + ']=>' + JSON.stringify(val[comp.key]))

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
            <dt className="text-sm font-medium text-gray-500" data-id={comp.key}>
                {comp.label}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" data-id={oriVal}>
                {value}
            </dd>
        </div>
        )
    } else if( comp.type == 'survey' ) {
        
        return (
            <div key={id} className={`${tableClass} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500" data-id={comp.value}>
                    {comp.label}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        
                        { comp.questions.map( (com, num)=> (                                                    
                            renderSurvey(com, comp.values, value[com.value], num)                             
                        ))}

                    </ul>
                </dd>
            </div>
        );

    }

}

function renderSurvey(question, values, value, num) {
   
    var oriVal = value
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

                <span className="ml-2 flex-1 w-0 truncate" data-id={question.value}>
                    {question.label}
                </span>
            </div>
            <div className="ml-4 flex-shrink-0" data-id={oriVal}>
                    {value}
            </div>
        </li>

    )

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