export default function useSpeechSynthesis() {
  const speak = (text, onEnd) => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.95
    utterance.pitch = 1
    if (onEnd) utterance.onend = onEnd
    window.speechSynthesis.speak(utterance)
  }

  const cancel = () => window.speechSynthesis.cancel()

  return { speak, cancel }
}