import { GlobalContext } from '@context/GlobalContext'
import { useDataPractice } from '@custom-hooks/useDataPractice'
import { useContext } from 'react'
import Select, { SingleValue } from 'react-select'
import styled from 'styled-components'

type Option = {
  value: number
  label: string
}

const Container = styled.div`
  width: 400px;
  margin: auto;
  margin-bottom: 1rem;
`

export const PracticeWordNum = () => {
  const { setWordsToPractice } = useContext(GlobalContext)
  const { calculatedDataLength } = useDataPractice()

  const options: Option[] = []

  Array.from({
    length: Math.floor(calculatedDataLength / 10)
  }).forEach((_, i) => {
    const option = {
      value: (i + 1) * 10,
      label: `${(i + 1) * 10}`
    }

    options.push(option)
  })

  const handlechange = (newValue: SingleValue<Option>) => {
    setWordsToPractice(newValue?.value as number)
  }

  return (
    <Container>
      <Select
        id="practice-word-number"
        instanceId="practice-word-number"
        options={options}
        defaultValue={options[0]}
        onChange={handlechange}
      />
    </Container>
  )
}
