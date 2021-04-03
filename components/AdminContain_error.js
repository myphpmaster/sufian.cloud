/*  ./components/AdminContain.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";

export const Contain = () => {

    const fetcher = url => fetch(url).then(res => res.json());
    const PAGE_SIZE = 3;
    
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        index =>
          `/api/submissions?limit=${PAGE_SIZE}&page=${index + 1}`,
        fetcher
      );


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

        const datas = data ? [].concat(...data) : [];

        const results = [];
        datas.forEach(function(value, index, array) {
            // The callback is executed for each element in the array.
            // `value` is the element itself (equivalent to `array[index]`)
            // `index` will be the index of the element in the array
            // `array` is a reference to the array itself (i.e. `datas` in this case)
            results.push(value.data);
        }); 
        
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
    const isRefreshing = isValidating && data && data.length === size;


    const { data: survey } = useSWR(() => '/api/charts/', fetcher)
    const arr = survey ? [].concat(...survey) : [];

    const { data: label } = useSWR(() => '/api/label/', fetcher)
    const objLabel = Object.assign({},label)
    
    // Retrieve Label from form schema
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

    const resultx = groupArray(arr);
//    console.log('Results => ' + JSON.stringify(results));

    let counts = [];

    for (let i = 0; i < resultx.length; i++) {
        let identity = resultx[i]['identity'];
    }

    /* Calculate Server running days */
    // To set two dates to two variables
    const date_start = new Date('03/25/2021');
    const date_now = new Date();
        
    // To calculate the time difference of two dates
    const Difference_In_Time = Math.round((date_now.getTime()-date_start.getTime())/(1000*60*60*24));

  return (

<>

    {       /*  <!--Container-->  */      }
    <div className="container w-full mx-auto pt-20">

        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">

            {       /*  <!--Console Content-->  */      }
            <div class="flex flex-wrap">

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
                                <h3 className="font-bold text-3xl">{Difference_In_Time} days</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
            {       /*  <!--Console Content-->  */      }

            { /*<!--Divider-->*/ }
            <hr className="border-b-2 border-gray-400 my-8 mx-4" />

            { /* <!--Graph Section --> */ }
            <div className="flex flex-row flex-wrap flex-grow mt-2">

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Summary Data Based on Age</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/line/age" frameBorder="0" />
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
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/polar/gender" frameBorder="0" />
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
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/line/state" frameBorder="0" />
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
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/doughnut/education" frameBorder="0" />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Latest Data</h5>
                        </div>
                        <div className="p-3">



                        </div>
                    </div>
                </div>

            </div>
            { /* <!--Graph Section --> */ }

        </div>

    </div>
    {       /*  <!--/Container-->  */      }
</>

  );
};