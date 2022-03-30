import { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext, IContext } from '../../context/GlobalContext'

const Row = styled.tr`
  background-color: var(--third-color);
`

const ColumnHeader = styled.th`
  padding: 0.3em;
  font-weight: 700;
  color: hsl(0, 15%, 94%);

  @media screen and (max-width: 680px) {
    font-size: 0.9em;
  }
`

export const Header = () => {
  const { langColumns } = useContext(GlobalContext) as IContext

  return (
    <thead>
      <Row>
        {langColumns.map(columnName => (
          <ColumnHeader key={columnName}>{columnName}</ColumnHeader>
        ))}
      </Row>
    </thead>
  )
}
