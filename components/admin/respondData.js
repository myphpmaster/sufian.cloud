/*  ./components/AdminRespondData.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";

export const RespondData = () => {
    
    const fetcher = url => fetch(url).then(res => res.json());
   
    // Total respondents
    const { data: count } = useSWR(() => '/api/count/', fetcher)

    // Latest entry at least n days   
    const diff = 1;
    var today = new Date();
    today.setDate(today.getDate() - diff)
    today = today.toISOString().split('T')[0]
    const { data: latest } = useSWR(() => '/api/latest/?from=' + today, fetcher)

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2*diff)
    yesterday = yesterday.toISOString().split('T')[0]
    const { data: lastLatest } = useSWR(() => '/api/latest/?from=' + yesterday, fetcher)

    const yesterDay = lastLatest - latest
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

            <section className="flex flex-wrap">

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
                                <h3 className="font-bold text-3xl">{latest} <span className="text-yellow-600"><i className={`fas ${difSign}`}></i></span></h3>
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

            </section>

  );
};