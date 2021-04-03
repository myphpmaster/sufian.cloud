/*   ./styles/_app.js              */
import Head from 'next/head'
import Layout from '../components/layout';
import '../styles/globals.scss'
import '../styles/custom.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>IEQ POE Online System</title>
      </Head>
      <Component {...pageProps} />
    </Layout>  
  );
}

export default MyApp