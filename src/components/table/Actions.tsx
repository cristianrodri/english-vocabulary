import { useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { getWordsStorage } from '../../utils/storage'
import { GlobalContext, IContext } from '../../context/GlobalContext'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
`

const Practice = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const Button = styled.button`
  padding-bottom: 0.1rem;
  cursor: pointer;
  background-color: transparent;
  font-size: var(--base);
  color: #fff;
  outline: none;
  border: none;
  border-bottom: 1px solid currentColor;
  letter-spacing: 1px;
  transition: all 0.3s;
  &:hover {
    color: var(--secondary-color);
  }
`

export const Actions = () => {
  const { words, showInputs, setColumnFocus, setWords } = useContext(
    GlobalContext
  ) as IContext
  const router = useRouter()
  const pathname = router.query.type as string
  const isNumbers = pathname === 'numbers'
  const isAlphabet = pathname === 'alphabet'
  const isIrregularAndCommonVerbs =
    pathname === 'common-verbs' || pathname === 'irregular-verbs'
  const isRegularVerbs = pathname === 'regular-verbs'
  let englishArr: number[]
  let spanishArr: number[]
  let columnFocus: number

  if (isIrregularAndCommonVerbs) {
    englishArr = [0, 1, 2]
    spanishArr = [3]
  } else if (isRegularVerbs) {
    englishArr = [0, 1]
    spanishArr = [2]
  } else {
    englishArr = [0]
    spanishArr = [1]
  }

  const handlePractice = (lang: 'english' | 'spanish') => () => {
    if (lang === 'english') {
      showInputs(englishArr)
      columnFocus = 0
    } else {
      showInputs(spanishArr)

      isIrregularAndCommonVerbs
        ? (columnFocus = 3)
        : isRegularVerbs
        ? (columnFocus = 2)
        : (columnFocus = 1)
    }

    setColumnFocus(columnFocus)
  }

  const handleFiltered = () => {
    const getStorage = getWordsStorage(pathname)

    // filter words by NOT learned yet (by checking if exists in localStorage)
    const filteredWords = words.filter(word => getStorage.includes(word[0]))

    setWords(filteredWords)
  }

  return (
    <Container>
      {!isAlphabet && (
        <Practice>
          <Button onClick={handlePractice('english')}>
            Practice {isNumbers ? 'Numbers' : 'English'}
          </Button>
          <Button onClick={handlePractice('spanish')}>
            Practice {isNumbers ? 'Number word' : 'Spanish'}
          </Button>
        </Practice>
      )}
      <Button onClick={handleFiltered}>Filter not learned words</Button>
    </Container>
  )
}
