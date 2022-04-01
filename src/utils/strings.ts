export const customTitle = (title: string): string =>
  title
    .split('-')
    .map(text => text[0].toUpperCase() + text.slice(1))
    .join(' ')
