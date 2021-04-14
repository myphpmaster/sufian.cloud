/*  ./pages/result.js     */
import Head from 'next/head'
import { Hero } from '../components/Hero';
import { Overview } from '../components/Overview';
import { Azure } from '../components/Azure';
import { Footer } from '../components/Footer';
import React, { Component } from 'react'

export default function Home() {

  return (
    <>
		<Head>
			<title>IEQ POE Online System - Home</title>
		</Head>
		<Hero /> 
		<Overview /> 
		<Azure />
		<Footer /> 
    </>
  )
}
