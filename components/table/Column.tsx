import styled from 'styled-components'

interface Props {
  word: string
  columnIndex: number
}

const Td = styled.td`
  padding: 0.5em;
  transition: all 0.5s;
  cursor: pointer;
`

export const Column = ({ word, columnIndex }: Props) => {
  const handleTranslation = () => {
    console.log(columnIndex)
  }

  return <Td onClick={handleTranslation}>{word}</Td>
}
