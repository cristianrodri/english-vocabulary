import { AppProps } from 'next/app'
import '../styles/styles.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
