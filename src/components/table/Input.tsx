import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import styled from 'styled-components'
import { ColumnProps } from './Column'
import { GlobalContext } from '../../context/GlobalContext'
import {
  speechSynthesisEng,
  speechSynthesisSpa
} from '../../utils/speechSynthesis'

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
  padding: 0.5em;
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

  useEffect(() => {
    setCorrectTyped(false)
    setValue('')
    setRowFocus(0)
  }, [showColumnInputs])

  useEffect(() => {
    // Show focus to input if rowIndex is equal to rowFocus, the same with columnIndex and columnFocus, the columnIndex is included into showColumnInputs global context array
    if (
      rowIndex === rowFocus &&
      columnIndex === columnFocus &&
      showColumnInputs.includes(columnIndex) &&
      !correctTyped
    )
      ref.current?.focus()
  }, [rowFocus, columnFocus, showColumnInputs])

  const checkWord = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // check if word is correct
      const columnLength = words[rowIndex].length
      const correctWord = word.split('/')

      if (word === value || correctWord.includes(value.toLowerCase())) {
        setCorrectTyped(true)
        setIsWrong(false)

        // Focus the next column (used in verbs columns)
        if (columnLength - columnFocus > 2) {
          setColumnFocus(columnFocus + 1)

          // The column of the table belongs to ENG word, so english voice should be displayed
          speechSynthesisEng(word)
        } else if (columnFocus === columnLength - 1) {
          // The last input columns is showed, therefore it must focus the last column of next row
          setRowFocus(rowFocus + 1)
          setColumnFocus(columnLength - 1)

          // The column of the table belongs to SPA word, so spanish voice should be displayed
          speechSynthesisSpa(word)
        } else {
          // Focus first column of the next row
          setRowFocus(rowFocus + 1)
          setColumnFocus(0)

          // The column of the table belongs to ENG word, so english voice should be displayed
          speechSynthesisEng(word)
        }
      } else {
        setIsWrong(true)
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
        <FaEye
          color={isWrong ? '#fff' : 'rgb(190, 48, 48)'}
          title="See correct word"
          size={18}
        />
      </Icon>
    </>
  )
}
