import { useState, useEffect, useRef } from 'react'

export default function useSpeechRecognition({ onFinalTranscript }) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)
  const callbackRef = useRef(onFinalTranscript)
  const accumulatedRef = useRef('')

  // Keep callback ref fresh on every render
  useEffect(() => {
    callbackRef.current = onFinalTranscript
  })

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition not supported. Please use Chrome.')
      return
    }

    // Always create a fresh instance
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

    accumulatedRef.current = ''

    recognition.onstart = () => {
      console.log('Recognition started')
      setListening(true)
    }

    recognition.onresult = (e) => {
      let interim = ''
      let final = ''
      for (let i = 0; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) {
          final += t
        } else {
          interim += t
        }
      }
      if (final) {
        accumulatedRef.current = final
        console.log('Final transcript:', final)
      } else if (interim) {
        console.log('Interim:', interim)
      }
    }

    recognition.onerror = (e) => {
      console.error('Recognition error:', e.error)
      setListening(false)
    }

    recognition.onend = () => {
      console.log('Recognition ended')
      setListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setListening(false)
    // Give it 300ms to fire final onresult before we read
    setTimeout(() => {
      const text = accumulatedRef.current
      console.log('Stopped. Text captured:', text)
      if (text && text.trim()) {
        callbackRef.current(text.trim())
      }
      accumulatedRef.current = ''
    }, 300)
  }

  return { listening, startListening, stopListening }
}