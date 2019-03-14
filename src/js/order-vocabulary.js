// Capturar la tabla y palabras
const containerTable = document.getElementById('container-table')
const fragment = document.createDocumentFragment()
const englishWord = document.getElementById('english-word')
const spanishWord = document.getElementById('spanish-word')

const start = child => {
  const parent = containerTable.querySelector('tbody')
  const allWords = Array.from(containerTable.querySelectorAll('.container-table__word'))

  // Ordenamos las palabras que comiencen con a hasta la z
  allWords.sort((prev, next) => {
    let previous = prev.children[child].textContent
    let nextWord = next.children[child].textContent

    if (previous < nextWord) { return -1 }
    if (previous > nextWord) { return 1 }

    return 0
  })

  allWords.forEach(word => {
    // word.parentElement.appendChild(word)
    fragment.appendChild(word)
  })
  parent.appendChild(fragment)
}

const orderVocabulary = () => {
  if (englishWord && spanishWord) {
    const count = englishWord.parentElement.childElementCount - 1
    
    // Si se hace click en English
    englishWord.addEventListener('click', () => {
      start(0)
    })
    
    // Si se hace click en Spanish
    spanishWord.addEventListener('click', () => {
      start(count)
    })
  }
}

export default orderVocabulary
