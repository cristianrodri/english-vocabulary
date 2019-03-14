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

const speaks = voices => {
  const allWords = Array.from(document.querySelectorAll('.container-table__word'))

  allWords.forEach(word => {
    const engWord = word.firstChild.textContent
    const esWord = word.lastChild.textContent

    let synth = window.speechSynthesis

    // English word
    let wordEng = new SpeechSynthesisUtterance(engWord)
    wordEng.voice = voices[4]
    synth.speak(wordEng)
    wordEng.addEventListener('start', e => {
      word.classList.add('u-scaleUp')
    })

    // Spanish word
    let wordEs = new SpeechSynthesisUtterance(esWord)
    wordEs.lang = 'es-ES'
    wordEs.voice = voices[8]
    synth.speak(wordEs)
    wordEs.addEventListener('end', e => {
      word.classList.remove('u-scaleUp')
    })
  })
}

const printVoicesList = e => {
  e.preventDefault()
  let getAllVoices = getVoice()

  getAllVoices.then(resolve => {
    console.log(resolve)
    speaks(resolve)
  })
}

const hearVocabulary = () => {
  const containerTable = document.querySelector('.table-cont')

  // Speech synthesis supported by the browser and it's a vocabulary page
  if ('speechSynthesis' in window && containerTable) {
    const button = document.createElement('button')
    button.id = 'hear-vocabulary'
    button.classList.add('u-button')
    button.textContent = 'Hear Vocabulary'

    // Table container
    containerTable.insertAdjacentElement('beforebegin', button)

    button.addEventListener('click', printVoicesList)
  }
}

export default hearVocabulary
