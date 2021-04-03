/*  ./pages/result.js     */
import Head from 'next/head'
import React, {useEffect} from 'react';
import { Navbar } from '../components/Navbar';

export default function Home() {

  return (
    <>
		<Head>
			<title>IEQ POE Online System - Home</title>
			<link rel="icon" href="/favicon.ico" />		       
            <link rel="stylesheet" type="text/css" href="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.css" />
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
            <script src="https://code.jquery.com/jquery-3.6.0.slim.min.js" integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI=" crossorigin="anonymous" />
            <script src="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.js" />	
		</Head>
		<Navbar />         
        <div id="form" className="py-5 bg-gradient-to-r from-indigo-700 to-pink-500 bg-opacity-50 min-h-screen justify-center content-center">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">        
                <div className="px-2 py-5 md:py-10 text-center bg-gray-100">
                    <div id="myform" className="px-2 md:px-10"></div>
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
                jQuery( document ).ready(function($) {
                    
                    Formio.createForm(document.getElementById('myform'), "https://survey.app.sufian.cloud/ieq-poe", {
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
                            }, 500);
                        });                    
                    });    
                    setTimeout(function () {
                        $('.pagination .page-item').addClass('lg:w-1/6 w-1/3')
                     }, 2000);
                });
                jQuery( '.page-link' ).click(function() {
                    setTimeout(function () {
                        $('.pagination .page-item').addClass('lg:w-1/6 w-1/3')
                     }, 500);
                    });
                
			`
			}}
          />		
    </>
  )
}
  