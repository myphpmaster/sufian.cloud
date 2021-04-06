/*  ./pages/result.js     */
import Head from 'next/head'
import { Navbar } from '../components/NavbarForm';
import { Result } from '../components/Result';

export default function Survey() {

  return (
    <>
		<Head>
			<title>IEQ POE Online System - Results</title>
			<link rel="icon" href="/favicon.ico" />		
		</Head>
		<Navbar /> 
		<Result />
    </>
  )
}