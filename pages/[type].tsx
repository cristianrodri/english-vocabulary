import { GetStaticProps } from 'next'
import React from 'react'
import vocabulary from '../public/vocabulary.json'
import Layout from '../components/Layout'
import { customTitle } from '../utils/strings'
import { Container } from '../components/table/Container'

export type VocabularyTypes = keyof typeof vocabulary.types

export interface StaticProps {
  title: VocabularyTypes
  data: string[]
}

export async function getStaticPaths() {
  const paths = Object.keys(vocabulary.types).map((item) => {
    return {
      params: { type: item },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

const VocabularyType = ({ title, data }: StaticProps) => {
  const titleCaptalized = customTitle(title)
  return (
    <Layout title={titleCaptalized} banner={title}>
      <Container title={title} data={data} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<
  StaticProps,
  { type: string }
> = async (context) => {
  const title = context.params?.type as VocabularyTypes
  const data = vocabulary.types[context.params?.type as VocabularyTypes].split(
    ';'
  )
  return { props: { title, data } }
}

export default VocabularyType
