import cheerio from 'cheerio'
import { NextApiRequest, NextApiResponse } from 'next'
import rq from 'request-promise'

const commaFormat = (selector: string) => `, ${selector}`

const getWord = (htmlString: string) =>
  htmlString.slice(0, htmlString.indexOf('<')).toLowerCase()

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const html = await rq('https://english-vocabulary-be783.firebaseapp.com/')
    const $ = cheerio.load(html)
    let urls: string[] = []
    const urlsDom = $('.main-card')

    urlsDom.each(function (i) {
      // const selector = this as string
      const url = $(this).children().attr('href')?.slice(1) as string
      urls[i] = url
    })

    const data = await Promise.all(
      urls.map(async url => {
        const html2 = await rq(
          `https://english-vocabulary-be783.firebaseapp.com/${url}`
        )
        const $2 = cheerio.load(html2)

        const allData = $2('tbody tr')
        let arrData: string[] = []

        allData.each(function (i) {
          const tr = $2(this).children().length
          const hasThree =
            tr === 3
              ? commaFormat(
                  getWord(
                    $2(this)
                      .children('td:nth-of-type(2)')
                      .html()
                      ?.toString() as string
                  )
                )
              : ''
          const hasFour =
            tr === 4
              ? `${commaFormat(
                  getWord(
                    $2(this)
                      .children('td:nth-of-type(2)')
                      .html()
                      ?.toString() as string
                  )
                )}${commaFormat(
                  getWord(
                    $2(this)
                      .children('td:nth-of-type(3)')
                      .html()
                      ?.toString() as string
                  )
                )}`
              : ''
          // console.log(tr)
          // const spa = $2(this).children('td:last-child').first().text()
          arrData[i] = `${getWord(
            $2(this).children('td:first-child').html()?.toString() as string
          )}${hasThree}${hasFour}=${getWord(
            $2(this).children('td:last-child').html()?.toString() as string
          )}`
        })

        return {
          [url.slice(0, url.indexOf('.html'))]: arrData.join(';')
        }
      })
    )

    console.log(data)

    const formattedData = data.reduce(
      (prev, curr) => ({
        ...prev,
        [Object.keys(curr)[0]]: Object.values(curr)[0]
      }),
      {}
    )
    console.log(formattedData)

    res.status(200).json({ types: formattedData })
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
