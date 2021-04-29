import styled from 'styled-components'

interface Props {
  word: string
  columnIndex: number
}

const Td = styled.td`
  position: relative;
  padding: 0.5em;
  transition: all 0.5s;
  cursor: pointer;
`

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  border: 0;
  text-align: center;
  font-size: 1rem;
  display: none;
`

export const Column = ({ word, columnIndex }: Props) => {
  const handleTranslation = () => {
    console.log(columnIndex)
  }

  const checkWord = () => {}

  return (
    <Td onClick={handleTranslation}>
      {word}
      <Input type="text" onKeyDown={checkWord} />
    </Td>
  )
}
