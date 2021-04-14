/*  ./components/admin/chart/Building.js     */
import useSWR, { useSWRInfinite } from "swr";

export const Chart = () => {
    
    const fetcher = url => fetch(url).then(res => res.json());
    const { data: schem } = useSWR(() => '/api/label/?nocache=1', fetcher)
    const schems = schem ? [].concat(...schem) : [];

    const charts = []

    for (let i = 0; i < schems.length; i++) {
        
        if(schems[i].type == 'panel' && schems[i].key == 'thermal') {

            let obj = schems[i].components

                for (let j = 0; j < obj.length; j++) {

                    
                    if (validType(obj[j].type)) {
                        charts.push(obj[j])
                    }
                }
        }
    }

    console.log('charts =>' + JSON.stringify(charts))

    return (

    <section className="flex flex-wrap">

        {charts.map( (section, key) => (      
            
            renderCharts(section, key)

        ))}    

    </section>

    );
};

function validType(type){

    const types = [
        'number',
        'radio',
        'select',
        'survey',
    ]
    return types.includes(type) ? true : false
}

function renderCharts(data, id, single=false){

    var chartType = {
      "number": ["line", "bar", "horizontal"],
      "select": ["pie", "doughnut", "polar"],
      "radio": ["pie", "doughnut", "polar"],
      "survey": ["multibar", "multiline", "radar"]
    }

    const chartype = chartType[data.type]
    const random = Math.floor(Math.random() * data.type.length);
    const type = data.properties.hasOwnProperty('chart') ? data.properties.chart : chartype[random] 
    const slug = (data.type == 'survey') ? ( data.values.length > data.questions.length ?  '?type=likert' : '' ) : ''
    const clss = !single ? 'md:w-1/2' : ''
    const height = single ? '900px' : '500px'

    return (
        
        <div key={id} className={`${clss} w-full p-3`}>
                        
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600 text-center">{data.label}</h5>
                </div>
                <div className="p-5">
                    <div className="relative" style={{width: '100%', height: height}}>
                        <iframe className="absolute inset-0 w-full h-full" src={`/chart/${type}/${data.key}/${slug}`} frameBorder="0" />
                    </div>
                </div>
            </div>
            
        </div>

    )
}