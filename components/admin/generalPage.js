/*  ./components/admin/buildingPage.js     */
import { RespondData } from './respondData';
import { Chart } from './chart/General';
import { Table } from './latestSubmission';

export const Contain = () => {
    
    const fetcher = url => fetch(url).then(res => res.json());

/*
    const PAGE_SIZE = 3;
    
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        index =>
          `/api/submissions?limit=${PAGE_SIZE}&page=${index + 1}`,
        fetcher
      );

    if (error) return (
        <div className="py-24 bg-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-8 sm:px-6 text-center text-3xl tracking-tight font-extrabold text-black">
                    Data not found!
                </div>
            </div>
        </div>
        )
    if (!data) return (
        <div className="py-24 bg-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-8 sm:px-6 text-center text-3xl tracking-tight font-extrabold text-black">
                    Loading...
                </div>
            </div>
        </div>
        )    

        const datas = data ? [].concat(...data) : [];

        const results = [];
        datas.forEach(function(value, index, array) {
            // The callback is executed for each element in the array.
            // `value` is the element itself (equivalent to `array[index]`)
            // `index` will be the index of the element in the array
            // `array` is a reference to the array itself (i.e. `datas` in this case)
            results.push(value.data);
        }); 
        
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
    const isRefreshing = isValidating && data && data.length === size;


    const { data: survey } = useSWR(() => '/api/charts/', fetcher)
    const arr = survey ? [].concat(...survey) : [];

    const { data: label } = useSWR(() => '/api/label/', fetcher)
    const objLabel = Object.assign({},label)
    
    // Retrieve Label from form schema
    function getLabel (obj={}) {
        for (let k in obj){

        }
    }

    // function to group all data counts
    function groupArray (arr = []) {

        let map = new Map();

        for (let i = 0; i < arr.length; i++) {

            let obj = arr[i].data

                if( obj instanceof Object ){    
                                        
                    for (let k in obj){
                        if ( typeof obj === 'object' && objectSize(obj[k]) > 0 ){
                            //recursive call to scan property
                            let recur = obj[k]

                            for (let j in recur){
                                
                                const w = JSON.stringify(k+'#'+j+'~'+recur[j]);
                                if(!map.has(w)){

                                    map.set(w, {
                                        identity: k+'#'+j+'~'+recur[j],
                                        count: 1,
                                    });

                                }else{
                                    map.get(w).count++;
                                }

                            }

                        }else if ( typeof obj === 'string' ) {
 
                            const s = JSON.stringify(k+'#'+obj[k]);
                            if(!map.has(s)){

                                map.set(s, {
                                    identity: k+'#'+obj[k],
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

    const resultx = groupArray(arr);
//    console.log('Results => ' + JSON.stringify(results));

    let counts = [];

    for (let i = 0; i < resultx.length; i++) {
        let identity = resultx[i]['identity'];
    }

 */

  return (

<>

    <div className="container w-full mx-auto pt-20">
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">

            <RespondData />

            <hr className="border-b-2 border-gray-400 my-8 mx-4" />

            <div className="pb-5 text-2xl font-bold text-center text-black">
                <a href="/admin/" class="text-blue-500">General</a> | <a href="/admin/building">Building</a> | <a href="/admin/thermal">Thermal</a> 
            </div>            
            
            <div className="flex flex-row flex-wrap flex-grow mt-2">
                <Chart />
                <Table />
            </div>

        </div>
    </div>

</>

  );
};