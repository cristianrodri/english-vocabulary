import { GlobalContext } from '@context/GlobalContext'
import { shuffleArray } from '@utils/arrays'
import { useContext, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import styled from 'styled-components'

type Option = {
  value: number | 'all'
  label: string
}

const Container = styled.div`
  width: 400px;
  margin: auto;
`

export const PracticeWord = () => {
  const { originalData, wordsToPractice, setWords } = useContext(GlobalContext)

  const options: Option[] = []

  Array.from({
    length: Math.ceil(originalData.length / wordsToPractice)
  }).forEach((_, i, arr) => {
    const option = {
      value: i,
      label: `${1 + wordsToPractice * i}-${
        i === arr.length - 1 ? originalData.length : wordsToPractice * (i + 1)
      }`
    }

    options.push(option)
  })

  options.push({ value: 'all', label: 'All' })

  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(
    options[0]
  )

  const handleChange = (newValue: SingleValue<Option>) => {
    const dataToPractice =
      newValue?.value === 'all'
        ? shuffleArray(originalData)
        : shuffleArray(
            originalData.slice(
              (newValue?.value as number) * wordsToPractice,
              ((newValue?.value as number) + 1) * wordsToPractice
            )
          )

    setWords(dataToPractice)

    setSelectedOption(newValue)
  }

  return (
    <Container>
      <Select
        id="practice-word"
        instanceId="practice-word"
        options={options}
        // defaultValue={options[0]}
        value={selectedOption}
        onChange={handleChange}
      />
    </Container>
  )
}
