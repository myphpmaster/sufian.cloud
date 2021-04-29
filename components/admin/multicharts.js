/*  ./components/admin/charts.js     */
import useSWR from "swr";
import { randomColor } from "../../function/randomColor"
import { generateChart } from "../../function/generateChart"
import { getGroupKeys } from "../../function/getGroupKeys"

export const MultiChart = ({ chart, input, subinput }) => {
        
    const fetcher = url => fetch(url).then(res => res.json());
    const { data: survey } = useSWR(() => '/api/charts/?key=' + input, fetcher)

    const arr = survey ? [].concat(...survey) : [];
    const results = groupArray(arr);
    // console.log('results =>' + JSON.stringify(results));

    const { data: schem } = useSWR(() => '/api/label', fetcher)
    const schems = schem ? [].concat(...schem) : [];

    const cats = getGroupKeys(input, schems, true)
    const vals = getGroupKeys(input, schems)
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

    var route = (subinput == 'likert') ? cats : vals
    var varies = (subinput == 'likert') ? datasAlt : datas
        
    // generate random colors for background, hover, border
    const rgbcode=[], bgColor=[], hoverColor=[], borderColor=[], pointColor=[]
    const identity = []

    for (let k = 0; k < route.length; k++) {
        rgbcode[k] = randomColor();
        bgColor[k] = `rgba(${rgbcode[k]}, 0.3)`;
        hoverColor[k] = `rgba(${rgbcode[k]}, 0.5)`;
        borderColor[k] = `rgba(${rgbcode[k]}, 0.8)`;
        pointColor[k] = `rgba(${rgbcode[k]}, 1)`;

        let iden={
                backgroundColor: bgColor[k],
                borderColor: borderColor[k],
                pointBackgroundColor: borderColor[k],
                pointHoverBorderColor: hoverColor[k],
                pointBorderColor: pointColor[k],
                pointHoverBackgroundColor: borderColor[k],
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

                if (subinput == 'likert'){ 

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

    
    const useLabel = (subinput == 'likert') ? labelsAlt : labels

    const data = {
        title: input,
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