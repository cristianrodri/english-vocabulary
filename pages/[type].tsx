import { createContext, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
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
      params: { type: item }
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
> = async (context) => {
  const title = context.params?.type as VocabularyTypes
  const data = vocabulary.types[context.params?.type as VocabularyTypes].split(
    ';'
  )
  return { props: { title, data } }
}

interface IContext {
  showColumnInputs: number
  words: string[]
  showInputs: (column: number) => void
  // getWords: (column: string[]) => void
  reset: () => void
}

const contextDefaultValues: IContext = {
  showColumnInputs: -1,
  words: [],
  showInputs: () => {},
  // getWords: () => {},
  reset: () => {}
}

export const GlobalContext = createContext<IContext>(contextDefaultValues)

const VocabularyType = ({ title, data }: StaticProps) => {
  const titleCaptalized = customTitle(title)
  const [showColumnInputs, setShowColumnInput] = useState<number>(-1)
  const [words, setWords] = useState<string[]>(data)

  const showInputs = (columnIndex: number) => {
    setShowColumnInput(columnIndex)
  }

  // const getWords = (words: string[]) => {
  //   setWords(words)
  // }

  const reset = () => {
    setShowColumnInput(-1)
    setWords([])
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{ showColumnInputs, words, showInputs, reset }}
    >
      <Layout title={titleCaptalized} banner={title}>
        <Container title={title} />
      </Layout>
    </GlobalContext.Provider>
  )
}

export default VocabularyType
