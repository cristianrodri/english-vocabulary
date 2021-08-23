import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { customTitle } from '../utils/strings'
import { Container } from '../components/table/Container'
import { getSheetData } from './../services/sheets'
import { Context } from '../context/GlobalContext'
export interface StaticProps {
  title: string
  words: string[][]
  columnNames: string[]
}

export const getServerSideProps: GetServerSideProps<
  StaticProps,
  { type: string }
> = async context => {
  const titleParams = context.params?.type as string
  const { words, columnNames, title } = await getSheetData(titleParams)
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
