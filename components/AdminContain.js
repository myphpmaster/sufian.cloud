/*  ./components/AdminContain.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";

export const Contain = () => {
    
    const fetcher = url => fetch(url).then(res => res.json());

/*
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

 */
    const { data } = useSWR(() => '/api/submissions?limit=1&page=1', fetcher)
    const datas = data ? [].concat(...data) : [];

    const results = [];
    datas.forEach(function(value, index, array) {
        // The callback is executed for each element in the array.
        // `value` is the element itself (equivalent to `array[index]`)
        // `index` will be the index of the element in the array
        // `array` is a reference to the array itself (i.e. `datas` in this case)
        results.push(value.data);
    }); 
    
    // Total respondents
    const { data: count } = useSWR(() => '/api/count/', fetcher)

    // Latest entry at least n days   
    var diff = 2;
    var today = new Date();
    today.setDate(today.getDate() - diff)
    const { data: latest } = useSWR(() => '/api/latest/?from=' + today.toISOString(), fetcher)
//    console.log(today.toISOString())

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2*diff)
    const { data: lastLatest } = useSWR(() => '/api/latest/?from=' + yesterday.toISOString(), fetcher)
    console.log(yesterday.toISOString())

    const yesterDay = (lastLatest - latest)/2
    const diffDay = latest - yesterDay

    var difSign = 'fa-minus';
    if(diffDay > 0) {
        difSign = 'fa-caret-up';
    }else if(diffDay<0){
        difSign = 'fa-caret-down';
    }
    
    /* Calculate Server running time */
    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
        var hDisplay = h < 10 ? '0' + h + 'h:' : h + 'h:';
        var mDisplay = m < 10 ? '0' + m + 'm' : m + 'm' ;
        return dDisplay + hDisplay + mDisplay;
    }

    const date_start = new Date('03/25/2021');
    const date_now = new Date();
        
    // To calculate the time difference of two dates
    const Difference_In_Time = Math.round((date_now.getTime()-date_start.getTime())/1000);
    const Display_Time = secondsToDhms(Difference_In_Time);

  return (

<>

    {       /*  <!--Container-->  */      }
    <div className="container w-full mx-auto pt-20">

        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">

            {       /*  <!--Console Content-->  */      }
            <div className="flex flex-wrap">

                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-pink-600"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Total Respondents</h5>
                                <h3 className="font-bold text-3xl">{count} <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></h3>
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
                                <h3 className="font-bold text-3xl">{latest ? latest : '0'} <span className="text-yellow-600"><i className={`fas ${difSign}`}></i></span></h3>
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
                                <h3 className="font-bold text-3xl">{Display_Time}</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
            {       /*  <!--Console Content-->  */      }

            { /*<!--Divider-->*/ }
            <hr className="border-b-2 border-gray-400 my-8 mx-4" />

            <div className="pb-5 text-2xl font-bold text-center text-black">
                
                <a href="/admin/">General</a> | <a href="/admin/building">Building</a>
            
            </div>
            { /* <!--Graph Section --> */ }
            <div className="flex flex-row flex-wrap flex-grow mt-2">

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600 text-center">Age</h5>
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
                            <h5 className="font-bold uppercase text-gray-600 text-center">Gender</h5>
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
                            <h5 className="font-bold uppercase text-gray-600 text-center">Highest Education</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/doughnut/education" frameBorder="0" />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600 text-center">Height [cm]</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/line/height" frameBorder="0" />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600 text-center">Weight [kg]</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/line/weight" frameBorder="0" />
                            </div>
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

            </div>
            { /* <!--Graph Section --> */ }

        </div>

    </div>
    {       /*  <!--/Container-->  */      }
</>

  );
};