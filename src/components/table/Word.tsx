import { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext, IContext } from '../../context/GlobalContext'
import { splittedWords } from '../../utils/strings'

interface Props {
  word: string
  columnIndex: number
}

const Styled = styled.span`
  position: relative;
  display: block;
  width: 100%;
  padding: 0.5em;
`

export const Word = ({ word, columnIndex }: Props) => {
  const { words } = useContext(GlobalContext) as IContext

  const handleClick = () => {
    if (!window.speechSynthesis) return

    const columnLength = splittedWords(words[0]).length
    const utterance = new SpeechSynthesisUtterance(word)

    if (columnLength - columnIndex > 1) {
      speechSynthesis.speak(utterance)
    } else {
      const synth = speechSynthesis
      utterance.voice = synth.getVoices()[0]
      synth.speak(utterance)
    }
  }

  return <Styled onClick={handleClick}>{word}</Styled>
}
