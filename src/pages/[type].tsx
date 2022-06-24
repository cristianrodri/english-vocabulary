import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@components/Layout'
import { Container } from '@components/table/Container'
import { customTitle } from '@utils/strings'
import { getSheetData, getSheetNames } from '@services/sheets'
import { Context } from '@context/GlobalContext'
export interface StaticProps {
  title: string
  words: string[][]
  langColumns: string[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const titles = await getSheetNames()

  const paths = titles.map(title => {
    return {
      params: { type: title }
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

  // Get all data from specific type of word on the Sheet
  const rows = await getSheetData(title)
  const words = rows.slice(1)
  const langColumns = rows.slice(0, 1)[0]

  return { props: { title, words, langColumns } }
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
