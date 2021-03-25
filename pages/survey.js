import Head from 'next/head'
import Document, { Html, Main, NextScript } from "next/document"
import styles from '../styles/Survey.module.scss'

export default function Survey() {
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
          IEQ POE Questionnaire Form 
        </h1>

        <div className={styles.grid}>
			<div id="formio" className={styles.card}></div>
        </div>
      </main>
		
          <script
			dangerouslySetInnerHTML={
				{
				__html: `
				Formio.createForm(document.getElementById('formio'), "https://survey.app.sufian.cloud/ieq-poe");
			`
			}}
          />
		  
      <footer className={styles.footer}>
		<a href="/">Home</a>
		<a href="/survey" className={styles.active}>Form</a>
		<a href="/result">Results</a> 
		<a href="/source">Source</a> 
		<a href="/slide">Slides</a> 
      </footer>
    </div>
  )
}
