import { VocabularyTypes } from '../../pages/[type]'
import vocabulary from '../../public/vocabulary.json'
import styled, { css } from 'styled-components'

interface Props {
  title: VocabularyTypes
}

type PartialTitles = { [P in keyof typeof vocabulary.types]?: string }
type PartialElement = { [P in keyof typeof vocabulary.types]?: JSX.Element }

const Row = styled.tr`
  background-color: var(--third-color);
`

const col = css`
  padding: 0.3em;
  font-weight: 700;
  color: hsl(0, 15%, 94%);
`

const Column = styled.td`
  ${col}
`

const ColumnHeader = styled.th`
  ${col}
`

export const Header = ({ title }: Props) => {
  const firstTheadTitles: PartialTitles = {
    numbers: 'Number'
  }

  const lastTheadTitles: PartialTitles = {
    alphabet: 'Pronuntiation',
    numbers: 'English'
  }

  const past = <ColumnHeader>Past</ColumnHeader>

  const pastAndParticiple = (
    <>
      <ColumnHeader>Past</ColumnHeader>
      <ColumnHeader>Participle</ColumnHeader>
    </>
  )
  const checkPastAndParticiple: PartialElement = {
    'regular-verbs': past,
    'irregular-verbs': pastAndParticiple,
    'common-verbs': pastAndParticiple
  }

  const firstThead = firstTheadTitles?.[title] ?? 'English' // if the title is 'numbers' the first column of th will be 'Number', otherwise will be 'English'

  const lastThead = lastTheadTitles?.[title] ?? 'Spanish'

  const addPastParticiple = checkPastAndParticiple?.[title] ?? null
  return (
    <thead>
      <Row>
        <Column>{firstThead}</Column>
        {addPastParticiple}
        <Column>{lastThead}</Column>
      </Row>
    </thead>
  )
}
