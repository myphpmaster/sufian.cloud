/*  ./pages/form.js     */
import Head from 'next/head'
import { Navbar } from '../components/NavbarForm';
const { FORMIO_URL } = process.env

export default function Form() {
    let formio = FORMIO_URL

    return (
    <>
		<Head>
			<title>IEQ POE Online System - Questionnaire Form</title>	
			<meta name="description"  content="Online application for post occupancy evaluation survey form using Next.js and Form.io" />
			<link rel="icon" href="/favicon.ico" />		       
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
            <link rel="stylesheet" type="text/css" href="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.css" />
            <script src="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.js" />
		</Head>
		<Navbar />         
        <div id="form" className="py-5 md:bg-gradient-to-r md:from-indigo-700 md:to-pink-500 md:bg-opacity-50 bg-gray-100 min-h-screen justify-center content-center">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">     
                <div className="py-5 md:py-10 text-center bg-gray-100">
                    <div id="myform" className="sm:px-2 md:px-16"></div>                    
                    <style global jsx>{`
                        #myform .wizard-page {
                            text-align: left;
                        }
                        .formio-component {
                            margin: 20px 0;
                        }
                        .formio-component h3 {
                            font-size: 25px;
                            font-weight: bold;
                            margin-top: 15px;
                        }
                        [ref="wrapper"] {
                            padding-top: 10px;
                        }                       
                        .table,                       
                        .table  thead,                       
                        .table  thead th,
                            .table  thead th td {
                                vertical-align: middle;
                                
                            }                        
                            @media screen and (max-width: 500px) {
                                .table  thead th {
                                vertical-align: bottom;
                                max-width: 15px;
                                transform: translate(-50px, 50px) rotate(-90deg);
                                white-space: nowrap;
                                height: 150px;
                                }
                            }
                    `}</style>
                </div>
            </div>
        </div>
            <script
                dangerouslySetInnerHTML={
                    {
                    __html: `
                window.onload = function() {
                    
                    Formio.createForm(document.getElementById('myform'), "${formio}", {
                        readOnly: false
                        }).then(function(form) {
                
                        // Set Example Submission Object
                        form.submission = { data: { 
                            defaultPopulate: 'Populating...' 
                        } };
                        
                        // Submit the form
                        form.on('submit', function(submission) {
                            console.log(submission);
                            setTimeout(function(){ 
                                document.location.href="/result";
                            }, 1000);
                        });        
                    });        

                };
                `
                }}
            />	
    </>
  )
}
