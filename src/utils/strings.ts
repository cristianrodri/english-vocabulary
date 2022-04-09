export const capitalizedText = (text: string) =>
  text[0].toUpperCase() + text.slice(1)

export const customTitle = (title: string): string =>
  title
    .split('-')
    .map(text => capitalizedText(text))
    .join(' ')

export const normalizeSpanishAccent = (word: string) =>
  word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
