import React from 'react'
import styled from 'styled-components'
import { Input } from './Input'
import { Saved } from './Saved'
import { Word } from './Word'

export interface ColumnProps {
  word: string
  columnIndex: number
  rowIndex: number
}

const Td = styled.td`
  position: relative;
  transition: all 0.5s;
  cursor: pointer;
`

export const Column = ({ word, columnIndex, rowIndex }: ColumnProps) => (
  <Td>
    {columnIndex === 0 && <Saved rowIndex={rowIndex} />}
    <Word word={word} columnIndex={columnIndex} />
    <Input word={word} rowIndex={rowIndex} columnIndex={columnIndex} />
  </Td>
)
