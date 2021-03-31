/*  ./components/Azure.js     */
import React, { useState } from "react";
import { useSWRInfinite } from "swr";

const fetcher = url => fetch(url).then(res => res.json());
const PAGE_SIZE = 3;
var key = 0;

export const Azure = () => {

  return (
    <>

<div id="result" className="py-24 bg-indigo-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
        <div className="px-4 py-5 sm:px-6 text-center">
            <h2>
                This application was developed in conjuction with 
            </h2>      
            <p className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl py-3">
                <a href="https://discover-ai-with-microsoft.agorize.com/en/challenges/msazurevirtualhack-2021/pages/timeline-and-guidelines?lang=en">
                    Microsoft Azure Virtual Hackathon 2021</a>
            </p>
                Provide innovative solutions in advanced data analytics and AI for a number of booming industries!
        </div>
    </div>
</div>

    </>
  );
};