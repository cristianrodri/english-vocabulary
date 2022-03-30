import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { customTitle } from '../utils/strings'
import { Container } from '../components/table/Container'
import { getSheetData, getSheetNames } from './../services/sheets'
import { Context } from '../context/GlobalContext'
export interface StaticProps {
  title: string
  words: string[][]
  langColumns: string[]
}

// Get all titles from Sheet names
export const getStaticPaths: GetStaticPaths = async () => {
  const titles = await getSheetNames()

  const paths = titles.map(title => ({ params: { type: title } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<
  StaticProps,
  { type: string }
> = async context => {
  const titleParams = context.params?.type as string

  // Get all data from specific type of word on the Sheet
  const { words, langColumns, title } = await getSheetData(titleParams)

  return { props: { title, words, langColumns }, revalidate: 1 }
}

const VocabularyType = ({ title, words, langColumns }: StaticProps) => {
  const customizedTitle = customTitle(title)

  return (
    <Context data={words} langColumns={langColumns}>
      <Layout title={customizedTitle} banner={title}>
        <Container />
      </Layout>
    </Context>
  )
}

export default VocabularyType
