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

        <div id="footer" className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <footer>
                    <div className="md:px-4 md:pt-10 md:pb-5">
                        <div className="flex flex-wrap md:max-w-screen-xl mx-auto">
                        <section
                            className="relative text-gray-700 font-light border-b px-4 pb-4 md:py-3 w-full md:border-none md:w-1/3"
                        >
                            <div className="md:hidden">
                            <button
                                onClick={handleClick}
                                className="uppercase text-xs font-bold tracking-wider text-indigo-800 focus:outline-none border-t border-white py-4 w-full text-left"
                                type="button"
                                name="a"
                            >
                                References: Journal
                            </button>
                            </div>
                            <Link href='/#'>    
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                References: Journal
                                </a>
                            </Link>
                            <article className={`${
                                active.a ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                <a target="_blank" href="https://www.ajol.info/index.php/actas/article/view/94083">
                                    Post-occupancy evaluation of office buildings in a Johannesburg country club estate.</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a target="_blank" href="https://www.mdpi.com/2075-5309/8/11/156">
                                    Post-Occupancy Evaluation and IEQ Measurements from 64 Office Buildings: Critical Factors and Thresholds for User Satisfaction on Thermal Quality.</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a target="_blank" href="https://umexpert.um.edu.my/public_view.php?type=publication&row=NDYwNzY%3D">Post-Occupancy Evaluation of Conventional-designed Building: The Effect of Occupants' Comfort on Productivity.</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a target="_blank" href="https://www.researchgate.net/publication/322243086_Investigating_the_Indoor_Environment_Quality_Parameters_and_Their_Relationship_with_Occupants'_Satisfaction_in_Office_Buildings_A_Review">
                                    Investigating the Indoor Environment Quality Parameters and Their Relationship with Occupants' Satisfaction</a>
                                </li>
                                <li className="my-3 tracking-wide">
                                <a target="_blank" href="http://spaj.ukm.my/jsb/index.php/jdb/article/view/101">
                                Post Occupancy Evaluation (POE) and Indoor Environmental Quality Assessment (IEQ): a Case Study of Universiti Teknologi PETRONAS New Academic Complex</a>
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
                                name="b"
                            >
                                References: Book
                            </button>
                            </div>
                            <Link href='/#'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                References: Book
                                </a>
                            </Link>
                            <article className={`${
                                active.b ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.intechopen.com/books/indoor-environmental-quality/introductory-chapter-indoor-environmental-quality">
                                    Introductory Chapter: Indoor Environmental Quality
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.taylorfrancis.com/books/mono/10.4324/9781315713519/post-occupancy-evaluation-routledge-revivals-wolfgang-preiser-edward-white-harvey-rabinowitz">
                                    Post-Occupancy Evaluation (Routledge Revivals)
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.architecture.com/-/media/GatherContent/Paywalled-resource-with-many-PDFs-VPC/Additional-Documents/Post-Occupancy-Evaluationanessentialtooltoimprovethebuiltenvironmentpdf.pdf">
                                    Post Occupancy Evaluation: an essential tool for the built environment
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.nap.edu/read/10288/chapter/3">
                                    Learning from Our Buildings: A State-of-the-Practice Summary of Post-Occupancy Evaluation
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://link.springer.com/chapter/10.1007/978-1-4899-3722-3_2">
                                    The Uses and Boundaries of Post-Occupancy Evaluation: an Overview
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.degruyter.com/document/doi/10.1515/9783110375411/html">
                                    Post-occupancy evaluation of library buildings
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.wiley.com/en-au/Enhancing+Building+Performance-p-9780470657591">
                                    Enhancing Building Performance
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.ashrae.org/File%20Library/Technical%20Resources/Bookstore/previews_2016212_pre.pdf">
                                    Residential Indoor Air Quality Guide
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.sitepoint.com/premium/books/build-a-blog-with-react-and-next-js/read/1">
                                    Build a Blog with React and Next.js
                                    </a>
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
                                name="c"
                            >
                                References: Github Codes
                            </button>
                            </div>
                            <Link href='/#'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                References: Github Codes
                                </a>
                            </Link>
                            <article className={`${
                                active.c ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://github.com/formio/formio">
                                        Form.io - A combined form and API platform for Serverless applications.
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://github.com/vercel/next.js">
                                        Next.js - The React Framework for Production.
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://github.com/YIZHUANG/react-multi-carousel">
                                        React multi carousel - Production-ready, lightweight fully customizable React carousel component that rocks supports multiple items and SSR(Server-side rendering).
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://github.com/hoangvvo/nextjs-mongodb-app">
                                        Next.js MongoDB - An Next.js and MongoDB web application, designed with simplicity for learning and real-world applicability in mind.
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://github.com/APItools/middleware">
                                        Middleware - APItools Middleware Repository.
                                    </a>
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
                                name="d"
                            >
                                Softwares
                            </button>
                            </div>
                            <Link href='/#'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Softwares
                                </a>
                            </Link>
                            <article className={`${
                                active.d ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://code.visualstudio.com/">
                                        Visual Studio Code
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.microsoft.com/en-us/microsoft-365/powerpoint">
                                    Microsoft PowerPoint
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://notepad-plus-plus.org/downloads/">
                                    Notepad++
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.putty.org/">
                                    PuTTY
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://desktop.github.com/">
                                    GitHub Desktop
                                    </a>
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
                                name="e"
                            >
                                Languages
                            </button>
                            </div>
                            <Link href='/#'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Languages
                                </a>
                            </Link>
                            <article className={`${
                                active.e ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.w3schools.com/html/html_intro.asp">
                                    Hyper Text Markup Language (HTML)
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.w3schools.com/css/css_intro.asp">
                                    Cascading Style Sheets (CSS)
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.w3schools.com/js/js_intro.asp">
                                    JavaScript
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://sass-lang.com/">
                                    Syntactically Awesome Style Sheets (SASS)
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.ssh.com/ssh/command/">
                                        SSH Command
                                    </a>
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
                                name="f"
                            >
                                Frameworks
                            </button>
                            </div>
                            <Link href='/slide'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Frameworks
                                </a>
                            </Link>
                            <article className={`${
                                active.f ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://www.w3schools.com/bootstrap4/default.asp">
                                    Bootstrap 4
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://nodejs.org/en/">
                                    Node.js®
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://nextjs.org/">
                                    Next.js
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://reactjs.org/">
                                    React
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://tailwindcss.com/">
                                    Tailwind CSS
                                    </a>
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
                                name="g"
                            >
                                Microsoft Azure 
                            </button>
                            </div>
                            <Link href='https://azure.microsoft.com/'>   
                                <a className="uppercase text-xs font-bold tracking-wider text-indigo-800 hidden md:block">
                                Microsoft Azure
                                </a>
                            </Link>
                            <article className={`${
                                active.g ? '' : 'h-0'
                                }  md:h-auto -mt-4 md:mt-0 overflow-hidden`}>
                            <ul className="my-5 text-sm tracking-wide">
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://azure.microsoft.com/en-us/services/cosmos-db/">
                                    Azure Cosmos DB
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://azure.microsoft.com/en-us/services/virtual-machines/">
                                    Virtual Machines
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://azure.microsoft.com/en-us/services/api-management/">
                                    API Management
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://azure.microsoft.com/en-us/services/machine-learning/">
                                    Azure Machine Learning
                                    </a>
                                </li>
                                <li className="my-3 tracking-wide">
                                    <a target="_blank" href="https://azure.microsoft.com/en-us/services/app-service/">
                                    App Service
                                    </a>
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
                            <p className="leading-8 tracking-wide">
                                <a href="/#">
                                   Privacy Policy
                                </a>
                            </p>
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
