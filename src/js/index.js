import 'babel-polyfill'
import '../scss/styles.scss'
import orderVocabulary from './order-vocabulary'
import { hearVocabulary } from './hear-vocabulary'
import { practice } from './practice'

orderVocabulary()
hearVocabulary()
practice()
