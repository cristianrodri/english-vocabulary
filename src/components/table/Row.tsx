import styled from 'styled-components'
import { Column } from './Column'

interface Props {
  bothWords: string
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

export const Row = ({ bothWords, rowIndex }: Props) => (
  <Tr>
    {bothWords.split(/,|=/).map((word, i) => (
      <Column key={word + i} word={word} columnIndex={i} rowIndex={rowIndex} />
    ))}
  </Tr>
)
