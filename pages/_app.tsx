import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { Wrapper } from 'app/store'
import { FirebaseInit } from 'util/firebase'
import '../styles/globals.css'
import { ThemeProvider } from 'styled-components'
import { MainTheme } from '../styles/theme'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  FirebaseInit()

  return (
    <ThemeProvider theme={MainTheme}>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <title>Pronection</title>
        <meta name='description' content='Chat with people nearby' />
        <meta name='keywords' content='chat map' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Pronection' />
        <meta property='og:description' content='Chat with people nearby' />
        <meta property='twitter:card' content='summary' />
        <meta property='twitter:title' content='Pronection' />
        <meta
          property='twitter:description'
          content='Chat with people nearby'
        />

        <link rel='manifest' href='/manifest.json' />
        <link
          href='/icon/icon-16x16.png'
          rel='icon'
          type='image/png'
          sizes='16x16'
        />
        <link
          href='/icon/icon-32x32.png'
          rel='icon'
          type='image/png'
          sizes='32x32'
        />
        <link rel='apple-touch-icon' href='/location-pin.png'></link>
        <meta name='theme-color' content={MainTheme.blue3} />
      </Head>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-4BQLCTY1M2'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4BQLCTY1M2');
        `}
      </Script>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default Wrapper.withRedux(MyApp)
