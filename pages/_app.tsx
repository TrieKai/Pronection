import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Wrapper } from 'app/store'
import { FirebaseInit } from 'util/firebase'
import '../styles/globals.css'
import { ThemeProvider } from 'styled-components'
import { MainTheme } from '../styles/theme'

const MyApp = ({ Component, pageProps }: AppProps) => {
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
        <meta name='description' content='Chat with people nearby' />
        <meta name='keywords' content='chat map' />
        <title>Pronection</title>

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
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default Wrapper.withRedux(MyApp)
