import { useRouter } from 'next/router'
import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../pages/[type]'
import { ColumnProps } from './Column'

interface InputProps {
  showedColumns: number[]
  correctTyped: boolean
  columnIndex: number
}

const StyledInput = styled.input<InputProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  border: 0;
  text-align: center;
  font-size: 1rem;
  display: ${(props) =>
    props.showedColumns.includes(props.columnIndex) && !props.correctTyped
      ? 'block'
      : 'none'};
`

export const Input = ({ word, columnIndex, rowIndex }: ColumnProps) => {
  const {
    showColumnInputs,
    words,
    rowFocus,
    setRowFocus,
    columnFocus,
    setColumnFocus
  } = useContext(GlobalContext)
  const [value, setValue] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const [correctTyped, setCorrectTyped] = useState(false)
  const router = useRouter()
  const pathname = router.query.type
  const isVerbsPage =
    pathname === 'common-verbs' ||
    pathname === 'irregular-verbs' ||
    pathname === 'regular-verbs'

  useEffect(() => {
    setCorrectTyped(false)
    setValue('')
    setRowFocus(0)
  }, [showColumnInputs])

  useEffect(() => {
    if (
      rowIndex === rowFocus &&
      columnIndex === columnFocus &&
      // showColumnInputs.includes(columnIndex) &&
      !correctTyped
    )
      ref.current?.focus()
  }, [rowFocus, columnFocus, showColumnInputs])

  const checkWord = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // check if word is correct
      const columnLength = words[rowIndex].split(/, |=/).length
      const correctWord = word.split('/')

      if (correctWord.includes(value)) {
        setCorrectTyped(true)

        // when is verbs AND columnFocus could change
        if (isVerbsPage && columnLength - columnFocus > 2) {
          setColumnFocus(columnFocus + 1)
        } else {
          setRowFocus(rowFocus + 1)
          setColumnFocus(0)
        }
      } else {
        console.log('Incorrect')
      }
    }
  }

  const handleFocus = () => {
    setRowFocus(rowIndex)
    setColumnFocus(columnIndex)
  }

  return (
    <StyledInput
      ref={ref}
      type="text"
      onKeyDown={checkWord}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      showedColumns={showColumnInputs}
      columnIndex={columnIndex}
      correctTyped={correctTyped}
      onFocus={handleFocus}
    />
  )
}
