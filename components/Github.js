/*  ./components/Report.js     */
import Image from 'next/image'
import { AdjustmentsIcon, CloudIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline'

export const Github = () => {
  return (
 <>
 
    <div id="github" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">

            <section className="text-gray-700 body-font">
                <div className="container flex items-center px-5 py-24 mx-auto md:flex-row lg:px-20">
                    
                    <div className="md:p-8 mx-auto">
                        <div className="bg-white rounded-lg shadow-xl">
                            <div className="p-10 mx-auto md:p-16">
                                <div>
                                <img alt="" width="200" height="200" className="rounded-full w-48 border shadow-xl mx-auto" 
                                src="https://avatars.githubusercontent.com/u/2962503?v=4" />
                                </div>
                                <div className="mt-8 text-center">
                                    <h1 className="font-bold text-lg text-gray-700 mb-1">myphpmaster/sufian.cloud</h1>
                                    <p className="text-gray-600">Source code is publicly available at Github</p>
                                    <div className="pt-10">
                                        <a target="_blank" rel="noreferrer" href="https://github.com/myphpmaster/sufian.cloud" className="mt-6 bg-blue-900 hover:bg-blue-700 text-white rounded-full px-12 py-3 shadow-xl focus:outline-none">
                                            Get source code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>                
            </section>

        </div>
    </div>

</>
  );
};
