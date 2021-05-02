import { useContext } from 'react'
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

  const handlePractice = (columnIndex: number) => () => {
    showInputs(columnIndex)
  }
  return (
    <Container>
      <Practice>
        <Button onClick={handlePractice(0)}>Practice English</Button>
        <Button onClick={handlePractice(1)}>Practice Spanish</Button>
      </Practice>
      <Button>Filter not learned words</Button>
    </Container>
  )
}
