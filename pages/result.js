/*  ./pages/result.js     */
import Head from 'next/head'
import { Navbar } from '../components/Navbar';
import React, { Component } from 'react'
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2'
import { connectToDatabase } from '../util/mongodb'
export default function Survey({isConnected}) {

/*
	const data = {
	  labels: Object.keys(summary['gender']),
	  datasets: [{
		label: '# of Respondents',
		data: Object.values(summary['gender']),
		backgroundColor: [
		  'rgba(54, 162, 235, 0.2)',
		  'rgba(255, 99, 132, 0.2)'
		],
		borderColor: [
		  'rgba(54, 162, 235, 1)',
		  'rgba(255, 99, 132, 1)'
		],
		borderWidth: 1
	  }]
	}
*/

  return (
    <div>
		<Head>
			<title>IEQ POE Online System - Questionnaire</title>
			<link rel="icon" href="/favicon.ico" />		
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous" />
			<link rel="stylesheet" type="text/css" href="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.css" />
			<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossOrigin="anonymous"></script>
		</Head>
		<Navbar />    
		<main className='container-fluid p-0 m-0 mw-100'>
			<h1 className="subtitle">
			IEQ POE Survey Results
			</h1>
				

			{isConnected ? (
			<h2 className="subtitle">You are connected to MongoDB</h2>
			) : (
			<h2 className="subtitle">
				You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
				for instructions.
			</h2>
			)}

		</main>

		<footer className="footer">
			<a href="/">Home</a>
			<a href="/survey" >Questionnaire</a>
			<a href="/result" className="active">Results</a> 
			<a href="/source">Source</a> 
			<a href="/slide">Slides</a> 
		</footer>
    </div>
  )
}

/*
export async function getStaticProps(context) {
	const result = await fetch(`https://survey.app.sufian.cloud/ieq-poe/submission`)
	const dataResult = await result.json()
	
	const schema = await fetch(`https://survey.app.sufian.cloud/ieq-poe`)
	const dataSchema = await schema.json()
    
	console.log(dataResult);	
	console.log(dataSchema);
	
	var total = 0;

	dataResult.forEach(function(d) {
	  total += 1;
	});	
	
	const countAge = {}
	const countGender = {}
	const countJob = {}
	const countEdu = {}
	const countState = {}

	dataResult.forEach(item => {		
		// Age
		if (countAge[item.data.age]) {
		   countAge[item.data.age] +=1
		   return
		}
		countAge[item.data.age] = 1		
	})

	dataResult.forEach(item => {		
		// Gender
		if (countGender[item.data.gender]) {
		   countGender[item.data.gender] +=1
		   return
		}
		countGender[item.data.gender] = 1		
	})
	
	dataResult.forEach(item => {				
		// Job
		if (countJob[item.data.jobCategory]) {
		   countJob[item.data.jobCategory] +=1
		   return
		}
		countJob[item.data.jobCategory] = 1		
	})
	
	dataResult.forEach(item => {		
		// Education Level
		if (countEdu[item.data.highestEducationLevel]) {
		   countEdu[item.data.highestEducationLevel] +=1
		   return
		}
		countEdu[item.data.highestEducationLevel] = 1		
	})
	
	dataResult.forEach(item => {		
		// State
		if (countState[item.data.state]) {
		   countState[item.data.state] +=1
		   return
		}
		countState[item.data.state] = 1
	})
	
	const summary = {
		age: countAge,
		gender: countGender,
		jobCategory: countJob,
		highestEducationLevel: countEdu,
		state:countState
	}
	
	console.log(summary);

	return {
		props: { dataResult,dataSchema,total,countGender,summary }, // will be passed to the page component as props
	}
  
}
*/

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase()
  
	const isConnected = await client.isConnected()
  
	return {
	  props: { isConnected },
	}
  }
  