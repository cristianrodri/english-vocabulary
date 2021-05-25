// import { VocabularyTypes } from '../../pages/[type]'
// import vocabulary from '../../../public/vocabulary.json'
import { useContext } from 'react'
import styled from 'styled-components'
import { GlobalContext, IContext } from '../../context/GlobalContext'

// interface Props {
//   title: string
// }

// type PartialTitles = { [P in keyof typeof vocabulary.types]?: string }
// type PartialElement = { [P in keyof typeof vocabulary.types]?: JSX.Element }

const Row = styled.tr`
  background-color: var(--third-color);
`

const ColumnHeader = styled.th`
  padding: 0.3em;
  font-weight: 700;
  color: hsl(0, 15%, 94%);
`

export const Header = () => {
  const { columnNames } = useContext(GlobalContext) as IContext
  // const firstTheadTitles: PartialTitles = {
  //   numbers: 'Number'
  // }

  // const lastTheadTitles: PartialTitles = {
  //   alphabet: 'Pronuntiation',
  //   numbers: 'English'
  // }

  // const past = <ColumnHeader>Past</ColumnHeader>

  // const pastAndParticiple = (
  //   <>
  //     <ColumnHeader>Past</ColumnHeader>
  //     <ColumnHeader>Participle</ColumnHeader>
  //   </>
  // )
  // const checkPastAndParticiple: PartialElement = {
  //   'regular-verbs': past,
  //   'irregular-verbs': pastAndParticiple,
  //   'common-verbs': pastAndParticiple
  // }

  // const firstThead = firstTheadTitles?.[title] ?? 'English' // if the title is 'numbers' the first column of th will be 'Number', otherwise will be 'English'

  // const lastThead = lastTheadTitles?.[title] ?? 'Spanish'

  // const addPastParticiple = checkPastAndParticiple?.[title] ?? null
  return (
    <thead>
      <Row>
        {columnNames.map(columnName => (
          <ColumnHeader key={columnName}>{columnName}</ColumnHeader>
        ))}
      </Row>
    </thead>
  )
}
