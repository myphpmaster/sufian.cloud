/*  ./components/admin/chart/Acoustic.js     */
import useSWR, { useSWRInfinite } from "swr";

export const Chart = () => {
    
    const fetcher = url => fetch(url).then(res => res.json());
    const { data: schem } = useSWR(() => '/api/label', fetcher)
    const schems = schem ? [].concat(...schem) : [];

    for (let i = 0; i < schems.length; i++) {
        
        if(validType(schems[i].type)) {

            let obj = schems[i].components
            console.log(JSON.stringify(obj))

                for (let j = 0; j < obj.length; j++) {

                    // console.log('obj[j].key =>' + obj[j].key)

                    if (obj[j].key) {

                    }
                }

        }
    }

    return (

    <section>

                    <div className="w-full md:w-1/2 p-3">
                        
                        <div className="bg-white border rounded shadow">
                            <div className="border-b p-3">
                                <h5 className="font-bold uppercase text-gray-600 text-center">Background noise in your work area</h5>
                            </div>
                            <div className="p-5">
                                <div className="relative" style={{width: '100%', height: '500px'}}>
                                    <iframe className="absolute inset-0 w-full h-full" src="/chart/horizontal/backgroundNoise/" frameBorder="0" />
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="w-full md:w-1/2 p-3">
                        
                        <div className="bg-white border rounded shadow">
                            <div className="border-b p-3">
                                <h5 className="font-bold uppercase text-gray-600 text-center">Any noise from mechanical or electrical equipment?</h5>
                            </div>
                            <div className="p-5">
                                <div className="relative" style={{width: '100%', height: '500px'}}>
                                    <iframe className="absolute inset-0 w-full h-full" src="/chart/pie/MEnoise" frameBorder="0" />
                                </div>
                            </div>
                        </div>
                        
                    </div>

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