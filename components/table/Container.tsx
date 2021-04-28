import styled from 'styled-components'
import { StaticProps } from './../../pages/[type]'
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
  max-width: 90%;
  width: 35rem;
  table-layout: fixed;
  text-align: center;
  margin-bottom: var(--gutter);
  font-size: var(--little-big);
`

export const Container = ({ title, data }: StaticProps) => {
  console.log(data)
  return (
    <Main>
      <Title>Translations ({data.length})</Title>
      <Actions />
      <Table>
        <Header title={title} />
        <tbody>
          {data.map((words) => (
            <Row key={words} bothWords={words} />
          ))}
        </tbody>
      </Table>
    </Main>
  )
}
