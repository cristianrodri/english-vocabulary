import { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import '../styles/styles.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextNprogress
        color="var(--primary-color)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
