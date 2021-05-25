import Layout from '../components/Layout'
import styled from 'styled-components'
import { GetStaticProps } from 'next'
import Card from '../components/Card'
import { getSheetNames } from '../services/sheets'

interface Props {
  titles: string[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const titles = await getSheetNames()
  return {
    props: {
      titles
    }
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
      {titles.map(title => (
        <Card key={title} title={title} />
      ))}
    </Main>
  </Layout>
)

export default IndexPage
