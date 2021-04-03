/*  ./pages/result.js     */
import Head from 'next/head'
import { Hero } from '../components/Hero';
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
			<title>IEQ POE Online System - Home</title>
			<link rel="icon" href="/favicon.ico" />		
			<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
		</Head>
		<Hero /> 
		<Result />
		<Footer /> 
    </>
  )
}