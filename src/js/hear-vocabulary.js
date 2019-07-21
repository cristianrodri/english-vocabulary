const getVoice = () => {
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

const hearEnglish = (children, synth, voices) => {

  children.some((child, i, arr) => {

    if (i < arr.length - 1) {
      // English word
      let wordEng = new SpeechSynthesisUtterance(child.textContent)
      wordEng.voice = voices[4]
      synth.speak(wordEng)
    } else {
      return true
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
      // hearEnglish(children, synth, voices)
    } else {
    }
    const engWord = containerWord.firstChild
    let wordEng = new SpeechSynthesisUtterance(engWord.textContent)
    wordEng.voice = voices[4]
    synth.speak(wordEng)

    wordEng.addEventListener('start', e => {
      title.textContent = `${engWord.textContent} - ${esWord.textContent}`
    })

    // Spanish word
    let wordEs = new SpeechSynthesisUtterance(esWord.textContent)
    wordEs.lang = 'es-ES'
    wordEs.voice = voices[8]
    synth.speak(wordEs)
  }
}

const printVoicesList = async e => {
  e.preventDefault()
  let getAllVoices = await getVoice()

  console.log(getAllVoices)
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
    button.setAttribute('title', 'Hear All')
    // button.textContent = 'Hear Vocabulary'

    // Table container
    header.insertAdjacentElement('beforeend', button)

    button.addEventListener('click', printVoicesList)
  }
}
