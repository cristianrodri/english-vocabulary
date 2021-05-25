import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { customTitle } from '../utils/strings'
import { Container } from '../components/table/Container'
import { getSheetData, getSheetNames } from './../services/sheets'
import { Context } from '../context/GlobalContext'
export interface StaticProps {
  title: string
  words: string[]
  columnNames: string[]
}

export async function getStaticPaths() {
  const sheetNames = await getSheetNames()
  const paths = sheetNames.map(sheetName => {
    return {
      params: { type: sheetName }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<
  StaticProps,
  { type: string }
> = async context => {
  const title = context.params?.type as string
  const { words, columnNames } = await getSheetData(title)
  return { props: { title, words, columnNames } }
}

const VocabularyType = ({ title, words, columnNames }: StaticProps) => {
  const titleCaptalized = customTitle(title)

  return (
    <Context data={words} columnNames={columnNames}>
      <Layout title={titleCaptalized} banner={title}>
        <Container />
      </Layout>
    </Context>
  )
}

export default VocabularyType
