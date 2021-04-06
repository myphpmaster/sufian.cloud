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
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                    Height [cm]
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.height}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                    Weight [kg]
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.weight}
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
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                    Location
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.location}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                    Air Conditioning System
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.airConditioning}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                    Blinds in Use
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.blindsInUse}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                    Fan in Use
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.fanInUse}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                    Windows in Use
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.windowsInUse}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                    Doors in Use
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.doorsInUse}
                                    </dd>
                                </div>
                                <div className="bg-gray-200 text-center px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-black">
                                    Thermal
                                    </dt>
                                </div>
                                <div className={`${val.hvacType? '': 'hidden'} bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                                    <dt className="text-sm font-medium text-gray-500">
                                    HVAC Type
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.hvacType}
                                    </dd>
                                </div>
                                <div className={`${val.ACcontroller ? '': 'hidden'} bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                                    <dt className="text-sm font-medium text-gray-500">
                                    Air conditioning controller
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {val.ACcontroller}
                                    </dd>
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
                        

                        </div>
                    </div>
                </div>

</>

  );
};