import { useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { filteredStorageWords, getWordsStorage } from '@utils/storage'
import { GlobalContext, WordToPracticeType } from '@context/GlobalContext'

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
  color: var(--action-button);
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
  const {
    originalData,
    words,
    showInputs,
    setColumnFocus,
    setWords,
    setWordsToPracticeType
  } = useContext(GlobalContext)
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
    // showInputs global array should have column 0, 1, 2 in english words and column 3 in spanish words
    englishArr = [0, 1, 2]
    spanishArr = [3]
  } else if (isRegularVerbs) {
    // showInputs global array should have column 0, 1 in english words and column 2 in spanish words
    englishArr = [0, 1]
    spanishArr = [2]
  } else {
    // showInputs global array should have column 0 in english words and column 1 in spanish words
    englishArr = [0]
    spanishArr = [1]
  }

  const handlePractice = (lang: 'english' | 'spanish') => () => {
    if (lang === 'english') {
      showInputs(englishArr)
      columnFocus = 0
    } else {
      showInputs(spanishArr)

      if (isIrregularAndCommonVerbs) columnFocus = 3
      else if (isRegularVerbs) columnFocus = 2
      else columnFocus = 1
    }

    setColumnFocus(columnFocus)
  }

  const handleFiltered = () => {
    const storage = getWordsStorage(pathname)

    // Filter words by NOT learned yet (by checking if it exists in localStorage)
    const filteredWords = filteredStorageWords(words, storage)

    if (filteredWords.length > 0) {
      setWordsToPracticeType(WordToPracticeType.FILTERED)
      setWords(filteredWords)
    }
  }

  // Print the table with original data
  const handleOriginal = () => {
    setWordsToPracticeType(WordToPracticeType.ORIGINAL)
    setWords([...originalData])
  }

  // Shuffle the table words
  const handleShuffle = () => {
    setWords([...words].sort(() => Math.random() - 0.5))
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
      <Button onClick={handleOriginal}>Original table</Button>
      <Button onClick={handleShuffle}>Shuffle table</Button>
    </Container>
  )
}
