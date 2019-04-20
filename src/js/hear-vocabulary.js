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

const hearEnglish = (children, synth, containerWord, voices) => {
  // console.log(children)

  children.some((child, i, arr) => {

    if (i < arr.length - 1) {
      // English word
      let wordEng = new SpeechSynthesisUtterance(child.textContent)
      wordEng.voice = voices[4]
      synth.speak(wordEng)
      wordEng.addEventListener('start', e => {
        containerWord.classList.add('u-scaleUp')
      })
      if (i === 0) {
      }
    } else {
      return true
    }
  })
}

const speaks = voices => {
  const allWords = Array.from(document.querySelectorAll('.container-table__word'))
  // console.log(allWords[0].children)

  allWords.map(containerWord => {
    const children = Array.from(containerWord.children)
    const esWord = containerWord.lastChild

    let synth = window.speechSynthesis

    // English word
    if (children.length > 2) {
      hearEnglish(children, synth, containerWord, voices)
    } else {
      const engWord = containerWord.firstChild
      let wordEng = new SpeechSynthesisUtterance(engWord.textContent)
      wordEng.voice = voices[4]
      synth.speak(wordEng)
      wordEng.addEventListener('start', e => {
        containerWord.classList.add('u-scaleUp')
      })
    }

    // Spanish word
    let wordEs = new SpeechSynthesisUtterance(esWord.textContent)
    wordEs.lang = 'es-ES'
    wordEs.voice = voices[8]
    synth.speak(wordEs)
    wordEs.addEventListener('end', e => {
      containerWord.classList.remove('u-scaleUp')
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
