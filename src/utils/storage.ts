export const getWordsStorage = (pathname: string): string[] =>
  JSON.parse(localStorage.getItem(pathname) as string) || []

export const filteredStorageWords = (words: string[][], storage: string[]) =>
  words.filter(word => storage.includes(word.join('=')))
