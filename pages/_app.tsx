import type { AppProps } from 'next/app'
import { Wrapper } from 'app/store'
import { FirebaseInit } from 'util/firebase'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  FirebaseInit()

  return <Component {...pageProps} />
}

export default Wrapper.withRedux(MyApp)
