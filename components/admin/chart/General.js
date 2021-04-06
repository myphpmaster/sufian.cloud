/*  ./components/admin/generalData.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";

export const Chart = () => {
    
    const fetcher = url => fetch(url).then(res => res.json());
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
    
  return (

<>

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
                
</>

  );
};