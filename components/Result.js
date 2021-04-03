/*  ./components/Result.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";

export const Result = () => {

    // Fetch submissions data
    const fetcher = url => fetch(url).then(res => res.json());
    const PAGE_SIZE = 3;
    
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        index =>
          `/api/submissions?limit=${PAGE_SIZE}&page=${index + 1}`,
        fetcher
      );


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

  return (
    <>

<div id="result" className="py-24 animate-gradient bg-gradient-to-r from-indigo-800 to-pink-800 bg-opacity-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="px-4 py-5 sm:px-6">
            <h3 className="pb-2 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Survey Sample Results
            </h3>
            <p className="my-2 text-xl text-white">
                Real-time IEQ POE Evaluation Data.
            </p>
            <p className="mt-5 mb-1 text-lg text-white md:text-right">
                Showing {size} page(s) of {isLoadingMore ? "..." : datas.length}{" "} data(s){" "}
            </p>
        </div>
        
        { results.map( (val, index) => (
        <div key={index} className="pb-10 border-gray-200 px-4">
            <dl>
            <div className="text-center bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-black">
                General
                </dt>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Age
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {val.age} years
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Gender
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {val.gender}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Highest Education
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {val.education}
                </dd>
            </div>
            <div className="bg-gray-200 text-center px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-black">
                Building
                </dt>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                State
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {val.state}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Building Category
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {val.buildingCategory}
                </dd>
            </div>
            <div className="bg-gray-200 text-center px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-black">
                Thermal
                </dt>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Temperature in your work space
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">

                        <span className="ml-2 flex-1 w-0 truncate">
                        Morning (08:00 - 11:00)
                        </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        {val.tempCommon.morning}
                    </div>
                    </li>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">

                            <span className="ml-2 flex-1 w-0 truncate">
                            Noon (11:00 - 13:00)
                            </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            {val.tempCommon.noon}
                        </div>
                    </li>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">

                            <span className="ml-2 flex-1 w-0 truncate">
                            Afternoon (13:00 - 17:00)
                            </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            {val.tempCommon.afternoon}
                        </div>
                    </li>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">

                            <span className="ml-2 flex-1 w-0 truncate">
                            Evening (17:00 - 21:00)
                            </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            {val.tempCommon.evening}
                        </div>
                    </li>
                </ul>
                </dd>
            </div>
            </dl>
        </div>        
    ))}
    
        <div className="px-4 py-5 sm:px-6 text-center">
            <p className="mt-1 mb-5 text-lg text-white md:text-center">
                Showing {size} page(s) of {isLoadingMore ? "..." : datas.length}{" "} data(s){" "}
            </p>
            <div className="py-3">
                <button
                className="w-full md:w-auto transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform text-white font-semibold hover:text-white py-2 min-w-max px-4 border border-blue-500 hover:border-transparent rounded mr-2 mb-2"
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

        </div>

    </div>
</div>

    </>
  );
};