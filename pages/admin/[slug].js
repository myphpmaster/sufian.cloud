/*  ./pages/admin/[...route].js     */
import React, { Component, useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from "next/router";
import Head from 'next/head'
import Link from 'next/link';
import Login from '../../components/admin/login';
import { Navbar } from '../../components/admin/navbar';
import { RespondData } from '../../components/admin/respondData';
import { General } from '../../components/admin/chart/General';
import { Building } from '../../components/admin/chart/Building';
import { Thermal } from '../../components/admin/chart/Thermal';
import { Table } from '../../components/admin/latestSubmission';
import { Footer } from '../../components/admin/footer';

export default function Admin() {

	const [ session, loading ] = useSession()
	const [ content , setContent ] = useState()
  
	const router = useRouter();
	const slug = router.query.slug || []

	const menus = [	
		{
			"id":"general",
			"title":"General",
			"url":"/admin/general",
		},
		{
			"id":"building",
			"title":"Building",
			"url":"/admin/building",
		},
		{
			"id":"thermal",
			"title":"Thermal",
			"url":"/admin/thermal",
		},
	];
	
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
		
		<div className="container w-full mx-auto pt-20">
			<div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">

				<RespondData />

				<hr className="border-b-2 border-gray-400 my-8 mx-4" />

				<div className="pb-5 text-2xl font-bold text-center text-black">					
					<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">

					{ menus.map( (menu, index) => ( 
						<Link key={index} href={menu.url}>
						<a id={menu.id}
							className={`${ menu.id==slug ? 'bg-blue-100 hover:bg-blue-50' : 'bg-gray-50 hover:bg-gray-150' }
							relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 `}>
							{menu.title}
						</a>
						</Link>
					))}
					
					</nav>
				</div>            
				
				<div className="flex flex-row flex-wrap flex-grow mt-2">

					{ (slug==='general') && <>
						<General />
					</>}

					{ (slug==='building') && <>
						<Building />
					</>}

					{ (slug==='thermal') && <>
						<Thermal />
					</>}

					<Table />
				</div>

			</div>
    	</div>
		<Footer />

    </>
  )
}
  