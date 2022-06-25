import { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import { customTitle } from '@utils/strings'
import { NavBar } from './NavBar'
import { bannerUrl } from '@utils/banner'

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
`

const Header = styled.header`
  position: relative;
  width: 100%;
  min-height: 60vh;
  background-size: cover;
  background-position: left;
  background-image: linear-gradient(
    to right,
    var(--secondary-color-alpha),
    var(--third-color-alpha)
  );
  display: flex;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1`
  color: var(--banner-title);
`

const Layout: FC<{ title: string; banner: string }> = ({
  children,
  title,
  banner
}) => {
  return (
    <>
      <Head>
        <title>{title} - English Vocabulary</title>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <Header>
        <NavBar />
        <ImageContainer>
          <Image
            src={`/${bannerUrl(banner)}`}
            layout="fill"
            objectFit="cover"
          />
        </ImageContainer>
        <H1>{customTitle(title)}</H1>
      </Header>
      {children}
    </>
  )
}

export default Layout
