import { GlobalContext } from '@context/GlobalContext'
import { shuffleArray } from '@utils/arrays'
import { useContext, useEffect, useMemo, useState } from 'react'
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

  const memoizedOptions = useMemo(() => {
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

    return options
  }, [wordsToPractice])

  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(
    null
  )

  useEffect(() => {
    // Reset Select option to null when wordsToPractice is changed
    handleChange(null)
  }, [wordsToPractice])

  const handleChange = (newValue: SingleValue<Option>) => {
    setSelectedOption(newValue)

    // Reset Select option to null when wordsToPractice is changed
    if (!newValue) {
      setWords(originalData)

      return
    }

    const dataToPractice =
      newValue?.value === 'all' || !newValue
        ? shuffleArray(originalData)
        : shuffleArray(
            originalData.slice(
              (newValue?.value as number) * wordsToPractice,
              ((newValue?.value as number) + 1) * wordsToPractice
            )
          )

    setWords(dataToPractice)
  }

  return (
    <Container>
      <Select
        id="practice-word"
        instanceId="practice-word"
        options={memoizedOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select words to practice..."
      />
    </Container>
  )
}
