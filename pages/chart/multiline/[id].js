/*  ./chart/multiline/[id].js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { Line } from 'react-chartjs-2';
import { useRouter } from "next/router";

const Chart = () => {

  const router = useRouter();
  const key = router.query.id
    
  const fetcher = url => fetch(url).then(res => res.json());
  const { data: survey } = useSWR(() => '/api/charts/?key=' + key, fetcher)

  const arr = survey ? [].concat(...survey) : [];
  const results = groupArray(arr);

  var groups = [];
  groups['morning'] = countGroup(arr,'morning')

  console.log(JSON.stringify(groups));

  // Sorting based on values 
  results.sort(function(a, b) {
        var valueA, valueB;

        valueA = a['identity']; // Where 1 is your index, from your example
        valueB = b['identity'];
        if (valueA < valueB) {
            return -1;
        }
        else if (valueA > valueB) {
            return 1;
        }
        return 0;
  });

  const labels = [];
  const values = [];
  var splits = [];
  var count = 0;

  for (const [key, val] of Object.entries(results)) {

        splits[count] = val.identity.split('~');
        
            labels[splits][count][0].push(val.identity);
            values[splits][count][0].push(val.count);
        
        count++;
  }

  console.log(labels)
  console.log(values)

  var options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
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

    const checkinsData = {
        labels: [
          "4 P.M",
          "5 P.M",
          "6 P.M",
          "7 P.M",
          "8 P.M",
          "9 P.M",
          "10 P.M",
          "11 P.M",
          "12 A.M",
          "1 A.M",
          "2 A.M",
          "3 A.M",
          "4 A.M"
        ],
        datasets: [
          {
            label: "Day",
            backgroundColor: "blue",
            borderColor: "#333",
            borderWidth: 2,
            lineTension: 0.1,
            fill: true,
            data: [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4]
          },
          {
            label: "Week",
            backgroundColor: "green",
            borderColor: "#333",
            borderWidth: 2,
            lineTension: 0.1,
            fill: true,
            labels: ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"],
            data: [12, 22, 30, 14, 55, 6, 70]
          },
          {
            label: "Month",
            backgroundColor: "red",
            borderColor: "#333",
            borderWidth: 2,
            lineTension: 0.1,
            fill: true,
            data: [100, 224, 88, 40, 500, 600, 78, 800, 91, 100, 1000, 120]
          }
        ]
      };
      
    const sample_data = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
        {
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 40]
        }, {
            type: 'line',
            label: 'Line Dataset',
            data: [50, 50, 50, 50],
        }
        ]
    }
  
    return (
    <>
      <div width="300" height="400">
        <Line
            data={checkinsData}
            options={{
              title: {
                text: "Total Check-ins",
                fontSize: 20,
                display: true
              },
              legend: {
                display: true,
                position: "top"
              }
            }}
        />          
      </div>
    </>
    );
    
};

// function to group all data counts
function countGroup (arr = [], key='') {

    let map = new Map();

    for (let i = 0; i < arr.length; i++) {

        let obj = arr[i]

            if( obj instanceof Object ){
                                    
                for (let j in obj){
                    
                    
                    if ( typeof obj === 'object' && objectSize(obj[j]) > 0 ){
                        //recursive call to scan property
                        let recur = obj[j]

                        for (let k in recur){
                            
                            if ( typeof recur === 'object' && objectSize(recur[k]) > 0 ){
                                //recursive call to scan property
                                let child = recur[k]

                                for (let l in child){
                                    
                                    if( JSON.stringify(l) == key ){
                                        const w = JSON.stringify(child[l]);
                                        if(!map.has(w)){

                                            map.set(w, {
                                                identity: child[l],
                                                count: 1,
                                            });

                                        }else{
                                            map.get(w).count++;
                                        }
                                    }

                                }

                            }

                        }

                    }
                }

            } 

    }
    const res = Array.from(map.values())
    return res;
};

// function to group all data counts
function groupArray (arr = []) {

        let map = new Map();

        for (let i = 0; i < arr.length; i++) {

            let obj = arr[i]

                if( obj instanceof Object ){    
                                        
                    for (let j in obj){
                        
                        
                        if ( typeof obj === 'object' && objectSize(obj[j]) > 0 ){
                            //recursive call to scan property
                            let recur = obj[j]

                            for (let k in recur){
                                
                                if ( typeof recur === 'object' && objectSize(recur[k]) > 0 ){
                                    //recursive call to scan property
                                    let child = recur[k]

                                    for (let l in child){
                                        
                                        const w = JSON.stringify(l+'~'+child[l]);
                                        if(!map.has(w)){

                                            map.set(w, {
                                                identity: l+'~'+child[l],
                                                count: 1,
                                            });

                                        }else{
                                            map.get(w).count++;
                                        }

                                    }

                                }else if ( typeof recur === 'string' ) {
        
                                    const x = JSON.stringify(k+recur[k]);
                                    if(!map.has(x)){

                                        map.set(x, {
                                            identity: k+recur[k],
                                            count: 1,
                                        });

                                    }else{
                                        map.get(x).count++;
                                    }


                                }

                            }

                        }else if ( typeof obj === 'string' ) {
 
                            const y = JSON.stringify(j+obj[j]);
                            if(!map.has(y)){

                                map.set(y, {
                                    identity: j+obj[j],
                                    count: 1,
                                });

                            }else{
                                map.get(y).count++;
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

export default Chart