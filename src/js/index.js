import '../scss/styles.scss'

// Capturar la tabla y palabras
const containerTable = document.getElementById('container-table')
const parent = containerTable.querySelector('tbody')
const allWords = Array.from(containerTable.querySelectorAll('.container-table__word'))
const fragment = document.createDocumentFragment()
const englishWord = document.getElementById('english-word')
const spanishWord = document.getElementById('spanish-word')
const count = englishWord.parentElement.childElementCount - 1

const start = child => {
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

if (englishWord && spanishWord) {
  
  // Si se hace click en English
  englishWord.addEventListener('click', () => {
    start(0)
  })
  
  // Si se hace click en Spanish
  spanishWord.addEventListener('click', () => {
    start(count)
  })
}
