import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'
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
  showColumnInputs: number[]
  words: string[]
  rowFocus: number
  columnFocus: number
  showInputs: (column: number[]) => void
  setRowFocus: Dispatch<SetStateAction<number>>
  setColumnFocus: Dispatch<SetStateAction<number>>
  // getWords: (column: string[]) => void
  reset: () => void
}

const contextDefaultValues: IContext = {
  showColumnInputs: [],
  words: [],
  rowFocus: 0,
  columnFocus: 0,
  showInputs: () => {},
  setRowFocus: () => {},
  setColumnFocus: () => {},
  // getWords: () => {},
  reset: () => {}
}

export const GlobalContext = createContext<IContext>(contextDefaultValues)

const VocabularyType = ({ title, data }: StaticProps) => {
  const titleCaptalized = customTitle(title)
  const [showColumnInputs, setShowColumnInput] = useState<number[]>([])
  const [words, setWords] = useState<string[]>(data)
  const [rowFocus, setRowFocus] = useState(0)
  const [columnFocus, setColumnFocus] = useState(0)

  const showInputs = (columnIndex: number[]) => {
    setShowColumnInput(columnIndex)
  }

  // const getWords = (words: string[]) => {
  //   setWords(words)
  // }

  const reset = () => {
    setShowColumnInput([])
    setWords([])
    setRowFocus(0)
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        showColumnInputs,
        words,
        rowFocus,
        columnFocus,
        showInputs,
        reset,
        setRowFocus,
        setColumnFocus
      }}
    >
      <Layout title={titleCaptalized} banner={title}>
        <Container title={title} />
      </Layout>
    </GlobalContext.Provider>
  )
}

export default VocabularyType
