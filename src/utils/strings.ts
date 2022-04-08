export const customTitle = (title: string): string =>
  title
    .split('-')
    .map(text => text[0].toUpperCase() + text.slice(1))
    .join(' ')

export const normalizeSpanishAccent = (word: string) =>
  word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
