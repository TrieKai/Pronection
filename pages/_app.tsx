import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { FirebaseInit } from 'util/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  FirebaseInit()

  return <Component {...pageProps} />
}

export default MyApp
