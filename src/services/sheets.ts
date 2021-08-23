import { GoogleSpreadsheet } from 'google-spreadsheet'

interface SheetData {
  title: string
  columnNames: string[]
  words: string[][]
}

const getSheets = async (): Promise<GoogleSpreadsheet> => {
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID)

  const private_key = process.env.GOOGLE_PRIVATE_KEY as string

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
    private_key: private_key.replace(/\\n/g, '\n')
  })

  await doc.loadInfo()

  return doc
}

export const getSheetNames = async () => {
  const doc = await getSheets()

  // const docTitlesSheets = doc.sheetsByTitle
  const titles = Object.keys(doc.sheetsByTitle).sort()

  return titles
}

export const getSheetData = async (pathname: string) => {
  const doc = await getSheets()

  // Get individual sheet data
  const data = await doc.sheetsByTitle[pathname].getRows()

  const client: SheetData = {
    title: data[0]._sheet._rawProperties.title,
    columnNames: data[0]._sheet.headerValues,
    words: data.map(row => row._rawData)
  }

  return client
}
