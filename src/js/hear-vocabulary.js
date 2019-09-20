const getAPIVoices = () => {
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
    const isNumbersPage = title.textContent === 'Numbers'

    let synth = window.speechSynthesis

    // English word
    if (children.length > 2) {

      for (const [index, child] of children.entries()) {

        // break this loop when index is the last iteration because the content is spanish word
        if (index === children.length - 1) break

        let wordEng = new SpeechSynthesisUtterance(child.textContent)
        wordEng.voice = voices[4]
        synth.speak(wordEng)

        if (index === 0) {
          wordEng.addEventListener('start', e => {
            title.textContent = `${children[0].textContent} - ${children[1].textContent}${children.length === 4 ? ' - ' + children[2].textContent : ''} - ${esWord.textContent}`

            containerWord.classList.add('u-active-table')
          })
        }

      }
    } else {
      // engWord listen the right side of the table whether is the numbers page
      const engWord = containerWord.firstChild

      // when the numbers page is shown, listen the right side of the table (var called esWord)
      let wordEng = new SpeechSynthesisUtterance(isNumbersPage ? esWord.textContent : engWord.textContent)
      wordEng.voice = voices[4]
      synth.speak(wordEng)

      wordEng.addEventListener('start', e => {
        title.textContent = `${engWord.textContent} - ${esWord.textContent}`
        containerWord.classList.add('u-active-table')
      })

      // It's not necessary to listen spanish translation with numbers
      if (isNumbersPage) {
        wordEng.addEventListener('end', e => {
          containerWord.classList.remove('u-active-table')
        })
        continue
      }
    }

    // Spanish word
    let wordEs = new SpeechSynthesisUtterance(esWord.textContent)
    wordEs.lang = 'es-ES'
    wordEs.voice = voices[8]
    synth.speak(wordEs)

    wordEs.addEventListener('end', e => {
      containerWord.classList.remove('u-active-table')
    })
  }
}

const printVoicesList = async e => {
  e.preventDefault()

  // Remove listen button after to be clicked
  e.target.parentElement.removeChild(e.target)

  let getAllVoices = await getAPIVoices()

  speaks(getAllVoices)
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
  }
}
