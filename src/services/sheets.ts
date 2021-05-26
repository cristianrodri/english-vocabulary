import Tabletop from 'tabletop'

const getSheet = async (sheetName: string) => {
  const data = await Tabletop.init({
    key: process.env.SHEET_ID,
    wanted: [sheetName]
  })

  return data
}

export const getSheetNames = async (): Promise<string[]> => {
  // get all sheets names by calling only alphabet sheet (this make load faster, instead of getting all sheets data)
  const SHEET_NAME = 'alphabet'
  const data = await getSheet(SHEET_NAME)
  const titles = data[SHEET_NAME].tabletop.foundSheetNames

  return titles
}

export const getSheetData = async (pathname: string) => {
  const data = await getSheet(pathname)
  const columnNames: string[] = data[pathname].columnNames
  const words: string[] = data[
    pathname
  ].elements.map((word: { [key: string]: string }) =>
    Object.values(word).join()
  )

  return {
    columnNames,
    words
  }
}
