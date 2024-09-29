// import Script from 'next/script';
import Head from 'next/head';
import Page from '../src/components/Page';
import { MenuStateProvider } from '../src/utils/menuState';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

import '../src/app/globals.css';
 
export default function MyApp({ Component, pageProps }) {
  return (
    <MenuStateProvider>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <script dangerouslySetInnerHTML={{ __html: 
        `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W7WHT5L7');
        `
      }}></script>
      <Page>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Page>
    </MenuStateProvider>
  )
}
