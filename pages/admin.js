/*  ./pages/admin.js     */
import Head from 'next/head'
import { Navbar } from '../components/AdminNavbar';
import { Contain } from '../components/AdminContain';
import { Footer } from '../components/AdminFooter';
import React, { Component } from 'react'
import { connectToDatabase } from '../util/mongodb'

export default function Admin({dataResult, dataSchema, total, summary, isConnected}) {

  return (
    <>
		<Head>
			<title>IEQ POE Online System - Administrator</title>
			<link rel="icon" href="/favicon.ico" />		
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"></link>
			<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js" integrity="sha256-XF29CBwU1MWLaGEnsELogU6Y6rcc5nCkhhx89nFMIDQ=" crossorigin="anonymous"></script>
		</Head>

		<Navbar />
		<Contain />
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
  