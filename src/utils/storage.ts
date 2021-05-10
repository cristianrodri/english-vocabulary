export const getWordsStorage = (pathname: string): string[] =>
  JSON.parse(localStorage.getItem(pathname) as string) || []
