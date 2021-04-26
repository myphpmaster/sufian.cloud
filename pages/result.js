/*  ./pages/result.js     */
import Head from 'next/head'
import { Navbar } from '../components/NavbarForm';
import { Result as Table } from '../components/Result';

export default function Result() {

  return (
    <>
		<Head>
			<title>IEQ POE Online System - Results</title>
			<link rel="icon" href="/favicon.ico" />		
			<meta name="description" content="Online application for post occupancy evaluation survey result using Next.js and Form.io" />
		</Head>
		<Navbar /> 
		<Table />
    </>
  )
}