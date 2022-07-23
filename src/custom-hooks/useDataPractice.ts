import { GlobalContext, WordToPracticeType } from '@context/GlobalContext'
import { filteredStorageWords, getWordsStorage } from '@utils/storage'
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'

export const useDataPractice = () => {
  const { originalData, wordsToPracticeType, words } = useContext(GlobalContext)
  const router = useRouter()
  const pathname = router.query.type as string
  const [storageWords, setStorageWords] = useState<string[]>([])

  useEffect(() => {
    setStorageWords(getWordsStorage(pathname))
  }, [])

  const filteredWords = filteredStorageWords(originalData, storageWords)

  const calculatedDataLength =
    wordsToPracticeType === WordToPracticeType.ORIGINAL
      ? originalData.length
      : filteredWords.length

  // The data showed in the table when the user changes the numbers of words in select component. If the wordsToPracticeType is "original" the data showed is related to the original data, otherwise the data shown is related to the filtered data
  const wordsData =
    wordsToPracticeType === WordToPracticeType.ORIGINAL
      ? originalData
      : filteredWords

  return { calculatedDataLength, wordsData }
}
