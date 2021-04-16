/*  ./components/bar.js     */
import React, { useState } from "react";
import useSWR, { useSWRInfinite } from "swr";
import { Bar } from 'react-chartjs-2';
import { useRouter } from "next/router";

const Chart = () => {

  const router = useRouter();
  const key = router.query.id
  const subkey = router.query.type ? router.query.type : false;
    
  const fetcher = url => fetch(url).then(res => res.json());
  const { data: survey } = useSWR(() => '/api/charts/?key=' + key, fetcher)

  const arr = survey ? [].concat(...survey) : [];
  const results = groupArray(arr);

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

  const { data: schem } = useSWR(() => '/api/label', fetcher)
  const schems = schem ? [].concat(...schem) : [];

  const renders = []
  const filters = ['type','key','label','suffix','prefix','questions','values']
  var x=0
  var inputs={}
  for (let i = 0; i < schems.length; i++) {
      // direct input
      if(schems[i].input) {
          inputs={}
          inputs=filterProps(schems[i],filters)
          renders.push(inputs)
          x++
      // panel
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
  
  var thisLabels=[]
  for (let x = 0; x < renders.length; x++) {
    if(renders[x].key==key){
        thisLabels = renders[x].values
        break
    }
  }

  //console.log('schems->'+JSON.stringify(schems))
  console.log('thisLabel->'+JSON.stringify(thisLabels))

  const vals = getGroupKeys(key, schems)

  const labels = [];
  const values = [];

  for (const [i, v] of Object.entries(results)) {

        let rawData = getLabel(v.identity, thisLabels) // realValue(v.identity, key, schems) // 

        console.log('v=>'+JSON.stringify(v))
        console.log('key=>'+JSON.stringify(key))
        console.log('rawData=>'+JSON.stringify(rawData))

        labels.push(rawData);
        values.push(v.count);
  }
  
  // console.log('results : ' + JSON.stringify(results))
  // console.log('labels : ' + JSON.stringify(labels))
  // console.log('values : ' + JSON.stringify(values))

  const labelsAlt = []  
  const valuesAlt = []
  
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

    const displayLabel = (subkey == 'likert') ? labelsAlt : labels;
    const displayData =  (subkey == 'likert') ? valuesAlt : values;

    const sample_data = {
        labels: displayLabel,
        datasets: [{
            data: displayData,
            label: '# of Respondents',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(125, 74, 50, 0.2)',
                'rgba(115, 119, 200, 0.2)',
                'rgba(185, 40, 150, 0.2)',
                'rgba(150, 150, 122, 0.2)',
                'rgba(150, 159, 164, 0.2)'
            ],
            hoverBackgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(125, 74, 50, 0.8)',
                'rgba(115, 119, 200, 0.8)',
                'rgba(185, 40, 150, 0.8)',
                'rgba(150, 150, 122, 0.8)',
                'rgba(150, 159, 164, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(125, 74, 50, 1)',
                'rgba(115, 119, 200, 1)',
                'rgba(185, 40, 150, 1)',
                'rgba(150, 150, 122, 1)',
                'rgba(150, 159, 164, 1)'
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
        <Bar
            data={sample_data}
            width={750}
            height={500}
            options={options}
        />          
      </div>
      </>
    );
    
};

function getLabel(value, labels){
    for (let k = 0; k < labels.length; k++) {
        if(labels[k].value==value){
            value=labels[k].label
            break
        }
    }
    return value
}

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

function realValue(key, value, schema, title=false){

    let rawData = key
    let rawKey = value

    for (let i = 0; i < schema.length; i++) {

        let obj = schema[i].components

        for (let j = 0; j < obj.length; j++) {

            // console.log('obj[j].key =>' + obj[j].key)

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

// function to group all data counts
function countGroup (val='', datas = []) {
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

function filterProps(objects={},props=[],inputs={}){
    for (let i = 0; i < props.length; i++) {
        inputs[props[i]] = objects.hasOwnProperty(props[i]) ? objects[props[i]] : false
    }
    if( inputs.type=='select' && props.includes('values') ){
        inputs.values = objects.data.values
    }
    return inputs
}

export default Chart