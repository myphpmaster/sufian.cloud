import Head from 'next/head'
import { Navbar } from '../components/Navbar';

export default function Survey() {
  return (
    <div className="container">
      <Head>
        <title>IEQ POE Online System - Questionnaire</title>
        <link rel="icon" href="/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.css" />
		<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
		<script src="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.js" />		
      </Head>
		<video className="bgvideo" width="1920" height="1083" poster="/poster-home.jpg" autoPlay loop>
			<source src="/home.mp4" type="video/mp4" /> 
			<source src="/home.ogg" type="video/ogg" /> 
			<source src="/home.webm" type="video/webm" />
		</video>		
		<div className="bgoverlay"></div>          
		<Navbar />    
		<main className="main">
			<h1 className="subtitle">
			IEQ POE Questionnaire Form 
			</h1>

			<div className="grid">
				<div id="formio" className="card"></div>
			</div>
		</main>		
          <script
			dangerouslySetInnerHTML={
				{
				__html: `
				Formio.createForm(document.getElementById('formio'), "https://survey.app.sufian.cloud/ieq-poe", {
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
			`
			}}
          />		  
      <footer className="footer">
		<a href="/">Home</a>
		<a href="/survey" className="active">Questionnaire</a>
		<a href="/result">Results</a> 
		<a href="/source">Source</a> 
		<a href="/slide">Slides</a> 
      </footer>
    </div>
  )
}