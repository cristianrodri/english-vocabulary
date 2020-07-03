export const getAPIVoices = () => {
  return new Promise(resolve => {
    let voices = speechSynthesis.getVoices()
    if (voices.length) {
      resolve(voices)
      return
    }
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices()
      resolve(voices)
    }
  })
}

const speaks = voices => {
  const allWords = Array.from(document.querySelectorAll('.container-table__word'))
  const title = document.querySelector('.main-header__title')

  for (const containerWord of allWords) {
    const children = Array.from(containerWord.children)
    const esWord = containerWord.lastChild

    let synth = window.speechSynthesis

    // English word
    if (children.length > 2) {

      for (const [index, child] of children.entries()) {

        // break this loop when index is the last iteration because the content is spanish word
        if (index === children.length - 1) break

        let wordEng = new SpeechSynthesisUtterance(child.childNodes[0].textContent)
        wordEng.voice = voices[4]
        synth.speak(wordEng)

        if (index === 0) {
          wordEng.addEventListener('start', e => {
            title.textContent = `${children[0].childNodes[0].textContent} - ${children[1].childNodes[0].textContent}${children.length === 4 ? ' - ' + children[2].textContent : ''} - ${esWord.childNodes[0].textContent}`

            containerWord.classList.add('u-active-table')
          })
        }

      }
    } else {
      // engWord listen the right side of the table whether is the numbers page
      const engWord = containerWord.firstChild
      const isNumbersPage = title.textContent === 'Numbers'

      // when the numbers page is shown, listen the right side of the table (var called esWord)
      let wordEng = new SpeechSynthesisUtterance(isNumbersPage ? esWord.childNodes[0].textContent : engWord.childNodes[0].textContent)
      wordEng.voice = voices[1]
      wordEng.default = true
      synth.speak(wordEng)

      wordEng.addEventListener('start', e => {
        title.textContent = `${engWord.childNodes[0].textContent} - ${esWord.childNodes[0].textContent}`
        containerWord.classList.add('u-active-table')
      })

      // It's not necessary to listen spanish translation with numbers and alphabet
      if (isNumbersPage || title.textContent === 'Alphabet') {
        wordEng.addEventListener('end', e => {
          containerWord.classList.remove('u-active-table')
        })
        continue
      }
    }

    // Spanish word
    let wordEs = new SpeechSynthesisUtterance(esWord.childNodes[0].textContent)
    wordEs.lang = 'es-ES'
    wordEs.voice = voices[0]
    synth.speak(wordEs)

    wordEs.addEventListener('end', e => {
      containerWord.classList.remove('u-active-table')
    })
  }
}

const printVoicesList = async e => {
  e.preventDefault()

  // Remove listen icon after to be clicked
  e.target.parentElement.removeChild(e.target)

  const getAllVoices = await getAPIVoices()

  console.log(getAllVoices)

  // TEST
  // const note = document.querySelector('.note')

  // const printVoice = `
  //   <div>
  //     <h3>This device has ${getAllVoices.length} voices</h3>
  //     <ol>
  //       ${getAllVoices.map(voice => `<li>${voice.name} - ${voice.default.toString()}</li>`)}
  //     </ol>
  //   </div>
  // `

  // note.insertAdjacentHTML('beforebegin', printVoice)
  // END TEST

  speaks(getAllVoices)
}

const hearWord = async e => {
  e.preventDefault()

  // target is not eng-word or es-word classes
  if (!e.target.className.includes('-word')) return

  const voices = await getAPIVoices()
  const synth = window.speechSynthesis
  const title = document.querySelector('.main-header__title')
  const isNumberPage = title.textContent === 'Numbers'

  const word = new SpeechSynthesisUtterance(
    // if it's a numbers page, hear the sibling text
    isNumberPage
      ? e.target.nextElementSibling.childNodes[0].textContent
      : e.target.childNodes[0].textContent
  )

  let index = 0

  if (e.target.className === 'eng-word') index = 1
  if (e.target.className === 'es-word') word.lang = 'es-ES'

    word.voice = voices[index]
    synth.speak(word)
}

export const hearVocabulary = () => {
  const containerTable = document.querySelector('.table-cont')
  const header = document.querySelector('.main-header')

  // Speech synthesis supported by the browser and it's a vocabulary page
  if ('speechSynthesis' in window && containerTable) {
    const button = document.createElement('button')
    button.id = 'hear-vocabulary'
    button.classList.add('u-button')
    button.setAttribute('title', 'Listen All')

    // Table container
    header.insertAdjacentElement('beforeend', button)

    button.addEventListener('click', printVoicesList)

    containerTable.addEventListener('click', hearWord)
  }
}