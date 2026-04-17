import { useState, useEffect, useRef } from 'react'

export default function useSpeechRecognition() {
  const [transcript, setTranscript] = useState('')
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)
  const finalTranscriptRef = useRef('')

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (e) => {
      let final = ''
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript
      }
      finalTranscriptRef.current = final
      setTranscript(final)
    }

    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
  }, [])

  const startListening = () => {
    finalTranscriptRef.current = ''
    setTranscript('')
    setListening(true)
    recognitionRef.current?.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  return { transcript: finalTranscriptRef.current, listening, startListening, stopListening }
}