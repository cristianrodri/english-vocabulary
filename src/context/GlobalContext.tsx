import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'

interface Props {
  data: string[][]
  langColumns: string[]
  children: ReactNode
}

export enum WordToPracticeType {
  ORIGINAL = 'original',
  FILTERED = 'filtered'
}

export interface IContext {
  originalData: string[][]
  words: string[][]
  langColumns: string[]
  showColumnInputs: number[]
  rowFocus: number
  columnFocus: number
  showInputs: (column: number[]) => void
  setRowFocus: Dispatch<SetStateAction<number>>
  setColumnFocus: Dispatch<SetStateAction<number>>
  setWords: Dispatch<SetStateAction<string[][]>>
  reset: () => void
  wordsToPractice: number
  setWordsToPractice: Dispatch<SetStateAction<number>>
  wordsToPracticeType: WordToPracticeType
  setWordsToPracticeType: Dispatch<SetStateAction<WordToPracticeType>>
}

export const GlobalContext = createContext({} as IContext)

export const Context: FC<Props> = ({ children, data, langColumns }) => {
  const [showColumnInputs, setShowColumnInput] = useState<number[]>([])
  const [words, setWords] = useState(data)
  const [rowFocus, setRowFocus] = useState(0)
  const [columnFocus, setColumnFocus] = useState(0)
  const [wordsToPractice, setWordsToPractice] = useState(10)
  const [wordsToPracticeType, setWordsToPracticeType] = useState(
    WordToPracticeType.ORIGINAL
  )

  const showInputs = (columnIndexes: number[]) => {
    setShowColumnInput(columnIndexes)
  }

  const reset = () => {
    setShowColumnInput([])
    setWords([])
    setRowFocus(0)
    setColumnFocus(0)
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        originalData: data,
        words,
        langColumns,
        showColumnInputs,
        rowFocus,
        columnFocus,
        showInputs,
        reset,
        setWords,
        setRowFocus,
        setColumnFocus,
        setWordsToPractice,
        wordsToPractice,
        wordsToPracticeType,
        setWordsToPracticeType
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
