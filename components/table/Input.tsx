import { useRouter } from 'next/router'
import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import styled from 'styled-components'
import { GlobalContext } from '../../pages/[type]'
import { ColumnProps } from './Column'

interface InputProps {
  showedColumns: number[]
  correctTyped: boolean
  columnIndex: number
  isWrong: boolean
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
  background-color: ${props => (props.isWrong ? 'var(--wrong)' : '#fff')};
  font-size: 1rem;
  display: ${props =>
    props.showedColumns.includes(props.columnIndex) && !props.correctTyped
      ? 'block'
      : 'none'};
`

const Icon = styled.span<Omit<InputProps, 'isWrong'>>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin-right: 0.5em;
  align-items: center;
  display: ${props =>
    props.showedColumns.includes(props.columnIndex) && !props.correctTyped
      ? 'flex'
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
  const [isWrong, setIsWrong] = useState(false)
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

      if (correctWord.includes(value.toLowerCase())) {
        setCorrectTyped(true)
        setIsWrong(false)

        // when is verbs AND columnFocus could change
        if (isVerbsPage && columnLength - columnFocus > 2) {
          setColumnFocus(columnFocus + 1)
        } else {
          setRowFocus(rowFocus + 1)
          setColumnFocus(0)
        }
      } else {
        setIsWrong(true)
        console.log('Incorrect')
      }
    }
  }

  const handleFocus = () => {
    setRowFocus(rowIndex)
    setColumnFocus(columnIndex)
  }

  const correctWord = () => {
    setValue(word)
    ref.current?.focus()
  }

  return (
    <>
      <StyledInput
        ref={ref}
        type="text"
        onKeyDown={checkWord}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={handleFocus}
        showedColumns={showColumnInputs}
        columnIndex={columnIndex}
        correctTyped={correctTyped}
        isWrong={isWrong}
      />
      <Icon
        showedColumns={showColumnInputs}
        columnIndex={columnIndex}
        correctTyped={correctTyped}
        onClick={correctWord}
      >
        <FaEye color="rgb(190, 48, 48)" title="See correct word" size={18} />
      </Icon>
    </>
  )
}
