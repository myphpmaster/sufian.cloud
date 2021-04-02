/*  ./components/AdminContain.js     */
import React, { useState } from "react";
import { useSWRInfinite } from "swr";
import BarGraph from './bar';

export const Contain = () => {

    const fetcher = url => fetch(url).then(res => res.json());
    const PAGE_SIZE = 3;
    const KEY = 'age';
    
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        index =>
          `/api/charts/?key=${KEY}`,
        fetcher
      );

    const datax = data ? [].concat(...data) : [];

    console.log(datax);

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

    const results = [];
    datas.forEach(function(value, index, array) {
        // The callback is executed for each element in the array.
        // `value` is the element itself (equivalent to `array[index]`)
        // `index` will be the index of the element in the array
        // `array` is a reference to the array itself (i.e. `data.items` in this case)
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
                                <h5 className="font-bold uppercase text-gray-500">Total Users</h5>
                                <h3 className="font-bold text-3xl">249 <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></h3>
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
                                <h5 className="font-bold uppercase text-gray-500">New Users</h5>
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
                            <h5 className="font-bold uppercase text-gray-600">Graph</h5>
                        </div>
                        <div className="p-5">
                            <BarGraph />
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Graph</h5>
                        </div>
                        <div className="p-5">
                            <canvas id="chartjs-0" className="chartjs" width="undefined" height="undefined"></canvas>
                            <script
                                dangerouslySetInnerHTML={
                                    {
                                    __html: `	
                                    new Chart(document.getElementById("chartjs-0"), {
                                        "type": "line",
                                        "data": {
                                            "labels": ["January", "February", "March", "April", "May", "June", "July"],
                                            "datasets": [{
                                                "label": "Views",
                                                "data": [65, 59, 80, 81, 56, 55, 40],
                                                "fill": false,
                                                "borderColor": "rgb(75, 192, 192)",
                                                "lineTension": 0.1
                                            }]
                                        },
                                        "options": {}
                                    });
                                `
                                }}
                            />
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Graph</h5>
                        </div>
                        <div className="p-5">
                            <canvas id="chartjs-1" className="chartjs" width="undefined" height="undefined"></canvas>
                            <script
                                dangerouslySetInnerHTML={
                                    {
                                    __html: `
                                    new Chart(document.getElementById("chartjs-1"), {
                                        "type": "bar",
                                        "data": {
                                            "labels": ["January", "February", "March", "April", "May", "June", "July"],
                                            "datasets": [{
                                                "label": "Likes",
                                                "data": [65, 59, 80, 81, 56, 55, 40],
                                                "fill": false,
                                                "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
                                                "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
                                                "borderWidth": 1
                                            }]
                                        },
                                        "options": {
                                            "scales": {
                                                "yAxes": [{
                                                    "ticks": {
                                                        "beginAtZero": true
                                                    }
                                                }]
                                            }
                                        }
                                    });
                                `
                                }}
                            />	
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Graph</h5>
                        </div>
                        <div className="p-5"><canvas id="chartjs-4" className="chartjs" width="undefined" height="undefined"></canvas>
                            <script
                                dangerouslySetInnerHTML={
                                    {
                                    __html: `
                                    new Chart(document.getElementById("chartjs-4"), {
                                        "type": "doughnut",
                                        "data": {
                                            "labels": ["P1", "P2", "P3"],
                                            "datasets": [{
                                                "label": "Issues",
                                                "data": [300, 50, 100],
                                                "backgroundColor": ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"]
                                            }]
                                        }
                                    });
                                `
                                }}
                            />	
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600">Template</h5>
                        </div>
                        <div className="p-5">

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