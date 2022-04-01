import { GetServerSideProps } from 'next'
import Layout from '@components/Layout'
import { Container } from '@components/table/Container'
import { customTitle } from '@utils/strings'
import { getSheetData } from '@services/sheets'
import { Context } from '@context/GlobalContext'
export interface StaticProps {
  title: string
  words: string[][]
  langColumns: string[]
}

export const getServerSideProps: GetServerSideProps<
  StaticProps,
  { type: string }
> = async context => {
  const titleParams = context.params?.type as string

  // Get all data from specific type of word on the Sheet
  const { words, langColumns, title } = await getSheetData(titleParams)

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
