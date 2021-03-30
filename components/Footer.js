/*  ./components/Footer.js     */
import Link from 'next/link';
import { useState } from 'react';

export const Footer = () => {

    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };
    
  return (
    <>

        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <footer className="mt-6">
                    <p className="pb-10 text-center md:px-4">
                        This application was developed in conjuction with 
                        <span className="text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                            <a href="https://discover-ai-with-microsoft.agorize.com/en/challenges/msazurevirtualhack-2021/pages/timeline-and-guidelines?lang=en">
                            Microsoft Azure Virtual Hackathon 2021</a>
                        </span>
                        Provide innovative solutions in advanced data analytics and AI for a number of booming industries!
                    </p>
                    <div className="border-t md:px-4 md:pt-10 md:pb-5">
                        <div className="flex flex-wrap md:max-w-screen-xl mx-auto">
                        <section
                            className="relative text-gray-700 font-light border-b px-4 pb-4 md:py-3 w-full md:border-none md:w-1/3"
                        >
                            <div className="md:hidden">
                            <button
                                onClick={handleClick}
                                className="uppercase text-xs font-bold tracking-wider text-indigo-800 focus:outline-none border-t border-white py-4 w-full text-left"
                                type="button"
                            >
                                References: Journal
                            </button>
                            </div>
                            <Link href='#'>    
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                References: Journal
                                </a>
                            </Link>
                            <article className={`${
                                active ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                <a href="https://www.ajol.info/index.php/actas/article/view/94083">
                                    Post-occupancy evaluation of office buildings in a Johannesburg country club estate.</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="https://www.mdpi.com/2075-5309/8/11/156">
                                    Post-Occupancy Evaluation and IEQ Measurements from 64 Office Buildings: Critical Factors and Thresholds for User Satisfaction on Thermal Quality.</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="https://umexpert.um.edu.my/public_view.php?type=publication&row=NDYwNzY%3D">Post-Occupancy Evaluation of Conventional-designed Building: The Effect of Occupants' Comfort on Productivity.</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="https://www.researchgate.net/publication/322243086_Investigating_the_Indoor_Environment_Quality_Parameters_and_Their_Relationship_with_Occupants'_Satisfaction_in_Office_Buildings_A_Review">
                                    Investigating the Indoor Environment Quality Parameters and Their Relationship with Occupants' Satisfaction</a>
                                </li>
                            </ul>
                            </article>
                        </section>
                        <section
                            className="relative text-gray-700 font-light border-b px-4 pb-4 md:py-3 w-full md:border-none md:w-1/3"
                        >
                            <div className="md:hidden">
                            <button
                                onClick={handleClick}
                                className="uppercase text-xs font-bold tracking-wider text-indigo-800 focus:outline-none border-t border-white py-4 w-full text-left"
                                type="button"
                            >
                                Ut porta
                            </button>
                            </div>
                            <Link href='/slide'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Ut porta
                                </a>
                            </Link>
                            <article className={`${
                                active ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                <a href="#">Pellentesque rhoncus</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Aenean</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Curabitur bibendum</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Phasellus non mi</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Duis accumsa</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Curabitur nec enim</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Fusce ut augue</a>
                                </li>
                            </ul>
                            </article>
                        </section>
                        <section
                            className="relative text-gray-700 font-light border-b px-4 pb-4 md:py-3 w-full md:border-none md:w-1/3"
                        >
                            <div className="md:hidden">
                            <button
                                onClick={handleClick}
                                className="uppercase text-xs font-bold tracking-wider text-indigo-800 focus:outline-none border-t border-white py-4 w-full text-left"
                                type="button"
                            >
                                Aenean gravida orci in sem varius
                            </button>
                            </div>
                            <Link href='/slide'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Aenean gravida orci in sem varius
                                </a>
                            </Link>
                            <article className={`${
                                active ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                <a href="#">Cras id ipsum</a>
                                </li>
                            </ul>
                            </article>
                        </section>
                        <section
                            className="relative text-gray-700 font-light border-b px-4 pb-4 md:py-3 w-full md:border-none md:w-1/4"
                        >
                            <div className="md:hidden">
                            <button
                                onClick={handleClick}
                                className="uppercase text-xs font-bold tracking-wider text-indigo-800 focus:outline-none border-t border-white py-4 w-full text-left"
                                type="button"
                            >
                                Donec a lorem
                            </button>
                            </div>
                            <Link href='/slide'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Donec a lorem
                                </a>
                            </Link>
                            <article className={`${
                                active ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                <a href="#">Sed a diam</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Nullam luctus felis</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Sed euismod</a>
                                </li>
                            </ul>
                            </article>
                        </section>
                        <section
                            className="relative text-gray-700 font-light border-b px-4 pb-4 md:py-3 w-full md:border-none md:w-1/4"
                        >
                            <div className="md:hidden">
                            <button
                                onClick={handleClick}
                                className="uppercase text-xs font-bold tracking-wider text-indigo-800 focus:outline-none border-t border-white py-4 w-full text-left"
                                type="button"
                            >
                                Integer interdum
                            </button>
                            </div>
                            <Link href='/slide'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Integer interdum
                                </a>
                            </Link>
                            <article className={`${
                                active ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                <a href="#">Dignissim gravida</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Eu mollis elit</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Hendrerit purus id</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Ut luctus dui tincidunt</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Pellentesque at ligula</a>
                                </li>
                            </ul>
                            </article>
                        </section>
                        <section
                            className="relative text-gray-700 font-light border-b px-4 pb-4 md:py-3 w-full md:border-none md:w-1/4"
                        >
                            <div className="md:hidden">
                            <button
                                onClick={handleClick}
                                className="uppercase text-xs font-bold tracking-wider text-indigo-800 focus:outline-none border-t border-white py-4 w-full text-left"
                                type="button"
                            >
                                Quisque
                            </button>
                            </div>
                            <Link href='/slide'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Quisque
                                </a>
                            </Link>
                            <article className={`${
                                active ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                <a href="#">Finibus nulla eget</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Pellentesque</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Duis efficitur</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Cras at lacus</a>
                                </li>
                            </ul>
                            </article>
                        </section>
                        <section
                            className="relative text-gray-700 font-light border-b px-4 pb-4 md:py-3 w-full md:border-none md:w-1/4"
                        >
                            <div className="md:hidden">
                            <button
                                onClick={handleClick}
                                className="uppercase text-xs font-bold tracking-wider text-indigo-800 focus:outline-none border-t border-white py-4 w-full text-left"
                                type="button"
                            >
                                Quisque
                            </button>
                            </div>
                            <Link href='/slide'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Quisque
                                </a>
                            </Link>
                            <article className={`${
                                active ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                <a href="#">Finibus nulla eget</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Pellentesque</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Duis efficitur</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a href="#">Cras at lacus</a>
                                </li>
                            </ul>
                            </article>
                        </section>
                        </div>
                    </div>
                    <div className="max-w-screen-xl mx-auto border-none px-4">
                        <section
                        className="flex flex-col md:flex-row md:justify-between md:border-solid md:border-t text-gray-700 font-light text-sm pt-4 pb-6 md:pt-5 md:pb-6 w-full"
                        >
                        <div>
                            <p className="leading-8 tracking-wide">
                            &copy; 2021 sufian.cloud. All right reserved.
                            </p>
                        </div>
                        <div>
                            <p className="leading-8 tracking-wide">Privacy Policy</p>
                        </div>
                        </section>
                    </div>
                </footer>
            </div>
        </div>
    
        <script
        dangerouslySetInnerHTML={
            {
            __html: `
            jQuery( document ).ready(function($) {

            });
            `
        }}
      />
    </>
  );
};
