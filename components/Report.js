/*  ./components/Report.js     */
import Image from 'next/image'
import { AdjustmentsIcon, CloudIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline'

export const Report = () => {
  return (
 <>
 
    <div id="report" className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">

            <section className="text-gray-700 body-font">
                <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row lg:px-20">
                    <div
                        className="flex flex-col w-full pt-0 mb-16 text-left lg:flex-grow md:w-1/2 xl:mr-10 md:pr-12 md:items-start md:mb-0 text-center">
                        <h2 className="mb-1 text-s font-medium tracking-widest text-blue-500black title-font md:text-left">Latest cloud technology, completed in a minute.</h2>
                        <h1 className="mb-8 text-2xl font-bold tracking-tighter text-left text-black lg:text-5xl title-font text-center md:text-left">
                            Fast deployment on any serverless platform
                        </h1>
                        <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 sm:-m-4 ">
                            <div className="flex flex-col items-start p-4 mb-6 text-left md:w-1/2 md:mb-0 text-center md:text-left">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 text-white bg-indigo-500 rounded-full md:mx-0 mx-auto">                                    
                                    <AdjustmentsIcon className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-gray-700 title-font">
                                        Deployment Builds
                                    </h2>
                                    <p className="text-base leading-relaxed">
                                        Build logs helps in easily identify the cause of any failed Builds and areas to investigate further.
                                    </p>
                                    <a target="_blank" rel="noreferrer" href="https://vercel.com/myphpmaster/nextjs/3xF7Gnxx1jVKzu26ZrvEpGziirFx"
                                        className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 ">
                                        View Build Logs
                                        <ChevronDoubleRightIcon className="mt-1 h-4 w-4 ml-1" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col items-start p-4 mb-6 text-left md:w-1/2 md:mb-0 text-center md:text-left">
                                <div
                                    className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 text-white bg-indigo-500 rounded-full md:mx-0 mx-auto">
                                    <CloudIcon className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="mb-3 text-lg font-medium tracking-tighter text-gray-700 title-font">
                                        Serverless Function</h2>
                                    <p className="text-base leading-relaxed">
                                        Review the realtime logs of the Serverless Functions including user logging such as console.log, 
                                    </p>
                                    <a target="_blank" rel="noreferrer" href="https://vercel.com/myphpmaster/nextjs/3xF7Gnxx1jVKzu26ZrvEpGziirFx/functions?name=mUazIkmZQIfY3ZqOE4YX9zg7-39cbf370ffa90986d47577aa449e03ab40e3c15"
                                        className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 ">
                                        View Function Logs
                                        <ChevronDoubleRightIcon className="mt-1 h-4 w-4 ml-1" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-5/6 lg:max-w-lg md:w-1/2">                                      
                        <Image
                            src="/generated-page-report.jpg"
                            className="object-cover object-center rounded-lg"
                            alt="Static page built"
                            layout="responsive"
                            width={640}
                            height={488}
                        />
                    </div>
                </div>
            </section>

        </div>
    </div>

</>
  );
};
