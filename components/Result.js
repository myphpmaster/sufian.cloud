/*  ./components/Result.js     */
import React, { useState } from "react";
import { Table } from './admin/latestData';

export const Result = () => {

  return (
    <>

        <div id="result" className="py-8 animate-gradient md:bg-gradient-to-r md:from-indigo-700 md:to-pink-500 md:bg-opacity-50 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="pb-2 text-4xl font-bold md:text-white text-black sm:text-5xl md:text-6xl">
                        Survey Result
                    </h3>
                    <p className="my-2 text-xl md:text-white text-black">
                        Real-time IEQ POE Evaluation Data.
                    </p>
                </div>
        
                <div className="px-4 py-5 sm:px-6 ">
                    <Table />
                </div>

            </div>
        </div>

    </>
  );
};