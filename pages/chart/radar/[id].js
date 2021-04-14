/*  ./chart/radar/[id].js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { Radar, Line, Bar } from 'react-chartjs-2';
import { useRouter } from "next/router";

const Chart = () => {

    const router = useRouter();
    const key = router.query.id
    const subkey = router.query.type ? router.query.type : false;
        
    const fetcher = url => fetch(url).then(res => res.json());
    const { data: survey } = useSWR(() => '/api/charts/?key=' + key, fetcher)

    const arr = survey ? [].concat(...survey) : [];
    const results = groupArray(arr);

    // console.log('results =>' + JSON.stringify(results));

    const { data: schem } = useSWR(() => '/api/label', fetcher)
    const schems = schem ? [].concat(...schem) : [];

    const cats = getGroupKeys(key, schems, true)
    const vals = getGroupKeys(key, schems)

    // console.log('cats =>' + JSON.stringify(cats));
    // console.log('vals =>' + JSON.stringify(vals));

    const groups = []
    const labels = []
    const labelsKey = []
    const labelsAlt = []
    const labelsKeyAlt = []
    const datas = {}
    const datasAlt = {}

    for (let i = 0; i < cats.length; i++) {

        const cat = cats[i];
        var foo = {}      
        var bar = {}
        for (var j in cat) {
            
            datas[j]={}
            datasAlt[j]={}

            let x=0;
            let y=0;

            for (let k = 0; k < vals.length; k++) {

                const val = vals[k];

                console.log('val =>' + JSON.stringify(val));

                for (var l in val) {            

                    bar[l] = countGroup(j, l, results)
                    
                    datas[j][l] = bar[l]
                    datasAlt[j][x] = bar[l]
                    
                    if(!labelsAlt.includes(val[l])) {
                        labelsAlt.push(val[l])
                    }
                    if(!labelsKeyAlt.includes(l)) {
                        labelsKeyAlt.push(l)
                    }
                    x++;
                }
                foo[j] = bar

            }
            
            if(!labels.includes(cat[j])) {
                labels.push(cat[j])
            }
            if(!labelsKey.includes(j)) {
                labelsKey.push(j)
            }
        }
        groups.push(foo)
    }

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
        },
        {
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
        },
        {
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
        },
        {
            backgroundColor: 'rgba(114,131,156,0.2)',
            borderColor: 'rgba(114,131,156,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
        },
        {
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
        },
        {
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
        },
        ]

    var route = (subkey == 'likert') ? cats : vals
    var varies = (subkey == 'likert') ? datasAlt : datas

    const dataset = []
    var foo = {}
    
    for (let i = 0; i < route.length; i++) {

        let labelObj = route[i]
        let labelName = ''
        let arrayData = []
        let objData = {}

        for (let j in labelObj){ 
            labelName = labelObj[j]

            for (let k in datas) {

                if (subkey == 'likert'){ 

                    if( k == Object.keys(route[i]).find(key => route[i][key] === labelName) ){

                        // Not finished yet
                        let subdata = Object.keys(varies[k]).sort().reduce((r, l) => (r[l] = varies[k][l], r), {})

                        // console.log('subdata => ' + JSON.stringify(subdata))

                        for (let l in subdata) {    
                            objData[l] = subdata[l]
                            arrayData.push(objData[l])
                        }
                    }                    
                }else{
                    arrayData.push(datas[k][j])
                }
            }
        }

        foo = 
        {
            label: labelName,
            backgroundColor: identity[i].backgroundColor,
            borderColor: identity[i].borderColor,
            pointBackgroundColor: identity[i].pointBackgroundColor,
            pointBorderColor: identity[i].pointBorderColor,
            pointHoverBackgroundColor: identity[i].pointHoverBackgroundColor,
            pointHoverBorderColor: identity[i].pointHoverBorderColor,
            data: arrayData
        }
        
        dataset.push(foo)
    }

    const useLabel = (subkey == 'likert') ? labelsAlt : labels

    const data = {
        labels: useLabel,
        datasets: dataset
    };

    // console.log('vals =>' + JSON.stringify(vals));
    // console.log('data =>' + JSON.stringify(data));

    return (
        <>
        <div width="600" height="400">
            <Radar
                data={data}
                width={600}
                height={400}
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

 //           console.log('obj[j].key =>' + obj[j].key)

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

//                    console.log('realVal =>' + JSON.stringify(realVal))

                    for (let k = 0; k < realVal.length; k++) {

                        var foo = {};
                        foo[realVal[k].value.toString()] = realVal[k].label
                        groupKeys.push(foo);
                        
//                        console.log('realVal[k] =>' + k + JSON.stringify(realVal[k]))

                    }
                }
            }
        }
    }
    return groupKeys
}

export default Chart