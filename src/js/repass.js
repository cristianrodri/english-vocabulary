export const repass = () => {
  const allCheckboxes = document.querySelectorAll('tr .analyze')

  allCheckboxes.forEach(item => {
    item.addEventListener('click', e => {
      console.log(e.target)
      e.target.classList.toggle('not-learned')

      const title = e.target.classList.contains('not-learned')
        ? 'Not learned yet'
        : 'Learned'

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
        }
      })
    })
  }
}
