import styled from 'styled-components'
import Link from 'next/link'
import { Logo } from './Logo'

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const A = styled.a`
  --color: #fff;
  --box-shadow: 0 0px 0 currentColor;

  margin-right: calc(var(--gutter) * 2);
  cursor: pointer;
  font-size: var(--h2);
  color: var(--color);
  box-shadow: var(--box-shadow);
  transition: box-shadow 0.1s;
  &:hover {
    --box-shadow: 0 2px 0 currentColor;
  }
`

export const NavBar = () => {
  return (
    <Nav>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Link href="/about" passHref>
        <A>About</A>
      </Link>
    </Nav>
  )
}
