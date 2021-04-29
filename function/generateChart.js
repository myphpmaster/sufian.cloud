/* ./function/generateChart.js */
import { Line, Bar, Radar, Doughnut, Pie, Polar, HorizontalBar } from 'react-chartjs-2';

export const generateChart = (chart, data, options, width=640, height=480) => {
    // Line, Bar, Random, Radar
    switch (chart) {
        default:
        case 'multiline':
        case 'line':
            for(let j=0; j<data.datasets.length; j++){
                data.datasets[j].type = chart
                data.datasets[j].fill = false
            }

            return (
                <div className="chartjs" width={width} height={height}>
                    <Line
                        data={data}
                        width={width}
                        height={height}
                        options={options}
                    />          
                </div>
            );

        case 'random':
        case 'mix':

            const types = ["bar", "line"];
            for(let j=0; j<data.datasets.length; j++){
                let random = Math.floor(Math.random() * types.length);
                data.datasets[j].type = types[random]
                if(data.datasets[j].type=="line"){
                    data.datasets[j].fill = false
                }
            }

            return (
                <div className="chartjs" width={width} height={height}>
                    <Bar
                        data={data}
                        width={width}
                        height={height}
                        options={options}
                    />          
                </div>
            );

        case 'multibar':
        case 'bar':
            return (
                <div className="chartjs" width={width} height={height}>
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
                <div className="chartjs" width={width} height={height}>
                    <Radar
                        data={data}
                        width={width}
                        height={height}
                        options={options}
                    />          
                </div>
            );
            
        case 'horizontal':
            
            // remove x axes line 
            options.scales.xAxes =  [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }]

            return (
                <div className="chartjs" width={width} height={height}>
                    <HorizontalBar
                        data={data}
                        width={width}
                        height={height}
                        options={options}
                    />          
                </div>
            );
            
        case 'pie':
            
            options = removeYaxes(options)
            options = convertValueToPercentage(options)
            
            return (
                <div className="chartjs" width={width} height={height}>
                    <Pie
                        data={data}
                        width={width}
                        height={height}
                        options={options}
                    />          
                </div>
            );
       
        case 'doughnut':

            options = removeYaxes(options)
            options = convertValueToPercentage(options)

            return (
                <div className="chartjs" width={width} height={height}>
                    <Doughnut
                        data={data}
                        width={width}
                        height={height}
                        options={options}
                    />          
                </div>
            );
       
        case 'polar':

            options = removeYaxes(options)
            options = convertValueToPercentage(options)

            return (
                <div className="chartjs" width={width} height={height}>
                    <Polar
                        data={data}
                        width={width}
                        height={height}
                        options={options}
                    />          
                </div>
            );
       
        case 'radar':

            options = removeYaxes(options)

            return (
                <div className="chartjs" width={width} height={height}>
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

// Function to remove y axes
const removeYaxes = (options) => {

    options.scales.yAxes = [{
        display: false
    }]
            
    return options
}

// Function to convert value to percentage
const convertValueToPercentage = (options) => {

    options.tooltips = {
        enabled: true,
        callbacks: {
            label: function (tooltipItem, data) {
                
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                return percentage + "%";
            },                    
            title: function (tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
            },  
        },
    };    
            
    return options
}