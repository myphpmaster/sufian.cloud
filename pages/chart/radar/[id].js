/*  ./chart/multiline/[id].js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { Radar, Line } from 'react-chartjs-2';
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

  var labels = {
      never: 'Never',
      rarely: 'Rarely',
      sometimes: 'Sometimes',
      often: 'Often',
      always: 'Always',
    };

  var values = [];
  var splits = [];
  var objects = {};
  var counter = 0;

  for (const [key, val] of Object.entries(results)) {

    splits = val.identity.split('~');

    console.log(splits[0])
    
    console.log(splits[1])
    
    labels.push(val.identity);
    values.push(val.count);
    
    objects[splits[0]] = val.count;

    counter++;
}

console.log(labels)
console.log(JSON.stringify(objects))

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

    
const data = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56, 55, 40]
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [28, 48, 40, 19, 96, 27, 100]
      }
    ]
  };

    return (
    <>
      <div width="300" height="400">
        <Line
            data={data}
            width={750}
            height={500}
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