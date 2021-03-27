/* ./pages/result.js               */
import Head from 'next/head'
import Document, { Html, Main, NextScript } from 'next/document'
import styles from '../styles/Result.module.scss'
import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'
import { UncontrolledCarousel, Row, Col } from "reactstrap";

export default function Survey({Component,dataResult,dataSchema,total,countGender,summary}) {

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
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous" />
		<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossOrigin="anonymous"></script>
		
      </Head>
		<video className={styles.bgvideo} width="1920" height="1083" poster="/poster-home.jpg" autoPlay loop>
			<source src="/home.mp4" type="video/mp4" /> 
			<source src="/home.ogg" type="video/ogg" /> 
			<source src="/home.webm" type="video/webm" />
		</video>
		
		<div className={styles.bgoverlay}></div>
      <main className='container-fluid p-0 m-0 mw-100'>
        <h1 className={styles.subtitle}>
          IEQ POE Survey Results
        </h1>
			
		<div id="mainCarousel" className='container-fluid p-0 m-0 mw-100 carousel slide' data-ride="carousel">		
			<div className="carousel-inner">

				<div className='carousel-item active'>
					<div className={styles.grid}>
						<div className="card d-none d-md-block">
							<Bar
							data={data}
							width={800}
							height={500}
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
						<div className="card d-md-none d-block">
							<Bar
							data={data}
							width={320}
							height={400}
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
				</div>


				<div className='carousel-item'>
					<div className={styles.grid}>
						<div className="card d-none d-md-block">
							<Bar
							data={data}
							width={800}
							height={500}
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
						<div className="card d-md-none d-block">
							<Bar
							data={data}
							width={320}
							height={400}
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
				</div>
				
				<div className='carousel-item'>
					<div className={styles.grid}>
						<div className="card d-none d-md-block">
							<Bar
							data={data}
							width={800}
							height={500}
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
						<div className="card d-md-none d-block">
							<Bar
							data={data}
							width={320}
							height={400}
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
				</div>
				
			</div>

			<a className="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
			<span className="carousel-control-prev-icon" aria-hidden="true"></span>
			<span className="sr-only">Previous</span>
		</a>
		<a className="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
			<span className="carousel-control-next-icon" aria-hidden="true"></span>
			<span className="sr-only">Next</span>
		</a>

		</div>

      </main>
		  
          <script
			dangerouslySetInnerHTML={
				{
				__html: `
				jQuery( document ).ready(function($) {		
					$('.carousel').carousel()				
				});
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
