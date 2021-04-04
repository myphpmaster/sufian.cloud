/*  ./pages/result.js     */
import Head from 'next/head'
import { Navbar } from '../components/Navbar';
import { Result } from '../components/Result';
import { Footer } from '../components/Footer';
import React, { Component, Suspense } from 'react'
import axios from 'axios'
import useSWR, { useSWRInfinite } from "swr";

const fetcher = url => axios.get(url).then(res => res.json())

export default function Survey(props) {

    // Fetch submissions data
	const { surveys, error } = useSWR('/api/result', fetcher, { Suspense: true })

	console.log(surveys);

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