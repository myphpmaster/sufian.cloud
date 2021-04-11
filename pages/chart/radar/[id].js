/*  ./chart/radar/[id].js     */
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

//    console.log('results =>' + JSON.stringify(results));

    const { data: schem } = useSWR(() => '/api/label', fetcher)
    const schems = schem ? [].concat(...schem) : [];

    var cats = getGroupKeys(key, schems, true)
    var vals = getGroupKeys(key, schems)

//    console.log('cats =>' + JSON.stringify(cats));
//    console.log('vals =>' + JSON.stringify(vals));

    var groups = []

    for (let i = 0; i < cats.length; i++) {

        const cat = cats[i];
        var foo = {}      
        var bar = {}  

        for (var j in cat) {
            
           // console.log('j =>' + JSON.stringify(j));

            for (let k = 0; k < vals.length; k++) {

                const val = vals[k];

                for (var l in val) {            

                    bar[l] = countGroup(j, l, results)
             //       console.log('l =>' + JSON.stringify(l));

                }
                foo[j] = bar
            }
        }
        groups.push(foo)
    }

// console.log('groups =>' + JSON.stringify(groups));

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

    var labels = []
    var datas = []

    for (let i = 0; i < groups.length; i++) {

        const cat = groups[i];

        for (var j in cat) {
            
            const val = cat[j]

            console.log('j =>' + JSON.stringify(j + ' ' + cat[j]));

            for (var l in val) {            

                console.log('l =>' + JSON.stringify(l + ' ' + val[l]));
            }
        }
        groups.push(foo)
    }

    const identity = [
        {
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
        },
        {
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
        }
        ]

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
            <Radar
                data={data}
                width={750}
                height={500}
            />          
        </div>
        </>
    );
    
};

// function to group all data counts
function countGroup (key='', val='', datas = []) {
    var counts = 0
    for (let i = 0; i < datas.length; i++) {
        let obj = datas[i]
        if( obj instanceof Object ){                                    
            for (let j in obj){     
                if(obj.identity == key + '~' + val) {
                    counts = obj.count
                }
            }
        } 
    }
    return counts;
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

function realValue(key, value, schema, title=false){

    let rawData = key
    let rawKey = value

    for (let i = 0; i < schema.length; i++) {

        let obj = schema[i].components

        for (let j = 0; j < obj.length; j++) {

            console.log('obj[j].key =>' + obj[j].key)

            if (rawKey == obj[j].key) {

                let values = obj[j]

                // For dropdown select input
                if( values.hasOwnProperty('data') ){
                    values = values.data
                }

                // radio input directly have this property
                if( values.hasOwnProperty('values') ){

                    let realVal = values.values

                    if(title){
                        realVal = values.questions
                    }

                    for (let k = 0; k < realVal.length; k++) {

                        if(rawData == realVal[k].value || rawData === realVal[k].value ) {

                            rawData = realVal[k].label
                            break;
                        }
                    }
                }
            }
        }
    }
    return rawData
}

function getGroupKeys(key, schema, title=false){

    let groupKeys=[]

    for (let i = 0; i < schema.length; i++) {

        let obj = schema[i].components

        for (let j = 0; j < obj.length; j++) {

            // console.log('obj[j].key =>' + obj[j].key)

            if (key == obj[j].key) {

                let values = obj[j]

                // For dropdown select input
                if( values.hasOwnProperty('data') ){
                    values = values.data
                }

                // radio input directly have this property
                if( values.hasOwnProperty('values') ){

                    let realVal = values.values

                    if(title){
                        realVal = values.questions
                    }

                    console.log('realVal =>' + JSON.stringify(realVal))

                    for (let k = 0; k < realVal.length; k++) {

                        var foo = {};
                        foo[realVal[k].value.toString()] = realVal[k].label
                        groupKeys.push(foo);
                        
                        console.log('realVal[k] =>' + k + JSON.stringify(realVal[k]))

                    }
                }
            }
        }
    }
    return groupKeys
}

export default Chart