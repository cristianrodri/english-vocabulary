import styled from 'styled-components'
import Link from 'next/link'
import { FC } from 'react'
import { customTitle } from '../utils/strings'

const Article = styled.article`
  position: relative;
  opacity: 0.7;
  overflow: hidden;
`

const H2 = styled.h2`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
      <Link href={title}>
        <a>
          <H2>{customTitle(title)}</H2>
        </a>
      </Link>
    </Article>
  )
}

export default Card
