import Head from 'next/head'
import Document, { Html, Main, NextScript } from 'next/document'
import styles from '../styles/Result.module.scss'
import React from 'react'
import {Bar} from 'react-chartjs-2'

export default function Survey({dataResult,dataSchema,total,countGender,summary}) {
					
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

  return (
    <div className={styles.container}>
      <Head>
        <title>IEQ POE Online System - Questionnaire</title>
        <link rel="icon" href="/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.css" />
		<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
		<script src="https://unpkg.com/formiojs@4.12.7/dist/formio.full.min.js" />
		
      </Head>
		<video className={styles.bgvideo} width="1920" height="1083" poster="/poster-home.jpg" autoPlay loop>
			<source src="/home.mp4" type="video/mp4" /> 
			<source src="/home.ogg" type="video/ogg" /> 
			<source src="/home.webm" type="video/webm" />
		</video>
		
		<div className={styles.bgoverlay}>
		</div>
      <main className={styles.main}>
        <h1 className={styles.subtitle}>
          IEQ POE Survey Results
        </h1>

        <div className={styles.grid}>
			<div className={styles.card}>
				<Bar
				  data={data}
				  width={300}
				  height={300}
				  options={{
					  maintainAspectRatio: true,
					  scales: {
						yAxes: [{
						  ticks: {
							beginAtZero: true,
							stepSize: 1
						  }
						}]
					  },
					  title: {
						 display: true,
						 text: 'Gender'
					  }
				  }}
				/>
			</div>
        </div>

      </main>
		  
          <script
			dangerouslySetInnerHTML={
				{
				__html: `
				
			`
			}}
          />
		  
      <footer className={styles.footer}>
		<a href="/">Home</a>
		<a href="/survey">Form</a>
		<a href="/result" className={styles.active}>Results</a> 
		<a href="/source">Source</a> 
		<a href="/slide">Slides</a> 
      </footer>
    </div>
  )
}

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
