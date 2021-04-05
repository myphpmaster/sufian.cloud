/*  ./components/Footer.js     */
import Link from 'next/link';
import { useState } from 'react';

export const Footer = () => {

    const menus = [
        {
           "id":"menu-home",
           "title":"Home",
           "url":"/"
        },
        {
           "id":"menu-caprover",
           "title":"Caprover",
           "target": "_blank",
           "url":"https://captain.app.sufian.cloud/"
         },
        {
           "id":"menu-form",
           "title":"Form Dashboard",
           "url":"https://survey.app.sufian.cloud/#/",
           "target": "_blank"
         },
         {
           "id":"menu-code",
           "title":"Source Code",
           "url":"https://github.com/myphpmaster/sufian.cloud",
           "target": "_blank"
         },
         {
           "id":"menu-azure",
           "title":"Azure Portal",
           "url":"https://portal.azure.com/",
           "target": "_blank"
         }
     ];
         
  return (
    <>

<footer className="bg-white border-t border-gray-400 shadow">
        <div className="container max-w-12xl mx-auto flex py-8">

            <div className="w-full mx-auto flex flex-wrap">
                <div className="flex w-full md:w-1/2 ">
                    <div className="px-8">
                        <h3 className="font-bold font-bold text-gray-900">About</h3>
                        <p className="py-4 text-gray-600 text-sm">
                            Microsoft Azure Hackathon Project.
                        </p>
                    </div>
                </div>

                <div className="flex w-full md:w-1/2">
                    <div className="px-8">
                        <h3 className="font-bold font-bold text-gray-900">Links</h3>
                        <ul className="list-reset items-center text-sm pt-3">
                            
                        { menus.map( (menu, index) => ( 
                            <li key={index} className="inline-block pr-5">
                                <Link key={index} href={menu.url}>
                                    <a id={menu.id}  target={menu.target ? menu.target : `_self`}
                                            className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1">
                                        {menu.title}
                                    </a>
                                </Link>
                            </li>
                        ))}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>
  );
};
