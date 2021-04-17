/*  ./pages/admin/[slug].js     */
import React, { Component, useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import useSWR, { useSWRInfinite } from "swr";
import { useRouter } from "next/router";
import Head from 'next/head'
import Link from 'next/link';
import Login from '../../components/admin/login';
import { Navbar } from '../../components/admin/navbar';
import { RespondData } from '../../components/admin/respondData';
import { Table } from '../../components/admin/latestSubmission';
import { Footer } from '../../components/admin/footer';

export default function Admin() {

	const [ session, loading ] = useSession()
	const [ content , setContent ] = useState()
  
	const router = useRouter();
	const slug = router.query.slug
	
    const fetcher = url => fetch(url).then(res => res.json());
    const { data: schem, error } = useSWR(() => '/api/label/?nocache=1', fetcher)
    const schems = schem ? [].concat(...schem) : [];
    const charts = []	
	const menus = [	
		{
			"id":"entry",
			"title":"Latest Entry",
			"url":"/admin/entry",
			"class": 'bg-red-100 w-full mr-2 mb-2 md:mb-0 hover:bg-red-50',
			"classActive": 'bg-red-200'
		}
	];

    for (let i = 0; i < schems.length; i++) {
        if(schems[i].type == 'panel') {
				
			menus.push(
				{
					"id": schems[i].key,
					"title": schems[i].title,
					"url":"/admin/" + schems[i].key,
				}
			)

			if(schems[i].key == slug) {
				let obj = schems[i].components
				for (let j = 0; j < obj.length; j++) {
					if (obj[j].type == 'columns'){
						let col = obj[j].columns
						for (let k = 0; k < col.length; k++) {
							let subcol = col[k].components
							for (let l = 0; l < subcol.length; l++) {
								if (validType(subcol[l].type)) {
									charts.push(subcol[l])
								}
							}
						}
					}else if (validType(obj[j].type)) {
						charts.push(obj[j])
					}
				}
			}
        }
    }

	const single = charts.length == 1 ? true : false
	
	// console.log('menus =>' + JSON.stringify(menus))

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

				<div className="container w-full pb-5 text-2xl font-bold text-center text-black">					
					<nav className="relative z-0 rounded-md -space-x-px" aria-label="Pagination">

					{ menus.map( (menu, index) => ( 
						<Link key={index} href={menu.url}>
							<a id={menu.id}
								className={`${ menu.id==slug ? ( menu.classActive ? menu.classActive : 'bg-blue-100') : 'bg-gray-50' }
								 ${ menu.class ? menu.class : 'hover:bg-blue-50 w-1/3' } inline-block md:w-auto items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700`}>
								{menu.title}
							</a>
						</Link>
					))}
					
					</nav>
				</div>    
					
					
				{ (!schem) && <>
				
					<div className="flex flex-row flex-wrap flex-grow mt-2">
						<div className="w-full p-3">
							<div className="">
								<div className="p-3 min-h-full">
									<h5 className="font-bold uppercase text-gray-600 text-center">Loading...</h5>
								</div>
							</div>
						</div>
					</div>
        		</>}

				{ (slug==='entry') && <>

					<div className="container w-full">
						<Table />
					</div>

				</>}

				{ (charts.length > 0) && <>

					<div className="flex flex-row flex-wrap flex-grow mt-2">
						{charts.map( (section, key) => (    
							renderCharts(section, key, single)
						))}    
					</div>

				</>}

			</div>
    	</div>
		<Footer />

    </>
  )
}

function validType(type){

    const types = [
        'number',
        'radio',
        'select',
        'survey',
    ]
    return types.includes(type) ? true : false
}

function renderCharts(data, id, single=false){

    var chartType = {
      "number": "line",
      "select": "bar",
      "radio": "horizontal",
      "survey": "bar"
    }

    const type = data.properties.hasOwnProperty('chart') ? data.properties.chart : chartType[data.type] 
    const slug = (data.type == 'survey') ? ( data.values.length > data.questions.length ?  '?type=likert' : '' ) : ''
    const clss = single ? '' : 'md:w-1/2'
    const height = single ? '100vh' : '550px'

	switch (data.type){
		case 'survey':

			return (
			
				<div key={id} className={`${clss} w-full p-3`}>
								
					<div className="bg-white border rounded shadow">
						<div className="border-b p-3">
							<h5 className="font-bold uppercase text-gray-600 text-center">{data.label}</h5>
						</div>
						<div className="p-5">
							<div className="" style={{width: '100%', height: height}}>
								<iframe className="inset-0 w-full h-full" src={`/multicharts/${type}/${data.key}/${slug}`} frameBorder="0" />
							</div>
						</div>
					</div>
					
				</div>
	
			)

		default:

		return (
			
			<div key={id} className={`${clss} w-full p-3`}>
							
				<div className="bg-white border rounded shadow">
					<div className="border-b p-3">
						<h5 className="font-bold uppercase text-gray-600 text-center">{data.label}</h5>
					</div>
					<div className="p-5">
						<div className="" style={{width: '100%', height: height}}>
							<iframe className="inset-0 w-full h-full" src={`/charts/${type}/${data.key}/${slug}`} frameBorder="0" />
						</div>
					</div>
				</div>
				
			</div>

		)
	}
}