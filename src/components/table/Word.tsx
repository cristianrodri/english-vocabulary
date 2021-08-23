import { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext, IContext } from '../../context/GlobalContext'

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
    if (!window.speechSynthesis) return

    const columnLength = words[0].length
    const utterance = new SpeechSynthesisUtterance(word)

    if (columnLength - columnIndex > 1) {
      speechSynthesis.speak(utterance)
    } else {
      const synth = speechSynthesis
      utterance.voice = synth.getVoices()[0]
      synth.speak(utterance)
    }
  }

  return (
    <Styled onClick={handleClick} columnLength={columnNames.length}>
      {word}
    </Styled>
  )
}
