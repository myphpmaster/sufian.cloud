/*  ./components/Result.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";

export const Result = ({query}) => {

    // Fetch submissions data
    const fetcher = url => fetch(url).then(res => res.json());
    const PAGE_SIZE = 1;
    
/*
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        index =>
          `/api/submissions?limit=${PAGE_SIZE}&page=${index + 1}`,
        fetcher
      );
*/
    const [index, setState] = useState(1);

    const handleChange = (e) => {
        setState(e.target.value)
    };

    const { data, error } = useSWR( `/api/submissions?limit=${PAGE_SIZE}&page=${index}`, fetcher)

    /*
    if (error) return (
        <div className="py-24 bg-gradient-to-r from-indigo-700 to-pink-500 bg-opacity-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-5 sm:px-6 text-center text-white text-red-300">
                    Data not found!
                </div>
            </div>
        </div>
        )
    if (!data) return (
        <div className="py-24 bg-gradient-to-r from-indigo-700 to-pink-500 bg-opacity-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-5 sm:px-6 text-center text-white text-red-300">
                    Loading...
                </div>
            </div>
        </div>
        )    
    */

    const datas = data ? [].concat(...data) : [];

    const results = [];
    datas.forEach(function(value, index, array) {
        results.push(value.data);
    }); 
    
    
    const { data: schem } = useSWR(() => '/api/label', fetcher)
    const schems = schem ? [].concat(...schem) : [];
    
    // Total respondents
    const { data: count } = useSWR(() => '/api/count/', fetcher)

    const selects = [];
    for (let i=1; i<=count; i++){
        selects[i] = i;
    }
/*
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
    const isRefreshing = isValidating && data && data.length === size;
*/

  return (
    <>

<div id="result" className="py-8 animate-gradient md:bg-gradient-to-r md:from-indigo-700 md:to-pink-500 md:bg-opacity-50 bg-gray-100 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="px-4 py-5 sm:px-6">
            <h3 className="pb-2 text-4xl font-bold md:text-white text-black sm:text-5xl md:text-6xl">
            Survey Sample Results
            </h3>
            <p className="my-2 text-xl md:text-white text-black">
                Real-time IEQ POE Evaluation Data.
            </p>
{/*
            <p className="mt-5 mb-1 text-lg md:text-white text-black md:text-right">
                Showing {size} page(s) of {isLoadingMore ? "..." : datas.length}{" "} data(s){" "}
            </p>
            

/*/}
            <p className="mt-5 mb-1 text-lg md:text-white text-black md:text-right">
                <label htmlFor="page">Select page:</label>

                <select style={{width: 50 + 'px'}} name="page" defaultValue="1" id="page" onChange={e => handleChange(e)} className="custom-select text-white bg-transparent focus:text-gray-900 focus:bg-transparent text-center">
                    { selects.map( (page,key) => ( 
                        <>
                            <option key={key} value={page}>{page}</option>
                        </>
                    ))}
                </select>
            </p>
            



        </div>
        
        { results.map( (val, index) => (
            
            <div key={index} className="mb-10 border-gray-400 border mx-4">
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
    
        <div className="px-4 py-5 sm:px-6 text-center">

{/*
            <p className="mt-1 mb-5 text-lg md:text-white text-black md:text-center">
                Showing {size} page(s) of {isLoadingMore ? "..." : datas.length}{" "} data(s){" "}
            </p>
            <div className="py-3">
                <button
                className="w-full md:w-auto transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform md:text-white text-black font-semibold hover:text-white py-2 min-w-max px-4 border border-blue-500 hover:border-transparent rounded mr-2 mb-2"
                disabled={isLoadingMore || isReachingEnd}
                onClick={() => setSize(size + 1)}
                >
                {isLoadingMore
                    ? "Loading..."
                    : isReachingEnd
                    ? "No more datas"
                    : "Load more"}
                </button>
                <button 
                className="w-full md:w-auto transition duration-500 ease-in-out bg-white hover:bg-blue-500 transform text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2 mb-2"
                    disabled={isRefreshing} onClick={() => mutate()}>
                    {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>                
                <button 
                    className="w-full md:w-auto transition duration-500 ease-in-out bg-white hover:bg-blue-500 transform text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    disabled={!size} onClick={() => setSize(1)}>
                    Reset
                </button>
            </div>
*/}
            
        </div>

    </div>
</div>

    </>
  );
};

export async function getServerSideProps({ ctx }) {
    
    const { query } = ctx;
      // Pass data to the page via props
    return { props: { query } }
}

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
        var newArr = []

        for (let k in obj){

            newArr[k] = obj[k]

        }

        return (
            <div key={id} className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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