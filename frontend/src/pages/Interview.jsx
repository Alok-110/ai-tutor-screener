import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useSpeechRecognition from '../hooks/useSpeechRecognition'
import useSpeechSynthesis from '../hooks/useSpeechSynthesis'
import { startSession, sendMessage, endSession } from '../services/api'

export default function Interview() {
  const navigate = useNavigate()
  const [candidateId, setCandidateId] = useState(null)
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('connecting')
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const bottomRef = useRef(null)
  const { transcript, listening, startListening, stopListening } = useSpeechRecognition()
  const { speak, cancel } = useSpeechSynthesis()

  useEffect(() => {
    const init = async () => {
      const name = localStorage.getItem('candidateName')
      const role = localStorage.getItem('candidateRole')
      if (!name || !role) return navigate('/')
      const res = await startSession(name, role)
      setCandidateId(res.data.candidateId)
      addMessage('ai', res.data.message)
      speakAI(res.data.message)
    }
    init()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (transcript && !listening) {
      handleCandidateReply(transcript)
    }
  }, [transcript, listening])

  const addMessage = (speaker, text) => {
    setMessages(prev => [...prev, { speaker, text }])
  }

  const speakAI = (text, onEnd) => {
    setIsAISpeaking(true)
    setStatus('ai-speaking')
    speak(text, () => {
      setIsAISpeaking(false)
      setStatus('listening')
      onEnd?.()
    })
  }

  const handleCandidateReply = async (text) => {
    setStatus('processing')
    addMessage('candidate', text)
    const res = await sendMessage(candidateId, text)
    addMessage('ai', res.data.message)
    if (res.data.isComplete) {
      speakAI(res.data.message, async () => {
        setStatus('ending')
        await endSession(candidateId)
        navigate('/done')
      })
    } else {
      speakAI(res.data.message)
    }
  }

  const statusText = {
    connecting: 'Connecting...',
    'ai-speaking': 'AI is speaking...',
    listening: 'Your turn — click mic to speak',
    processing: 'Processing...',
    ending: 'Wrapping up...'
  }

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-semibold">Cuemath Interview</div>
        <div className="text-sm text-gray-400">{localStorage.getItem('candidateName')}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-2xl mx-auto w-full">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.speaker === 'candidate' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm ${
              m.speaker === 'candidate'
                ? 'bg-blue-600 text-white rounded-br-sm'
                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-800 px-6 py-6 flex flex-col items-center gap-3">
        <p className="text-sm text-gray-500">{statusText[status]}</p>
        <button
          onClick={listening ? stopListening : startListening}
          disabled={status !== 'listening'}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
            listening
              ? 'bg-red-500 hover:bg-red-400 animate-pulse'
              : status === 'listening'
              ? 'bg-gray-900 hover:bg-blue-700'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
        >
          🎤
        </button>
        {listening && (
          <p className="text-xs text-red-400 animate-pulse">Recording... click to stop</p>
        )}
      </div>
    </div>
  )
}