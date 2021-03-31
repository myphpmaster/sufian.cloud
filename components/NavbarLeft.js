/*  ./components/NavbarLeft.js     */
import Link from 'next/link';
import { Transition } from '@headlessui/react'
import React, { useState } from "react";
const menus = [
       {
          "id":"home",
          "title":"Home",
          "url":"/"
       },
       {
          "id":"overview",
          "title":"Overview",
          "url":"/overview"
        },
       {
          "id":"data",
          "title":"Result",
          "url":"/data"
        },
        {
          "id":"report",
          "title":"Report",
          "url":"/report"
        },
        {
          "id":"code",
          "title":"Source Code",
          "url":"/code"
        },
        {
          "id":"slide",
          "title":"Slide",
          "url":"/slide"
        }
    ];
        

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleClick = () => {
        setIsOpen(!isOpen);
    };

  return (
    <>
        <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
        </svg>

        <div className="relative pt-6 px-8 lg:px-10 top-menu">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="#">
                        <span className="sr-only">Workflow</span>
                        <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                        <button onClick={handleClick} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>

                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
                
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">      

                { menus.map( menu => (
                    <Link key={menu.id} href={menu.url}>
                    <a id={menu.id} className="font-medium text-gray-500 hover:text-gray-900">
                        {menu.title}
                    </a>
                    </Link>
                ))}

                </div>
            </nav>
        </div>

        <Transition
                show={isOpen}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
            <div className={`${ isOpen ? '' : 'hidden' } absolute top-0 inset-x-0 p-2 origin-top-right md:hidden top-menu`}>
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-6 pt-4 flex items-center justify-between">
                        <div>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                        </div>
                        <div className="-mr-2">
                        <button onClick={handleClick} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close main menu</span>

                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    <div className="px-6 pt-2 pb-3 space-y-1">
                        
                    { menus.map( menu => (
                        <Link key={menu.id} href={menu.url}>
                        <a id={menu.id+'-mobile'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            {menu.title}
                        </a>
                        </Link>
                    ))}

                    </div>
                    <Link href='#'>
                        <a className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
                            Log in
                        </a>
                    </Link>
                </div>
            </div>
        </Transition>
    </>
  );
};
