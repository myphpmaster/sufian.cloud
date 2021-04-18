/*  ./components/admin/dataTable.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { useRouter } from "next/router";

export const Table = () => {
    
  // Get entry page url path
	const router = useRouter();
  const path = router.route ? router.route.replace('[[...slug]]','entry') + '/' : '/result/'
  const page = (router.query.length > 1 && typeof router.query.slug[1] !== 'undefined') ? parseInt(router.query.slug[1]) : 1

  var [isPage, setPage] = useState(1);
  
  const fetcher = url => fetch(url).then(res => res.json());
  // Get submissions data as datas
  const limit = 10;
  const { data } = useSWR(() => `/api/submissions/?limit==${limit}&page=${isPage}`, fetcher)
  const datas = data ? [].concat(...data) : [];

  // Filter datas to get all data properties in results array
  const results = [];
  datas.forEach( (value) => {
      var data={}
      data = value.data
      data.date = value.created
      results.push(data);
  }); 
  //console.log('results->'+JSON.stringify(results))
      
  // Get total no. of respondents
  const { data: count } = useSWR(() => '/api/count/', fetcher)
  const numPages = Math.ceil(count/limit) || 1

  // Get form schema
  const { data: schem } = useSWR(() => '/api/label/', fetcher)
  const schems = schem ? [].concat(...schem) : [];
  //console.log('schems->'+JSON.stringify(schems))

  // Filter form to get only specified properties
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
    // console.log('renders->'+JSON.stringify(renders))
    
    // Specify constant to use
    const numColumn = 4 //max column to printout
    const numData = 3 // max data in each column

    return (

        <div className="w-full">
          <div className="bg-white border rounded shadow">
            <div className="p-4">
              <div className="flex">
                  <div className="flex-none w-1/4 md:w-1/8">
                      { (isPage > 1) && 
                      <a className="bg-gray-50 hover:bg-blue-50 inline-block w-auto items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700" 
                          onClick={() => setPage(isPage => isPage - 1)}
                          href="#">Previous</a>
                      }
                  </div>
                  <div className="flex-grow self-center">
                      <h2 className="font-bold uppercase text-gray-600 text-center">Page {isPage} of {numPages}</h2>
                  </div>
                  <div className="flex-none w-1/4 md:w-1/8">
                      { (isPage < numPages ) &&
                      <a className="bg-gray-50 hover:bg-blue-50 inline-block w-auto items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700" 
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
                      <thead className="bg-gray-100 text-black font-bold">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                          >
                            Entry Info
                          </th>

                          {schems.map((panel, id) => (
                             renderHeader(panel, numColumn, id)
                          ))}

                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Link</span>
                          </th>

                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.map((respond, id) => (
                          <tr key={respond.date} className={`${(id % 2 == 0) ? 'bg-white' : 'bg-gray-50' }`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="text-sm text-gray-900">{respond.date.split('T')[0]}</div>
                                </div>
                              </div>
                            </td>

                            { schems.filter( (el,no) => no < numColumn ).map( (panel, key) => (
                              
                              <td className="px-6 py-4 whitespace-nowrap">

                                {renders.filter(el => el.panel.id == key).map( (comp, num) => ( 

                                  renderRow(comp, respond, num, numData)

                                ))} 

                              </td>
                                
                            ))} 

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href={`${path+(id+1)}`} className="text-indigo-600 hover:text-indigo-900">
                                More
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

// Function to printout table header limit to numColumn
const renderHeader = (props={}, numColumn=3, id) => {
  if( id<numColumn ){
    return (      
      <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
      data-id={props.key}    
      >
        {props.title}
      </th>
    )
  }
}

// Function to printout table row from submission data
const renderRow = (comp={}, val, id, numData=4) => {

  var value = val[comp.key]
  const oriVal = value

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
  
  if( id>=numData ) return

  if( typeof val[comp.key] !== 'object' ){

    return (
        <div key={id} className="py-5">
          <div className="text-sm text-gray-900" data-id={comp.key}>{comp.label}</div>
          <div className="text-sm text-gray-500" data-id={oriVal}>{value}</div>
        </div>
    )


  } else if( comp.type == 'survey' ) {
      
      return (
          <div key={id} className="py-5">
              <div className="text-sm text-gray-900" data-id={comp.value}>{comp.label}</div>
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      
                      { comp.questions.map( (com, num)=> (                                                    
                          renderSurvey(com, comp.values, value[com.value], num)                             
                      ))}

                  </ul>
          </div>
      );

  }

}

const renderSurvey = (question, values, value, num) => {
   
  var oriVal = value    
  var table = ["bg-gray-50", "bg-white"]
  var tableClass = (num % 2 == 0) ? table[0] : table[1]
      
  for (let j = 0; j < values.length; j++) {
      if(values[j].value==value){
          value = values[j].label
      }
  }

  return (
      
      <li key={num} className={`${tableClass} pl-3 pr-4 py-3 flex items-center justify-between text-sm`}>
          <div className="w-0 flex-1 flex items-center">
              <span className="ml-2 flex-1 w-0 truncate pb-5" data-id={question.value}>
                  {question.label}
              </span>
          </div>
          <div className="ml-4 flex-shrink-0" data-id={oriVal}>
                  {value}
          </div>
      </li>

  )

}

const filterProps = (objects={},props=[],inputs={}) => {
    for (let i = 0; i < props.length; i++) {
        inputs[props[i]] = objects.hasOwnProperty(props[i]) ? objects[props[i]] : false
    }
    if( inputs.type=='select' && props.includes('values') ){
        inputs.values = objects.data.values
    }
    return inputs
}