import styled from 'styled-components'
import { Column } from './Column'

interface Props {
  bothWords: string
}

const Tr = styled.tr`
  --bg-color: hsla(120, 11%, 4%, 0.7);
  color: white;
  font-size: var(--little-big);
  background-color: var(--bg-color);
  transition: all 0.5s;
  &:hover {
    --bg-color: hsla(120, 11%, 4%, 1);
  }
`

export const Row = ({ bothWords }: Props) => {
  return (
    <Tr>
      {bothWords.split(/, |=/).map((word, i) => (
        <Column key={word} word={word} columnIndex={i} />
      ))}
    </Tr>
  )
}
