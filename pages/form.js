/*  ./pages/result.js     */
import Head from 'next/head'
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';

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
		<Hero /> 
        
        <div id="form" className="py-24 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
                <div className="px-4 py-5 sm:px-6 text-center">
                    <div id="myform"></div>
                </div>
            </div>
        </div>
		<Footer /> 
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
  