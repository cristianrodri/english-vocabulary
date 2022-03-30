import { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../context/GlobalContext'
import { Actions } from './Actions'
import { Header } from './Header'
import { Row } from './Row'

const Main = styled.main`
  margin-right: var(--gutter);
  margin-left: var(--gutter);
`

const Title = styled.h2`
  text-align: center;
  margin-top: 0.8rem;
  color: #fff;
`

const Table = styled.table`
  margin: 0 auto;
  margin-top: 1rem;
  width: min(90%, 35em);
  table-layout: fixed;
  text-align: center;
  margin-bottom: var(--gutter);
  font-size: var(--little-big);
  overflow-x: auto;
`

export const Container = () => {
  const { words } = useContext(GlobalContext)

  return (
    <Main>
      <Title>Translations ({words.length})</Title>
      <Actions />
      <Table>
        <Header />
        <tbody>
          {words.map((eachWord, index) => (
            <Row key={eachWord.join()} eachWord={eachWord} rowIndex={index} />
          ))}
        </tbody>
      </Table>
    </Main>
  )
}
