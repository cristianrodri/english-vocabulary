export const speechSynthesisEng = (word: string) => {
  if (!window.speechSynthesis) return

  const utterance = new SpeechSynthesisUtterance(word)

  speechSynthesis.speak(utterance)
}

export const speechSynthesisSpa = (word: string) => {
  if (!window.speechSynthesis) return

  const utterance = new SpeechSynthesisUtterance(word)

  const synth = speechSynthesis
  utterance.voice = synth.getVoices()[0]
  synth.speak(utterance)
}
