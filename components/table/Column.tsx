import styled from 'styled-components'
import { Input } from './Input'

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

export const Column = ({ word, columnIndex, rowIndex }: ColumnProps) => {
  const handleTranslation = () => {
    console.log(word)
  }

  return (
    <Td onClick={handleTranslation}>
      <span>{word}</span>
      <Input word={word} rowIndex={rowIndex} columnIndex={columnIndex} />
    </Td>
  )
}
