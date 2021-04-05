/*  ./components/bar.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import {Doughnut} from 'react-chartjs-2';
import { useRouter } from "next/router";

const BarChart = () => {

  const router = useRouter();
  const key = router.query.id
    
  const fetcher = url => fetch(url).then(res => res.json());
  const { data: survey } = useSWR(() => '/api/charts/?key=' + key, fetcher)

  const arr = survey ? [].concat(...survey) : [];
  const results = groupArray(arr);

  const labels = [];
  const values = [];

  for (const [key, val] of Object.entries(results)) {
        labels.push(val.identity);
        values.push(val.count);
  }

  var options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },

    };

    const sample_data = {
        labels: labels,
        datasets: [{
            data: values,
            label: '# of Respondents',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            hoverBackgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        }]
    }
  
    return (
      <>
      <div width="300" height="400">
        <Doughnut
            data={sample_data}
            width={750}
            height={500}
            options={options}
        />          
      </div>
      </>
    );
    
};

// function to group all data counts
function groupArray (arr = []) {

        let map = new Map();

        for (let i = 0; i < arr.length; i++) {

            let obj = arr[i]

                if( obj instanceof Object ){    
                                        
                    for (let k in obj){
                        
                        
                        if ( typeof obj === 'object' && objectSize(obj[k]) > 0 ){
                            //recursive call to scan property
                            let recur = obj[k]

                            for (let j in recur){
                                
                                const w = JSON.stringify(recur[j]);
                                if(!map.has(w)){

                                    map.set(w, {
                                        identity: recur[j],
                                        count: 1,
                                    });

                                }else{
                                    map.get(w).count++;
                                }

                            }

                        }else if ( typeof obj === 'string' ) {
 
                            const s = JSON.stringify(obj[k]);
                            if(!map.has(s)){

                                map.set(s, {
                                    identity: obj[k],
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

export default BarChart