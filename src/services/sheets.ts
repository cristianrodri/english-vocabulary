interface RowData {
  c: { v: string | number }[]
}

export const getSheetNames = async () => {
  const data = await getSheetData('sheetNames')

  const titles = data.slice(1).flat().sort() as string[]

  return titles
}

export const getSheetData = async (
  sheetName: string,
  isGetStaticProps?: boolean
) => {
  const url = `https://docs.google.com/spreadsheets/d/1-Hq4oMd6J1qhcCvbS0ZiUdrbrzuvfKLiameA2dDXcL8/gviz/tq?sheet=${sheetName}`

  const res = await fetch(url)
  const respData = await res.text()
  const data = JSON.parse(respData.substring(47).slice(0, -2))

  // If the first row has less than 2 cells, it means that the sheet name which comes from parameter doesn't exist
  if (data.table.rows[0].c.length < 2 && isGetStaticProps) {
    return false
  }

  const words = data.table.rows.map((row: RowData) => {
    return row.c.map(cell => cell.v.toString())
  })

  return words
}
