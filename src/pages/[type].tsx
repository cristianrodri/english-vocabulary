import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@components/Layout'
import { Container } from '@components/table/Container'
import { customTitle } from '@utils/strings'
import { getSheetData, getSheetNames } from '@services/sheets'
import { Context } from '@context/GlobalContext'
import { useRouter } from 'next/router'
import Head from 'next/head'

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
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<
  StaticProps,
  { type: string }
> = async context => {
  const title = context.params?.type as string

  // Get all data from specific sheet name
  const rows = await getSheetData(title)

  if (!rows) {
    return {
      notFound: true
    }
  }

  const words = rows
    .slice(1)
    .sort((a: string[], b: string[]) => (a[0] < b[0] ? -1 : 1))
  const langColumns = rows.slice(0, 1)[0]

  return {
    props: { title, words, langColumns },
    revalidate: 1
  }
}

const VocabularyType = ({ title, words, langColumns }: StaticProps) => {
  const { isFallback } = useRouter()

  const customizedTitle = isFallback ? 'Loading...' : customTitle(title)
  if (isFallback) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <h1
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            color: 'var(--secondary-color)',
            fontSize: '20px'
          }}
        >
          Loading...
        </h1>
      </>
    )
  }

  return (
    <Context data={words} langColumns={langColumns}>
      <Layout title={customizedTitle} banner={title}>
        <Container />
      </Layout>
    </Context>
  )
}

export default VocabularyType
