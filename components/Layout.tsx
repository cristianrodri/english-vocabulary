import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Logo } from './Logo'

const Layout: FC<{ title: string }> = ({ children, title }) => (
  <>
    <Head>
      <title>{title} - English Vocabulary</title>
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </nav>
    </header>
    {children}
  </>
)

export default Layout
