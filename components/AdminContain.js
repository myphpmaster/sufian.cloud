/*  ./components/AdminContain.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import BarChart from './bar';
import {Bar} from 'react-chartjs-2';

export const Contain = () => {

    const fetcher = url => fetch(url).then(res => res.json());
    const PAGE_SIZE = 3;
    
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        index =>
          `/api/charts/?key={$index}`,
        fetcher
      );


 /*     
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {data} = useSWR(`/api/charts/?key=age`, fetcher);

 //   console.log(data);

*/
    const { data: survey } = useSWR(() => '/api/charts/', fetcher)

    const arr = survey ? [].concat(...survey) : [];

    const { data: label } = useSWR(() => '/api/label/', fetcher)
 //   console.log('ArrLabel =>' + JSON.stringify(label[0]['components'][0]['components'][0]['key']))
  
    const objLabel = Object.assign({},label)
//    console.log('JsonLabel =>' + JSON.stringify(objLabel[0].components[0].components[0]))
    
    function getLabel (obj={}) {
        for (let k in obj){

        }
    }

    // function to group all data counts
    function groupArray (arr = []) {

        let map = new Map();

        for (let i = 0; i < arr.length; i++) {

            let obj = arr[i].data

                if( obj instanceof Object ){    
                                        
                    for (let k in obj){
                        
                        
                        if ( typeof obj === 'object' && objectSize(obj[k]) > 0 ){
                            //recursive call to scan property
                            let recur = obj[k]

                            for (let j in recur){
                                
                                const w = JSON.stringify(k+'#'+j+'~'+recur[j]);
                                if(!map.has(w)){

                                    map.set(w, {
                                        identity: k+'#'+j+'~'+recur[j],
                                        count: 1,
                                    });

                                }else{
                                    map.get(w).count++;
                                }

                            }

                        }else if ( typeof obj === 'string' ) {
 
                            const s = JSON.stringify(k+'#'+obj[k]);
                            if(!map.has(s)){

                                map.set(s, {
                                    identity: k+'#'+obj[k],
                                    count: 1,
                                });

                            }else{
                                map.get(s).count++;
                            }


                        }
                    }

                } 

        }
        const res = Array.from(map.values())
        return res;
    };
    
    const objectSize = (obj = {}) => {
        var size = 0, key;
        if (typeof obj === 'object') {
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
        } 
        return size;
    };

    const results = groupArray(arr);
//    console.log('Results => ' + JSON.stringify(results));

    let counts = [];

    for (let i = 0; i < results.length; i++) {
        let identity = results[i]['identity'];
    }

    for (let k in results){
                      
    }
    

    if (error) return (
        <div className="py-24 bg-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-8 sm:px-6 text-center text-3xl tracking-tight font-extrabold text-black">
                    Data not found!
                </div>
            </div>
        </div>
        )
    if (!data) return (
        <div className="py-24 bg-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-8 sm:px-6 text-center text-3xl tracking-tight font-extrabold text-black">
                    Loading...
                </div>
            </div>
        </div>
        )    

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <>

    <div className="container w-full mx-auto pt-20">

        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">

            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-green-600"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Total Revenue</h5>
                                <h3 className="font-bold text-3xl">$3249 <span className="text-green-500"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-pink-600"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Total Respondents</h5>
                                <h3 className="font-bold text-3xl">{arr.length} <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-yellow-600"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">New Respondents</h5>
                                <h3 className="font-bold text-3xl">2 <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-blue-600"><i className="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Server Uptime</h5>
                                <h3 className="font-bold text-3xl">152 days</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-indigo-600"><i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">To Do List</h5>
                                <h3 className="font-bold text-3xl">7 tasks</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-red-600"><i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Issues</h5>
                                <h3 className="font-bold text-3xl">3 <span className="text-red-500"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>


            <hr className="border-b-2 border-gray-400 my-8 mx-4" />

            <div className="flex flex-row flex-wrap flex-grow mt-2">

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Summary Data Based on Age</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/age" frameBorder="0" />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Summary Data Based on Gender</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/gender" frameBorder="0" />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Summary Data Based on State</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/state" frameBorder="0" />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Summary Data Based on Highest Education</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/education" frameBorder="0" />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Table</h5>
                        </div>
                        <div className="p-5">
                            <table className="w-full p-5 text-gray-700">
                                <thead>
                                    <tr>
                                        <th className="text-left text-blue-900">Name</th>
                                        <th className="text-left text-blue-900">Side</th>
                                        <th className="text-left text-blue-900">Role</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Obi Wan Kenobi</td>
                                        <td>Light</td>
                                        <td>Jedi</td>
                                    </tr>
                                    <tr>
                                        <td>Greedo</td>
                                        <td>South</td>
                                        <td>Scumbag</td>
                                    </tr>
                                    <tr>
                                        <td>Darth Vader</td>
                                        <td>Dark</td>
                                        <td>Sith</td>
                                    </tr>
                                </tbody>
                            </table>

                            <p className="py-2"><a href="#">See More issues...</a></p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>
  );
};