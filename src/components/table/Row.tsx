import styled from 'styled-components'
import { Column } from './Column'

interface Props {
  eachWord: string[]
  rowIndex: number
}

const Tr = styled.tr`
  --bg-color: #131413;
  color: white;
  font-size: var(--little-big);
  background-color: var(--bg-color);
  transition: all 0.5s;
  &:hover {
    --bg-color: hsl(120, 11%, 4%);
  }
`

export const Row = ({ eachWord, rowIndex }: Props) => (
  <Tr>
    {eachWord.map((word, i) => (
      <Column key={word} word={word} columnIndex={i} rowIndex={rowIndex} />
    ))}
  </Tr>
)
