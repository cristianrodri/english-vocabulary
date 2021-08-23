import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from 'react'

interface Props {
  data: string[][]
  columnNames: string[]
}

export interface IContext {
  words: string[][]
  columnNames: string[]
  showColumnInputs: number[]
  rowFocus: number
  columnFocus: number
  showInputs: (column: number[]) => void
  setRowFocus: Dispatch<SetStateAction<number>>
  setColumnFocus: Dispatch<SetStateAction<number>>
  setWords: Dispatch<SetStateAction<string[][]>>
  reset: () => void
}

export const GlobalContext = createContext<IContext | null>(null)

export const Context: FC<Props> = ({ children, data, columnNames }) => {
  const [showColumnInputs, setShowColumnInput] = useState<number[]>([])
  const [words, setWords] = useState(data)
  const [rowFocus, setRowFocus] = useState(0)
  const [columnFocus, setColumnFocus] = useState(0)

  const showInputs = (columnIndex: number[]) => {
    setShowColumnInput(columnIndex)
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
        words,
        columnNames,
        showColumnInputs,
        rowFocus,
        columnFocus,
        showInputs,
        reset,
        setWords,
        setRowFocus,
        setColumnFocus
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
