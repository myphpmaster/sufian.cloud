/* ./pages/index.js               */
import Head from 'next/head'
import { Navbar } from '../components/Navbar';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>IEQ POE Online System - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>   
      <video className="bgvideo" width="1920" height="1083" poster="/poster-home.jpg" autoPlay loop>
        <source src="/home.mp4" type="video/mp4" /> 
        <source src="/home.ogg" type="video/ogg" /> 
        <source src="/home.webm" type="video/webm" />
      </video>
      <div className="bgoverlay"></div>          
      <Navbar />    
      <main className="main">
        <p className="predescription">
          Welcome to
        </p>
            <h1 className="title">
              Internal Environmental Quality 
            </h1>
        <h2 className="subtitle">
          Post Occupancy Evaluation
        </h2>

          <div className="grid">
            <a href="/survey" className="card">
              <h3>Questionnaire Form &rarr;</h3>
              <p>Please feel free to take part on our POE IEQ survey form.</p>
            </a>

            <a href="/result" className="card">
              <h3>Survey Results &rarr;</h3>
              <p>View the real-time results! Latest HTML5 canvas chart.</p>
            </a>

            <a href="/source" className="card">
              <h3>Source Code &rarr;</h3>
              <p>Implemented using Node js, SAAS and HTML5 charts on Azure Cloud.</p>
            </a>

            <a href="/slide" className="card">
              <h3>Presentation Slides &rarr;</h3>
              <p>
                FInd out the project proposal slide and presentation video.
              </p>
            </a>
          </div>

          <p className="description">
            A <a href="https://discover-ai-with-microsoft.agorize.com/en/challenges/msazurevirtualhack-2021/pages/timeline-and-guidelines?lang=en" target="_blank">Microsoft Azure Virtual Hackathon 2021</a> 
            project by <a href="https://github.com/myphpmaster/sufian.cloud/projects/1" target="_blank">myphpmaster</a> team.
          </p>
      
        </main>
    </div>
  )
}