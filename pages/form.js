/*  ./pages/result.js     */
import Head from 'next/head'
import { Navbar } from '../components/Navbar';

export default function Home() {

  return (
    <>
		<Head>
			<title>IEQ POE Online System - Home</title>
			<link rel="icon" href="/favicon.ico" />		
			<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"/>        
            <link rel="stylesheet" type="text/css" href="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.css" />
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
            <script src="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.js" />		
		</Head>
		<Navbar />         
        <div id="form" className="py-5 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-2 sm:px-6 text-center">
                    <div id="myform"></div>
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
                            transform: translate(-77px, 80px) rotate(-90deg);
                            white-space: nowrap;
                            height: 200px;
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
                    
                    $( ".pagination .page-item" ).addClass( "lg:w-1/6 w-1/3" );

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
                            }, 3000);
                        });                    
                    });    
                });
			`
			}}
          />		
    </>
  )
}
  