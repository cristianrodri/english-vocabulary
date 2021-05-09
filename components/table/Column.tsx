import React from 'react'
import styled from 'styled-components'
import { Input } from './Input'
import { Saved } from './Saved'

export interface ColumnProps {
  word: string
  columnIndex: number
  rowIndex: number
}

const Td = styled.td`
  position: relative;
  padding: 0.5em;
  transition: all 0.5s;
  cursor: pointer;
`

const Word = styled.span`
  position: relative;
  display: block;
  width: 100%;
`

export const Column = ({ word, columnIndex, rowIndex }: ColumnProps) => {
  const handleTranslation = () => {
    // console.log(word)
  }

  return (
    <Td onClick={handleTranslation}>
      {columnIndex === 0 && <Saved rowIndex={rowIndex} />}
      <Word>{word}</Word>
      <Input word={word} rowIndex={rowIndex} columnIndex={columnIndex} />
    </Td>
  )
}
