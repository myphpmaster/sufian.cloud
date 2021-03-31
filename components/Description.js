/*  ./components/Description.js     */
import React, { useState } from "react";
import { useSWRInfinite } from "swr";

const fetcher = url => fetch(url).then(res => res.json());
const PAGE_SIZE = 3;
var key = 0;

export const Description = () => {

//    const { data, error } = useSWR('/api/latest', fetcher );

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        index =>
          `/api/submissions?limit=${PAGE_SIZE}&page=${index + 1}`,
        fetcher
      );

    if (error) return (
        <div className="py-24 bg-gradient-to-r from-indigo-700 to-pink-500 bg-opacity-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-5 sm:px-6 text-center text-white text-red-300">
                    Data not found!
                </div>
            </div>
        </div>
        )
    if (!data) return (
        <div className="py-24 bg-gradient-to-r from-indigo-700 to-pink-500 bg-opacity-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-5 sm:px-6 text-center text-white text-red-300">
                    Loading...
                </div>
            </div>
        </div>
        )    

    const datas = data ? [].concat(...data) : [];

    var arr = [];
    Object.keys(data).forEach(function(key) {
      arr.push(data[key]);
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

<div id="result" className="py-24 bg-gradient-to-r from-indigo-700 to-pink-500 bg-opacity-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="px-4 py-5 sm:px-6">
            <h3 className="pb-2 text-5xl font-bold text-white sm:text-5xl md:text-6xl">
            Survey Sample Results
            </h3>
            <p className="my-2 text-xl text-white">
                Our real-time IEQ POE Evaluation Online Application.
            </p>
            <p className="mt-5 mb-1 text-lg text-white text-right">
                Showing {size} page(s) of {isLoadingMore ? "..." : datas.length}{" "} data(s){" "}
            </p>
        </div>
        
    { datas.map( val => (
        <div key={key++} className="pb-10 border-gray-200 px-4">
            <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Age
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {val.data.age}
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Gender
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {val.data.gender}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Education
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {val.data.education}
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Salary expectation
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                $120,000
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                About
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                Attachments
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">

                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate">
                        resume_back_end_developer.pdf
                        </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                        </a>
                    </div>
                    </li>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">

                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate">
                        coverletter_back_end_developer.pdf
                        </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                        </a>
                    </div>
                    </li>
                </ul>
                </dd>
            </div>
            </dl>
        </div>        
    ))}
    
        <div className="px-4 py-5 sm:px-6 text-center">
            <p className="mt-1 mb-5 text-lg text-white text-center">
                Showing {size} page(s) of {isLoadingMore ? "..." : datas.length}{" "} data(s){" "}
            </p>
            <div className="py-3">
                <button
                className="transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 text-white font-semibold hover:text-white py-2 min-w-max px-4 border border-blue-500 hover:border-transparent rounded mr-3.5"
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
                className="transition duration-500 ease-in-out bg-white hover:bg-blue-500 transform hover:-translate-y-1 hover:scale-110 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3.5"
                disabled={isRefreshing} onClick={() => mutate()}>
                {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>                
                <button 
                className="transition duration-500 ease-in-out bg-white hover:bg-blue-500 transform hover:-translate-y-1 hover:scale-110 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3.5"
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