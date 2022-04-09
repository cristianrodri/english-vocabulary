import { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '@context/GlobalContext'
import { capitalizedText } from '@utils/strings'

const Row = styled.tr`
  background-color: var(--third-color);
`

const ColumnHeader = styled.th<{ isFirstOrLastColumn: boolean }>`
  padding: 0.3em;
  font-weight: 700;
  color: var(--table-header-color);
  cursor: ${props => (props.isFirstOrLastColumn ? 'pointer' : 'initial')};

  @media screen and (max-width: 680px) {
    font-size: 0.9em;
  }
`

export const Header = () => {
  const { langColumns, words, setWords } = useContext(GlobalContext)

  const handleClick = (columnIndex: number) => () => {
    // When first or last header column is clicked, order the table by A-Z on the language that clicked header column belongs
    if (isFirstOrLastColumn(columnIndex)) {
      const sortedWordsAlphabetically = words.sort((a, b) =>
        a[columnIndex].toLowerCase() < b[columnIndex].toLowerCase() ? -1 : 1
      )

      setWords([...sortedWordsAlphabetically])
    }
  }

  // Check if header column belongs to first or last column of the header row
  const isFirstOrLastColumn = (columnIndex: number) =>
    columnIndex === 0 || columnIndex === langColumns.length - 1

  return (
    <thead>
      <Row>
        {langColumns.map((columnName, index) => (
          <ColumnHeader
            key={columnName}
            onClick={handleClick(index)}
            isFirstOrLastColumn={isFirstOrLastColumn(index)}
            title={isFirstOrLastColumn(index) ? 'Order by A-Z' : ''}
          >
            {capitalizedText(columnName)}
          </ColumnHeader>
        ))}
      </Row>
    </thead>
  )
}
