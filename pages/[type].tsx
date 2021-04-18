import { GetStaticProps } from 'next'
import React from 'react'
import vocabulary from '../public/vocabulary.json'
import Layout from '../components/Layout'
import { customTitle } from '../utils/strings'

type VocabularyTypes = keyof typeof vocabulary.types

interface Props {
  title: string
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

const VocabularyType = ({ title, data }: Props) => {
  const titleCaptalized = customTitle(title)
  return (
    <Layout title={titleCaptalized} banner={title}>
      <div>
        <h1>{titleCaptalized}</h1>
        <ul>
          {data.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props, { type: string }> = async (
  context
) => {
  const title = context.params?.type as VocabularyTypes
  const data = vocabulary.types[context.params?.type as VocabularyTypes].split(
    ';'
  )
  return { props: { title, data } }
}

export default VocabularyType
