/*  ./chart/radar/[id].js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { Radar, Line, Bar } from 'react-chartjs-2';
import { useRouter } from "next/router";

const Chart = () => {

    // setup dynamic routes - /{chart type}/{key input}/
    const router = useRouter();
    const slug = router.query.slug || []

    const chart = slug[0] ? slug[0] : false
    const key = slug[1] ? slug[1] : false
    const subkey = slug[2] ? slug[2] : false;
        
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
                // console.log('val =>' + JSON.stringify(val));

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

    var route = (subkey == 'likert') ? cats : vals
    var varies = (subkey == 'likert') ? datasAlt : datas
        
    // generate random colors for background, hover, border
    var r = () => Math.random() * 256 >> 0;
    const rgbcode=[], bgColor=[], hoverColor=[], borderColor=[];
    const identity = []

    for (let k = 0; k < route.length; k++) {
        rgbcode[k] = `${r()}, ${r()}, ${r()}`;
        bgColor[k] = `rgba(${rgbcode[k]}, 0.3)`;
        hoverColor[k] = `rgba(${rgbcode[k]}, 0.75)`;
        borderColor[k] = `rgba(${rgbcode[k]}, 1)`;

        let iden={
                backgroundColor: bgColor[k],
                borderColor: borderColor[k],
                pointBackgroundColor: borderColor[k],
                pointHoverBorderColor: borderColor[k],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
            }

        identity.push(iden)
    }

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

    // define the typical options properties
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

//    const width = 750
//    const height = 500
  
    return (
        generateChart(chart, data, options)
    );
    
    
};

function generateChart(chart, data, options, width="640", height="480"){
    // Line, Bar, Random, Radar
    switch (chart) {
        default:
        case 'line':
            for(let j=0; j<data.datasets.length; j++){
                data.datasets[j].type = chart
            }

        case 'mix':

            const types = ["bar", "line"];
            for(let j=0; j<data.datasets.length; j++){
                let random = Math.floor(Math.random() * types.length);
                data.datasets[j].type = types[random]
            }

        case 'bar':
            return (
                <div width={width} height={height}>
                    <Bar
                        data={data}
                        width={width}
                        height={height}
                        options={options}
                    />          
                </div>
            );
            
        case 'radar':

            // remove y axes line 
            options.scales.yAxes = [{
                display: false,
                ticks: {
                    beginAtZero: true
                }
            }]
            
            return (
                <div width={width} height={height}>
                    <Radar
                        data={data}
                        width={width}
                        height={height}
                        options={options}
                    />          
                </div>
            );
    }
}

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