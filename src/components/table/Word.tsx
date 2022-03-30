import { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext, IContext } from '../../context/GlobalContext'
import {
  speechSynthesisEng,
  speechSynthesisSpa
} from '../../utils/speechSynthesis'

interface Props {
  word: string
  columnIndex: number
}

const Styled = styled.span<{ columnLength: number }>`
  position: relative;
  display: block;
  width: 100%;
  padding: 0.5em;
  font-size: ${({ columnLength }) => (columnLength > 2 ? '0.8em' : '0.9em')};
  word-break: break-all;

  @media screen and (min-width: 680px) {
    font-size: 1em;
  }
`

export const Word = ({ word, columnIndex }: Props) => {
  const { words, columnNames } = useContext(GlobalContext) as IContext

  const handleClick = () => {
    const columnLength = words[0].length

    // Check if the word is english (column length - columnIndex must be greater than 1)
    if (columnLength - columnIndex > 1) {
      speechSynthesisEng(word)
    } else {
      // Spanish voice
      speechSynthesisSpa(word)
    }
  }

  return (
    <Styled onClick={handleClick} columnLength={columnNames.length}>
      {word}
    </Styled>
  )
}
