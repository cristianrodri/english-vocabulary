import { useRouter } from 'next/router'
import { FC, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../../pages/[type]'
import { getWordsStorage } from '../../utils/storage'

const SavedStyled = styled.span<{ isSaved: boolean }>`
  position: absolute;
  top: 0;
  left: -40px;
  display: block;
  width: 35px;
  height: 100%;
  cursor: pointer;
  background-color: ${props =>
    props.isSaved ? 'var(--third-color)' : 'var(--fourth-color)'};
`

export const Saved: FC<{ rowIndex: number }> = ({ rowIndex }) => {
  const { words } = useContext(GlobalContext)
  const router = useRouter()
  const pathname = router.query.type as string
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const prevStorage = getWordsStorage(pathname)

    if (prevStorage.includes(words[rowIndex])) setIsSaved(true)
  }, [])

  const handleClick = () => {
    const prevStorage = getWordsStorage(pathname)

    // if the words is saved, delete from localStorage, otherwise add it
    if (isSaved) {
      // if the length of saved words is equal to one, remove the localStorage pathname. Otherwise, just delete the word
      if (prevStorage.length === 1) {
        localStorage.removeItem(pathname)
      } else {
        const newStorage = prevStorage.filter(word => word !== words[rowIndex])

        localStorage.setItem(pathname, JSON.stringify(newStorage))
      }
    } else {
      localStorage.setItem(
        pathname,
        JSON.stringify([...prevStorage, words[rowIndex]])
      )
    }

    // change status after add or delete words from localStorage
    setIsSaved(!isSaved)
  }

  return (
    <SavedStyled
      onClick={handleClick}
      isSaved={isSaved}
      title={isSaved ? 'Not learned yet' : 'Learned!'}
    ></SavedStyled>
  )
}
