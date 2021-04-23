import styled from 'styled-components'
import Link from 'next/link'
import { FC } from 'react'
import { customTitle } from '../utils/strings'
import Image from 'next/image'

const Article = styled.article`
  position: relative;
  opacity: 0.7;
  overflow: hidden;
`

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const H2 = styled.h2`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.8rem;
  color: var(--primary-color-alpha);
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8),
    rgba(228, 51, 111, 0.8)
  );
  transform: scale(1);
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.1);
    color: var(--primary-color);
  }
`

const Card: FC<{ title: string }> = ({ title }) => {
  return (
    <Article>
      <ImageContainer>
        <Image src={`/${title}.jpg`} width={300} height={200} />
      </ImageContainer>
      <Link href={`/${title}`}>
        <a>
          <H2>{customTitle(title)}</H2>
        </a>
      </Link>
    </Article>
  )
}

export default Card
