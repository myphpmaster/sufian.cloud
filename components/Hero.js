/*  ./components/Hero.js     */

import { Navbar } from '../components/NavbarLeft';

export const Hero = () => {
  return (
 <>
 
    <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">

                <Navbar />    

                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div className="sm:text-center lg:text-left px-4">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">IEQ Post Occupancy</span>
                            <span className="block text-indigo-600 xl:inline">Evaluation</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Internal environmental quality (IEQ) post occupancy evaluation (POE) can help stakeholders understand the current conditions of the building and their impact on occupant wellbeing and productivity. It can also provide pathways for building performance upgrades and resource allocation for administrations.
                        </p>

                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div className="inline-flex rounded-md shadow">
                                <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                Get started
                                </a>
                            </div>
                            <div className="ml-3 inline-flex rounded-md shadow">
                                <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                                Learn more
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
                
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="../indoor-ieq.jpg" alt="" />
            </div>
        </div>
    </div>

</>
  );
};
