/*  ./components/Footer.js     */
import Link from 'next/link';
import { useState } from 'react';

export const Footer = () => {

    const [active, setActive] = useState({
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false
    });

    const handleClick = (e) => {
        setActive(active =>  ({ 
            ...active, 
            [e.target.name]: !active[e.target.name] 
        }) );
    };
    
  return (
    <>

<footer className="bg-white border-t border-gray-400 shadow">
        <div className="container max-w-md mx-auto flex py-8">

            <div className="w-full mx-auto flex flex-wrap">
                <div className="flex w-full md:w-1/2 ">
                    <div className="px-8">
                        <h3 className="font-bold font-bold text-gray-900">About</h3>
                        <p className="py-4 text-gray-600 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
                        </p>
                    </div>
                </div>

                <div className="flex w-full md:w-1/2">
                    <div className="px-8">
                        <h3 className="font-bold font-bold text-gray-900">Social</h3>
                        <ul className="list-reset items-center text-sm pt-3">
                            <li>
                                <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="#">Add social link</a>
                            </li>
                            <li>
                                <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="#">Add social link</a>
                            </li>
                            <li>
                                <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="#">Add social link</a>
                            </li>
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
