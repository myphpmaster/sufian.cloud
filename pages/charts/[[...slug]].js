/*  ./pages/charts/[[...slug]].js     */
import React, { useEffect } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { useRouter } from "next/router";
import { randomColor } from "../../function/randomColor"
import { generateChart } from "../../function/generateChart"
import { getGroupKeys } from "../../function/getGroupKeys"

const Chart = () => {

	//remove class from body element
	useEffect( () => { document.querySelector("body").classList.remove("bg-gray-100") } );

    // setup dynamic routes - /charts/{chart type}/{key input}/
    const router = useRouter();
    const slug = router.query.slug || []

    const chart = slug[0] || false
    const key = slug[1] || false
    const subkey = slug[2] || false;

    // Fetch all submissions data for the input 'key' using /api/charts.js file
    const fetcher = url => fetch(url).then(res => res.json());
    const { data: survey } = useSWR(() => '/api/charts/?key=' + key, fetcher)

    const arr = survey ? [].concat(...survey) : [];
    const results = groupArray(arr); //

    // Sorting the results based on values 
    results.sort(function(a, b) {
            var valueA, valueB;

            valueA = a['identity']; // Where identity is object property to be sorted
            valueB = b['identity'];
            if (valueA < valueB) {
                return -1;
            }
            else if (valueA > valueB) {
                return 1;
            }
            return 0;
    });

    // Get form schema as schems
    const { data: schem } = useSWR(() => '/api/label', fetcher)
    const schems = schem ? [].concat(...schem) : [];

    // simplify the schems as renders
    const renders = []
    const filters = ['type','key','label','suffix','prefix','questions','values'] // Properties to be included
    var x=0
    var inputs={}
    for (let i = 0; i < schems.length; i++) {
        // for direct input
        if(schems[i].input) {
            inputs={}
            inputs=filterProps(schems[i],filters)
            renders.push(inputs)
            x++
        // for panel type
        }else if(schems[i].type=='panel'){
            let obj = schems[i].components
            var panel = {}
            panel.id = i
            panel.key = schems[i].key
            panel.title = schems[i].title
            // console.log('panel['+i+']=>'+JSON.stringify(panel))
            for (let j = 0; j < obj.length; j++) {
                if (obj[j].type == 'columns'){
                    let col = obj[j].columns
                    for (let k = 0; k < col.length; k++) {
                        let subcol = [] = col[k].components
                        for (let l = 0; l < subcol.length; l++) {
                            if (subcol[l].input) {
                                inputs={}
                                inputs.panel = (schems[i].type=='panel') ? panel : false
                                inputs=filterProps(subcol[l],filters,inputs)
                                // console.log('inputs['+x+']=>'+JSON.stringify(inputs))
                                renders.push(inputs)
                                x++
                            }
                        }
                    }
                }else if (obj[j].input) {
                    inputs={}
                    inputs.panel = (schems[i].type=='panel') ? panel : false
                    inputs=filterProps(obj[j],filters,inputs)
                    renders.push(inputs)
                }
            }			
        }
    }
    
    // Filter all values in 'key' input type as an array (thisLabels)
    var thisLabels=[]
    for (let x = 0; x < renders.length; x++) {
        if(renders[x].key==key){
            thisLabels = renders[x].values
            break
        }
    }
    // console.log('thisLabel->'+JSON.stringify(thisLabels))

    const vals = getGroupKeys(key, schems)
    const labels = []
    const values = []

    for (const [i, v] of Object.entries(results)) {

            let rawData = getLabel(v.identity, thisLabels) // realValue(v.identity, key, schems) // 
            // console.log('v=>'+JSON.stringify(v))
            // console.log('key=>'+JSON.stringify(key))
            // console.log('rawData=>'+JSON.stringify(rawData))

            labels.push(rawData);
            values.push(v.count);
    }    
    // console.log('results : ' + JSON.stringify(results))
    // console.log('labels : ' + JSON.stringify(labels))
    // console.log('values : ' + JSON.stringify(values))
        
    const valuesAlt = []
    const labelsAlt = []
    var x = 0
    for (let k = 0; k < vals.length; k++) {
        const val = vals[k];
        for (var l in val) {     
            labelsAlt[l] = val[l]
            valuesAlt[x] = countGroup(l, results)
            x++;
        }
    }    
    // console.log('labelsAlt=>' + JSON.stringify(labelsAlt));
    // console.log('valuesAlt=>' + JSON.stringify(valuesAlt));

    const displayLabel = (subkey == 'likert') ? labelsAlt : labels;
    const displayData =  (subkey == 'likert') ? valuesAlt : values;

    // generate random colors for background, hover, border
    const rgbcode=[], bgColor=[], hoverColor=[], borderColor=[];
    for (let k = 0; k < displayLabel.length; k++) {
        rgbcode[k] = randomColor();
        bgColor[k] = `rgba(${rgbcode[k]}, 0.3)`;
        hoverColor[k] = `rgba(${rgbcode[k]}, 0.75)`;
        borderColor[k] = `rgba(${rgbcode[k]}, 1)`;
    }

    // Define the dataset constant
    const datasets = []
    const dataset = {
            data: displayData,
            label: '# of Respondents',
            backgroundColor: bgColor,
            hoverBackgroundColor: hoverColor,
            borderColor: borderColor,
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
        }

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

    datasets.push(dataset)
    
    const data = {
        labels: displayLabel,
        datasets: datasets
    }

    //const width = 750
    //const height = 500
  
    return (
        generateChart(chart, data, options)
    );
    
};

export default Chart

// Function to filter selected properties
const filterProps = (objects={},props=[],inputs={}) => {
    for (let i = 0; i < props.length; i++) {
        inputs[props[i]] = objects.hasOwnProperty(props[i]) ? objects[props[i]] : false
    }
    if( inputs.type=='select' && props.includes('values') ){
        inputs.values = objects.data.values
    }
    return inputs
}

// Function to get label from raw value
const getLabel = (value, labels) => {
    for (let k = 0; k < labels.length; k++) {
        if(labels[k].value==value){
            value=labels[k].label
            break
        }
    }
    return value
}

// function to group all data counts
const groupArray = (arr = []) => {
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

// function to check object size
const objectSize = (obj = {}) => {
        var size = 0, key;
        if (typeof obj === 'object') {
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
        } 
    return size;
};

// function to group all data counts
const countGroup = (val='', datas = []) => {
    var counts = 0
    for (let i = 0; i < datas.length; i++) {
        let obj = datas[i]
        
        if( obj instanceof Object ){                                    
            for (let j in obj){     
                
                if(obj.identity.toString() === val.toString() ) {
                    counts = obj.count
                }
            }
        } 
    }
    return counts;
};
