/*  ./components/admin/buildingPage.js     */
import { RespondData } from './respondData';
import { Chart } from './chart/Building';
import { Table } from './latestSubmission';

export const Contain = () => {
    
  return (

<>

    <div className="container w-full mx-auto pt-20">
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">

            <RespondData />

            <hr className="border-b-2 border-gray-400 my-8 mx-4" />

            <div className="pb-5 text-2xl font-bold text-center text-black">                
                <a href="/admin/">General</a> | <a href="/admin/building" class="text-blue">Building</a>            
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