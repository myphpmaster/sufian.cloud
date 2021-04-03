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
                            <li className="inline-block pr-5">
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
    <script
        dangerouslySetInnerHTML={
            {
            __html: `
            jQuery( document ).ready(function($) {

            });

            /*Toggle dropdown list*/
            /*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/
        
            var userMenuDiv = document.getElementById("userMenu");
            var userMenu = document.getElementById("userButton");
        
            var navMenuDiv = document.getElementById("nav-content");
            var navMenu = document.getElementById("nav-toggle");
        
            document.onclick = check;
        
            function check(e) {
                var target = (e && e.target) || (event && event.srcElement);
        
                //User Menu
                if (!checkParent(target, userMenuDiv)) {
                    // click NOT on the menu
                    if (checkParent(target, userMenu)) {
                        // click on the link
                        if (userMenuDiv.classList.contains("invisible")) {
                            userMenuDiv.classList.remove("invisible");
                        } else { userMenuDiv.classList.add("invisible"); }
                    } else {
                        // click both outside link and outside menu, hide menu
                        userMenuDiv.classList.add("invisible");
                    }
                }
        
                //Nav Menu
                if (!checkParent(target, navMenuDiv)) {
                    // click NOT on the menu
                    if (checkParent(target, navMenu)) {
                        // click on the link
                        if (navMenuDiv.classList.contains("hidden")) {
                            navMenuDiv.classList.remove("hidden");
                        } else { navMenuDiv.classList.add("hidden"); }
                    } else {
                        // click both outside link and outside menu, hide menu
                        navMenuDiv.classList.add("hidden");
                    }
                }
        
            }
        
            function checkParent(t, elm) {
                while (t.parentNode) {
                    if (t == elm) { return true; }
                    t = t.parentNode;
                }
                return false;
            }
            `
        }}
      />
    </>
  );
};
