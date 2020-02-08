import 'babel-polyfill'
import '../scss/styles.scss'
import orderVocabulary from './order-vocabulary'
import { hearVocabulary } from './hear-vocabulary'
import { practice } from './practice'

{
  // adding color to the card that I will be studying
  console.log(localStorage.getItem('study-page'))

  const name = Array.from(document.querySelectorAll('.main-card'))

  name.some(childDOM => {
    const childName = childDOM.querySelector('.main-card__name')

    if (childName.textContent === localStorage.getItem('study-page')) {
      return childName.classList.add('u-current-study-page')
    }
  })

}

orderVocabulary()
hearVocabulary()
practice()
