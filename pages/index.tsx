import Layout from '../components/Layout'
import styled from 'styled-components'
import { GetStaticProps } from 'next'
import vocabulary from '../public/vocabulary.json'
import Card from './../components/Card'

interface Props {
  titles: string[]
}

export const getStaticProps: GetStaticProps<Props, {}> = async () => {
  return {
    props: {
      titles: Object.keys(vocabulary.types),
    },
  }
}

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 200px;
  padding: 2rem;
  grid-gap: 1rem;
  justify-content: center;
`

const IndexPage = ({ titles }: Props) => (
  <Layout title="home" banner="london">
    <Main>
      {titles.map((title) => (
        <Card key={title} title={title} />
      ))}
    </Main>
  </Layout>
)

export default IndexPage
