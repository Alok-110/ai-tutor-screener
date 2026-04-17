import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Setup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [micTested, setMicTested] = useState(false)
  const [testing, setTesting] = useState(false)

  const testMic = async () => {
    setTesting(true)
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicTested(true)
    } catch {
      alert('Microphone access denied. Please allow mic access in your browser settings.')
    }
    setTesting(false)
  }

  const handleStart = () => {
    if (!name.trim() || !role.trim()) return alert('Please enter your name and role.')
    if (!micTested) return alert('Please test your microphone first.')
    localStorage.setItem('candidateName', name)
    localStorage.setItem('candidateRole', role)
    navigate('/interview')
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Let's get you set up</h1>
          <p className="text-gray-400">This will only take a minute</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Your full name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">Applying for</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400"
            >
              <option value="">Select a role</option>
              <option value="Math Tutor">Math Tutor</option>
              <option value="Senior Math Tutor">Senior Math Tutor</option>
              <option value="Lead Tutor">Lead Tutor</option>
            </select>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
            <p className="text-sm text-gray-500">Microphone check</p>
            {micTested ? (
              <p className="text-green-600 font-medium text-sm">✅ Microphone is working!</p>
            ) : (
              <button
                onClick={testMic}
                disabled={testing}
                className="w-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm transition-all"
              >
                {testing ? 'Checking...' : '🎤 Test Microphone'}
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-base"
        >
          Start Interview →
        </button>
      </div>
    </div>
  )
}