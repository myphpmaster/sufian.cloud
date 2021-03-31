/*  ./pages/result.js     */
import Head from 'next/head'
import { Hero } from '../components/Hero';
import { Overview } from '../components/Overview';
import { Azure } from '../components/Azure';
import { Result } from '../components/Result';
import { Footer } from '../components/Footer';
import React, { Component } from 'react'
import { connectToDatabase } from '../util/mongodb'

export default function Survey({dataResult, dataSchema, total, summary, isConnected}) {

  return (
    <>
		<Head>
			<title>IEQ POE Online System - Questionnaire</title>
			<link rel="icon" href="/favicon.ico" />		
			<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
		</Head>
		<Hero /> 
		<Overview /> 
		<Result />
		<Azure />
		<Footer /> 
    </>
  )
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase()
  
	const isConnected = await client.isConnected()
  
	return {
	  props: { isConnected },
	}
  }
  