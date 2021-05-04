import { useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { GlobalContext } from '../../pages/[type]'

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
  const { showInputs } = useContext(GlobalContext)
  const router = useRouter()
  const pathname = router.query.type
  const isNumbers = pathname === 'numbers'
  const isAlphabet = pathname === 'alphabet'
  const isIrregularAndCommonVerbs =
    pathname === 'common-verbs' || pathname === 'irregular-verbs'
  const isRegularVerbs = pathname === 'regular-verbs'
  let englishArr: number[]
  let spanishArr: number[]

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

  const handlePractice = (columnIndex: number[]) => () => {
    showInputs(columnIndex)
  }

  return (
    <Container>
      {!isAlphabet && (
        <Practice>
          <Button onClick={handlePractice(englishArr)}>
            Practice {isNumbers ? 'Numbers' : 'English'}
          </Button>
          <Button onClick={handlePractice(spanishArr)}>
            Practice {isNumbers ? 'Number word' : 'Spanish'}
          </Button>
        </Practice>
      )}
      <Button>Filter not learned words</Button>
    </Container>
  )
}
