import { VocabularyTypes } from '../../pages/[type]'
import vocabulary from '../../public/vocabulary.json'

interface Props {
  title: VocabularyTypes
}

type PartialTitles = { [P in keyof typeof vocabulary.types]?: string }
type PartialElement = { [P in keyof typeof vocabulary.types]?: JSX.Element }

export const Header = ({ title }: Props) => {
  const firstTheadTitles: PartialTitles = {
    numbers: 'Number',
  }

  const lastTheadTitles: PartialTitles = {
    alphabet: 'Pronuntiation',
    numbers: 'English',
  }

  const past = <th>Past</th>

  const pastAndParticiple = (
    <>
      <th>Past</th>
      <th>Participle</th>
    </>
  )
  const checkPastAndParticiple: PartialElement = {
    'regular-verbs': past,
    'irregular-verbs': pastAndParticiple,
    'common-verbs': pastAndParticiple,
  }

  const firstThead = firstTheadTitles?.[title] ?? 'English' // if the title is 'numbers' the first column of th will be 'Number', otherwise will be 'English'

  const lastThead = lastTheadTitles?.[title] ?? 'Spanish'

  const addPastParticiple = checkPastAndParticiple?.[title] ?? null
  return (
    <thead>
      <tr>
        <th>{firstThead}</th>
        {addPastParticiple}
        <th>{lastThead}</th>
      </tr>
    </thead>
  )
}
