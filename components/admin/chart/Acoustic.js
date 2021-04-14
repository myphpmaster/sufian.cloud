/*  ./components/admin/chart/Acoustic.js     */
import useSWR, { useSWRInfinite } from "swr";

export const Chart = () => {
    
    const fetcher = url => fetch(url).then(res => res.json());
    const { data: schem } = useSWR(() => '/api/label', fetcher)
    const schems = schem ? [].concat(...schem) : [];

    const charts = []

    for (let i = 0; i < schems.length; i++) {
        
        if(schems[i].type == 'panel') {

            let obj = schems[i].components

                for (let j = 0; j < obj.length; j++) {

                    // console.log('obj[j] =>' + JSON.stringify(obj[j]))

                    if (validType(obj[j].key)) {
                        charts.push(obj[j])
                    }
                }
        }
    }

    return (

    <section className="container flex">

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
        'text',
        'select',
        'survey',
    ]
    return types.includes(type) ? true : false
}

function renderCharts(data, id){

    var chartType = type; 

    return (
        
        <div key={id} className="w-full md:w-1/2 p-3">
                        
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600 text-center">{data.label}</h5>
                </div>
                <div className="p-5">
                    <div className="relative" style={{width: '100%', height: '500px'}}>
                        <iframe className="absolute inset-0 w-full h-full" src={`/chart/horizontal/${data.key}/`} frameBorder="0" />
                    </div>
                </div>
            </div>
            
        </div>

    )
}