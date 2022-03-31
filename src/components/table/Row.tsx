import { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../context/GlobalContext'
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

export const Row = ({ eachWord, rowIndex }: Props) => {
  const { langColumns } = useContext(GlobalContext)
  return (
    <Tr>
      {/* Some columns may have the same word (regular verbs and other), so the key prop has the word + langColumn name */}
      {eachWord.map((word, i) => (
        <Column
          key={word + langColumns[i]}
          word={word}
          columnIndex={i}
          rowIndex={rowIndex}
        />
      ))}
    </Tr>
  )
}
