/*  ./pages/result.js     */
import Head from 'next/head'
import { Hero } from '../components/Hero';
import { Overview } from '../components/Overview';
import { Azure } from '../components/Azure';
import { Result } from '../components/Result';
import { Footer } from '../components/Footer';
import React, { Component } from 'react'
import { connectToDatabase } from '../util/mongodb'

export default function Home({isConnected}) {

  return (
    <>
		<Head>
			<title>IEQ POE Online System - Home</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Hero /> 
		<Overview /> 
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
  