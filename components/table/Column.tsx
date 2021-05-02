import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../pages/[type]'

interface Props {
  word: string
  columnIndex: number
  rowIndex: number
}

interface InputProps {
  showedColumns: number
  correctTyped: boolean
}

const Td = styled.td`
  position: relative;
  padding: 0.5em;
  transition: all 0.5s;
  cursor: pointer;
`

const Input = styled.input<InputProps & Omit<Props, 'word' | 'rowIndex'>>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  border: 0;
  text-align: center;
  font-size: 1rem;
  display: ${(props) =>
    props.showedColumns === props.columnIndex && !props.correctTyped
      ? 'block'
      : 'none'};
`

export const Column = ({ word, columnIndex, rowIndex }: Props) => {
  const { showColumnInputs, words } = useContext(GlobalContext)
  const [value, setValue] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const [correctTyped, setCorrectTyped] = useState(false)

  useEffect(() => {
    if (rowIndex === 0 && showColumnInputs === columnIndex && !correctTyped)
      ref.current?.focus()
    setCorrectTyped(false)
    setValue('')
  }, [showColumnInputs])

  const handleTranslation = () => {
    // console.log('row', rowIndex)
    // console.log('column', columnIndex)
  }

  const checkWord = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // check if word is correct
      // console.log(words[rowIndex])
      // console.log(words[rowIndex].split('='))

      if (value === words[rowIndex].split('=')[columnIndex]) {
        console.log('Correct')
        setCorrectTyped(true)
      } else {
        console.log('Incorrect')
      }
    }
  }

  return (
    <Td onClick={handleTranslation}>
      {word}
      <Input
        ref={ref}
        type="text"
        onKeyDown={checkWord}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        showedColumns={showColumnInputs}
        columnIndex={columnIndex}
        correctTyped={correctTyped}
      />
    </Td>
  )
}
