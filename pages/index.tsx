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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 200px;
`

const IndexPage = ({ titles }: Props) => (
  <Layout title="home" banner="london">
    {/* <Image src="/irregular-verbs.jpg" width={300} height={300} /> */}
    <Main>
      {titles.map((title) => (
        <Card key={title} title={title} />
      ))}
    </Main>
  </Layout>
)

export default IndexPage
