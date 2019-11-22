const changeUI = (lang, opposite) => {
  const words = document.querySelectorAll(`.${lang}-word`)
  const wordsOpposite = document.querySelectorAll(`.${opposite}-word`)

  // remove input and emoji button from the opposite language where the user clicked
  wordsOpposite.forEach(word => {
    const child = word.firstElementChild
    const last = word.lastElementChild
    child.classList.remove('show-input')
    last.classList.remove('show-input')
  })

  // show input and emoji button in the vocabulary where the user clicked
  words.forEach(word => {
    const child = word.firstElementChild
    const last = word.lastElementChild
    child.classList.add('show-input')
    last.classList.add('show-input')
  })

  // focus the first shown input of the page
  const shownInput = document.querySelector('.show-input')
  shownInput.focus()
  shownInput.parentElement.parentElement.classList.add('container-focused')

  // check the input if word is correct
  checkVocabulary(lang)
}

const checkVocabulary = lang => {

  const allShownInputs = document.querySelectorAll('.show-input')

  // add and remove background when input is focused and blurred respectively
  allShownInputs.forEach(input => {
    input.addEventListener('focus', e => {
      e.target.parentElement.parentElement.classList.add('container-focused')
    })

    input.addEventListener('blur', e => {
      e.target.parentElement.parentElement.classList.remove('container-focused')
    })
  })

  const table = document.getElementById('container-table')

  table.addEventListener('click', e => {

    // when emoji button is clicked the answer word is shown
    if (e.target.className.includes('word-answer')) {
      const answerText = e.target.parentElement.childNodes[0].textContent
      e.target.previousElementSibling.value = answerText.toLowerCase()
      e.target.previousElementSibling.focus()
      e.target.previousElementSibling.classList.remove('add-focus-error')
    }
  })

  document.addEventListener('keydown', e => {

    // enter the input and check is value is equal to the word in the table
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {

      const word = e.target.parentElement.childNodes[0].textContent.toLowerCase()
      const value = e.target.value

      // input value is correct
      if (word === value) {
        e.target.classList.remove('show-input')
        e.target.nextElementSibling.classList.remove('show-input')

        const firstInputOfThePage = document.querySelectorAll('.show-input')[0]

        // The page has more than one english translation
        const hasMoreThanOneEnglishTranslation = e.path[2].children

        // english translation has more than 1 word ("eng" and "es" have more than 2 words by column) && practice is in english && the next input is shown
        if (hasMoreThanOneEnglishTranslation.length > 2 && lang === 'eng' && e.target.parentElement.nextElementSibling.children[0].className.includes('show-input')) {
          const nextInputSibling = e.target.parentElement.nextElementSibling.children[0]

          // if next input is shown, focus it. Otherwise focus the first shown input of the page
          nextInputSibling.className.includes('show-input')
            ? nextInputSibling.focus()
            : firstInputOfThePage.focus()

        // otherwise is spanish practice or the table only has 2 columns and check has next sibling container
        } else if (e.path[2].nextElementSibling) { // the container-table__word has sibling
          const nextInput = e.path[2].nextElementSibling.querySelector('.show-input')

          // if next input is shown, focus it. Otherwise focus the first shown input of the page
          nextInput
            ? nextInput.focus()
            : firstInputOfThePage.focus()

        } else {
          // otherwise is the last shown input of the page and after will focus the first shown input
          if (firstInputOfThePage) firstInputOfThePage.focus()
        }

      } else {
        e.target.classList.add('add-focus-error')
      }
    }

    if (e.key === 'Escape' && e.target.tagName === 'INPUT') {
      e.target.value = ''
      e.target.classList.remove('add-focus-error')
    }
  })
}

export const practice = () => {
  const english = document.querySelector('.practice-english')
  const spanish = document.querySelector('.practice-spanish')

  // check if the web page is a table vocabulary
  if (english || spanish) {
    english.addEventListener('click', e => { changeUI('eng', 'es') })
    spanish.addEventListener('click', e => { changeUI('es', 'eng') })
  } else {
    return
  }

}