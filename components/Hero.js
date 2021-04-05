/*  ./components/Hero.js     */
import { Navbar } from '../components/NavbarLeft';

export const Hero = () => {
  return (
 <>
 
    <div id="hero" className="relative bg-white overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto">
            <div className="relative z-10 bg-white lg:max-w-3xl lg:w-full">

                <Navbar />    

                <main className="py-10 min-h-screen items-center flex mx-auto max-w-7xl px-4 mt-0 sm:px-6 lg:px-8 justify-center" style={{ 'minHeight':'calc(100vh - 64px)'}}>
                    <div className="sm:text-center lg:text-left px-4">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">IEQ Post Occupancy </span>
                            <span className="block text-indigo-600 xl:inline">Evaluation</span>
                        </h1>
                        
                        <div className="flex my-10">
 
                            <blockquote className="md:text-2xl text-xl flex flex-wrap flex-col bg-white text-indigo-700 border-l-8 italic border-gray-400 px-4 py-3">
                            “People spend 80-90 per cent of their lives in buildings; living, studying, working, entertaining themselves, consuming and even exercising, which means that the indoor conditions can have a strong imprint on wellbeing, health and productivity.”

                                <span className="flex justify-end text-sm text-indigo-400 font-semibold pt-2 underline ">Wargocki et al (1999)</span>

                                <div className="flex justify-end mt-2">
                                    <svg className="mr-2 cursor-pointer" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg className="mr-2 cursor-pointer" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                    <svg className="cursor-pointer" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                </div>
                            </blockquote>
                        
                        </div>

                        <p className="mt-3 text-base text-gray-500 sm:mt-10 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Internal environmental quality (IEQ) post occupancy evaluation (POE) can help stakeholders understand the current conditions of the building 
                        and their impact on occupant wellbeing and productivity. 
                        </p>
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div className="inline-flex rounded-md shadow sm:w-auto w-full text-center">
                                <a href="/form" target="_blank" className=" sm:w-auto w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                Form
                                </a>
                            </div>
                            <div className="sm:ml-3 sm:mt-0 mt-5 inline-flex rounded-md shadow sm:w-auto w-full text-center">
                                <a href="/admin" className=" sm:w-auto w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                                Dashboard
                                </a>
                            </div>
                        </div>
                        
                    </div>
                </main>
                
            </div>              
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <video className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full hidden lg:block" width="1920" height="1083" poster="/poster-home.jpg" autoPlay loop>
                    <source src="/home.mp4" type="video/mp4" /> 
                    <source src="/home.ogg" type="video/ogg" /> 
                    <source src="/home.webm" type="video/webm" />
                </video>
                <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="/indoor-ieq.jpg" alt="" />
            </div>
        </div>
    </div>

</>
  );
};
