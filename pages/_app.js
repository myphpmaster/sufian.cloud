/*   ./styles/_app.js              */
import Head from 'next/head'
import Layout from '../components/layout';
import '../styles/globals.scss'
import '../styles/main.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>IEQ POE Online System</title>
      </Head>
      <Component {...pageProps} />
    </Layout>  
  );
}

export default MyApp