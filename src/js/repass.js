export const getSavedWords = () => {
  const pathname = location.pathname.slice(
    1,
    location.pathname.indexOf('.html')
  )
  const getSavedNotLearnedWords =
    JSON.parse(localStorage.getItem(pathname)) || []
  const allEngWords = document.querySelectorAll('tr td:first-child')

  if (allEngWords.length > 0) {
    allEngWords.forEach(eachEng => {
      const word = eachEng.firstChild.textContent.toLowerCase()
      const analyze = eachEng.querySelector('.analyze')

      if (getSavedNotLearnedWords.includes(word)) {
        analyze.classList.add('not-learned')
      }
    })
  }
}

export const repass = () => {
  const allCheckboxes = document.querySelectorAll('tr .analyze')
  const pathname = location.pathname.slice(
    1,
    location.pathname.indexOf('.html')
  )

  allCheckboxes.forEach(item => {
    item.addEventListener('click', e => {
      e.target.classList.toggle('not-learned')
      const isNotLearned = e.target.classList.contains('not-learned')
      const engWord = e.target.previousSibling.previousSibling.textContent.toLowerCase()
      const getSavedNotLearnedWords =
        JSON.parse(localStorage.getItem(pathname)) || []

      console.log(getSavedNotLearnedWords)

      const title = isNotLearned ? 'Not learned yet' : 'Learned'

      if (isNotLearned) {
        localStorage.setItem(
          pathname,
          JSON.stringify([...getSavedNotLearnedWords, engWord])
        )
      } else if (getSavedNotLearnedWords.length === 1) {
        localStorage.removeItem(pathname)
      } else {
        const deleteNotLearnedWords = getSavedNotLearnedWords.filter(
          word => word !== engWord
        )
        localStorage.setItem(pathname, JSON.stringify(deleteNotLearnedWords))
      }

      e.target.setAttribute('title', title)
    })
  })
}

export const filterWords = () => {
  const filterButton = document.getElementById('filter-not-learned')
  const allWords = document.querySelectorAll('tr td:first-child')

  if (filterButton) {
    filterButton.addEventListener('click', () => {
      allWords.forEach(item => {
        const isNotLearned = item
          .querySelector('.analyze')
          .classList.contains('not-learned')

        if (!isNotLearned) {
          item.parentElement.style.opacity = '0'
          item.parentElement.style.display = 'none'
          item.classList.remove('show-input')
        }
      })
    })
  }
}
