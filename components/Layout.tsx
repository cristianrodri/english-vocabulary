import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Logo } from './Logo'
import styled from 'styled-components'
import { customTitle } from '../utils/strings'

const Header = styled.header<{ banner: string }>`
  width: 100%;
  min-height: 60vh;
  background-size: cover;
  background-position: left;
  background-image: linear-gradient(
      to right,
      var(--secondary-color-alpha),
      var(--third-color-alpha)
    ),
    url(${(props) => props.banner});
  display: flex;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1`
  color: #eee;
`

const Layout: FC<{ title: string; banner: string }> = ({
  children,
  title,
  banner,
}) => (
  <>
    <Head>
      <title>{title} - English Vocabulary</title>
      <link rel="shortcut icon" href="/logo.png" />
    </Head>
    <Header banner={`/${banner}.jpg`}>
      <nav>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </nav>
      <H1>{customTitle(title)}</H1>
    </Header>
    {children}
  </>
)

export default Layout
