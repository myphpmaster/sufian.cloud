/*  ./pages/index.js     */
import Head from 'next/head'
import { Hero } from '../components/Hero';
import { Overview } from '../components/Overview';
import { Report } from '../components/Report';
import { Github } from '../components/Github';
import { Azure } from '../components/Azure';
import { Footer } from '../components/Footer';
import React, { Component } from 'react'

export default function Home() {

  return (
    <>
		<Head>
			<title>IEQ POE Online System - Home</title>
			<link rel="icon" href="/favicon.ico" />		
			<meta name="description" content="Online application for post occupancy evaluation survey report visualization using Next.js and Form.io" />
		</Head>
		<Hero /> 
		<Overview /> 
		<Report /> 
		<Github /> 
		<Azure />
		<Footer /> 
    </>
  )
}
