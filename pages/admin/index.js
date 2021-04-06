/*  ./pages/admin/index.js     */
import Head from 'next/head'
import Login from '../../components/admin/login';
import React, { Component, useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { Navbar } from '../../components/admin/navbar';
import { Contain } from '../../components/admin/generalPage';
import { Footer } from '../../components/admin/footer';

export default function Admin() {

	const [ session, loading ] = useSession()
	const [ content , setContent ] = useState()
  
	// Fetch content from protected route
	useEffect(()=>{
	  const fetchData = async () => {
		const res = await fetch('/api/account/protected')
		const json = await res.json()
		if (json.content) { setContent(json.content) }
	  }
	  fetchData()
	},[session])
  
	// When rendering client side don't display anything until loading is complete
	if (typeof window !== 'undefined' && loading) return null
  
	// If no session exists, display access denied message
	if (!session) { return (<Login />)}
  
  return (
    <>
		<Head>
			<title>IEQ POE Online System - Administrator</title>
			<link rel="icon" href="/favicon.ico" />		
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous" />
		</Head>

		<Navbar />
		<Contain />
		<Footer />

    </>
  )
}
  