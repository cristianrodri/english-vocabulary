import { useRouter } from 'next/router'
import { FC, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GlobalContext, IContext } from '../../context/GlobalContext'
import { getWordsStorage } from '../../utils/storage'

interface Props {
  rowIndex: number
}

const SavedStyled = styled.span<{ isSaved: boolean }>`
  --left: -40px;
  --width: 35px;

  position: absolute;
  top: 0;
  left: var(--left);
  display: block;
  width: var(--width);
  height: 100%;
  cursor: pointer;
  background-color: ${props =>
    props.isSaved ? 'var(--third-color)' : 'var(--fourth-color)'};

  @media screen and (max-width: 680px) {
    --left: -35px;
    --width: 30px;
  }
`

export const Saved: FC<Props> = ({ rowIndex }) => {
  const { words } = useContext(GlobalContext) as IContext
  const router = useRouter()
  const pathname = router.query.type as string
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const prevStorage = getWordsStorage(pathname)

    if (prevStorage.includes(words[rowIndex].join('='))) setIsSaved(true)
  }, [])

  const handleClick = () => {
    const prevStorage = getWordsStorage(pathname)

    // if the words is saved, delete from localStorage, otherwise add it
    if (isSaved) {
      // if the length of saved words is equal to one, remove the localStorage pathname. Otherwise, just delete the word
      if (prevStorage.length === 1) {
        localStorage.removeItem(pathname)
      } else {
        const newStorage = prevStorage.filter(
          word => word !== words[rowIndex].join('=')
        )

        localStorage.setItem(pathname, JSON.stringify(newStorage))
      }
    } else {
      localStorage.setItem(
        pathname,
        JSON.stringify([...prevStorage, words[rowIndex].join('=')])
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
