/* ./function/googleChart.js */
import Chart from "react-google-charts";

export const googleChart = (chart, data, options, width='100%', height='100%') => {
    var type = chart.charAt(0).toUpperCase() + chart.slice(1)
    var goption = {}
    // goption['title'] = ucFirst(data.title)
    goption.legend = { position: 'none' }
    const gdata = []
    const labels = data.labels
    const dataset = data.datasets[0]
    gdata.push([ucFirst(data.title),dataset.label])
    
    for (let i = 0; i <labels.length; i++) {
        gdata.push([labels[i],dataset.data[i]])
    }

    //console.log(JSON.stringify(goption))
    //console.log(JSON.stringify(gdata))
    //console.log(type)

    switch(type){
        default:
        case 'Radar':
        case 'Pie':
            goption['is3D'] = true
            goption.legend = { position: 'bottom' }
            
            return (
                <Chart
                    width={width}
                    height={height}
                    chartType='PieChart'
                    loader={<div>Loading Chart</div>}
                    data={gdata}
                    options={goption}
                />
            )
            
        case 'Doughnut':
            goption['pieHole'] = 0.4
            goption.legend = { position: 'bottom' }
            
            return (
                <Chart
                    width={width}
                    height={height}
                    chartType='PieChart'
                    loader={<div>Loading Chart</div>}
                    data={gdata}
                    options={goption}
                />
            )
            
        case 'Line':
            goption['vAxis'] = { title: ucFirst(dataset.label) }
            goption['hAxis'] = { title: ucFirst(data.title) }
            return (
                <Chart
                    width={width}
                    height={height}
                    chartType='LineChart'
                    loader={<div>Loading Chart</div>}
                    data={gdata}
                    options={goption}
                />
            )

        case 'Horizontal':
            
            return (
                <Chart
                    width={width}
                    height={height}
                    chartType='BarChart'
                    loader={<div>Loading Chart</div>}
                    data={gdata}
                    options={goption}
                />
            )
            
        case 'Bar':
            
            return (
                <Chart
                    width={width}
                    height={height}
                    chartType='Bar'
                    loader={<div>Loading Chart</div>}
                    data={gdata}
                    options={goption}
                />
            )

        case 'Geo':
            
            return (
                <Chart
                    width={width}
                    height={height}
                    chartType='GeoChart'
                    loader={<div>Loading Chart</div>}
                    data={gdata}
                    options={goption}
                    mapsApiKey="AIzaSyBg06ARybYZjHgJFSWO0Afr41-mXWoI6zg"
                />
            )
    }
    
}

const ucFirst = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }