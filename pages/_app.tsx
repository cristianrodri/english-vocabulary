import { AppProps } from 'next/app'
import React, { createContext, useState } from 'react'
import '../styles/styles.css'

interface IContext {
  showColumnInputs: number
  showInputs: (column: number) => void
}

const contextDefaultValues: IContext = {
  showColumnInputs: -1,
  showInputs: () => {}
}

const GlobalContext = createContext<IContext>(contextDefaultValues)

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [showColumnInputs, setShowColumnInput] = useState<number>(-1)

  const showInputs = (columnIndex: number) => {
    setShowColumnInput(columnIndex)
  }

  return (
    <GlobalContext.Provider value={{ showColumnInputs, showInputs }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

export default MyApp
