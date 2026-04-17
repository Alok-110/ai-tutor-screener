import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const dimensions = [
  { key: 'clarity', label: 'Communication Clarity' },
  { key: 'warmth', label: 'Warmth & Patience' },
  { key: 'simplicity', label: 'Ability to Simplify' },
  { key: 'fluency', label: 'English Fluency' },
  { key: 'engagement', label: 'Candidate Engagement' }
]

const recommendationColor = {
  'Strong Yes': 'bg-green-50 text-green-700 border-green-200',
  'Yes': 'bg-blue-50 text-blue-700 border-blue-200',
  'No': 'bg-red-50 text-red-700 border-red-200'
}

const scoreColor = (score) => {
  if (score >= 4) return 'bg-green-500'
  if (score >= 3) return 'bg-yellow-400'
  return 'bg-red-400'
}

export default function Report() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/candidates/${id}`)
      setCandidate(res.data)
      setLoading(false)
    }
    fetch()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center text-gray-400">
      Loading report...
    </div>
  )

  const a = candidate.assessment

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/admin')} className="text-sm text-gray-400 hover:text-gray-600">← Back</button>
          <span className="text-xs text-gray-400">{new Date(candidate.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Candidate Info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
          <p className="text-gray-500 text-sm">{candidate.role}</p>
          <div className={`inline-block mt-2 px-4 py-1 rounded-full border text-sm font-semibold ${recommendationColor[a.recommendation] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
            {a.recommendation}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Summary</p>
          <p className="text-gray-700 text-sm leading-relaxed">{a.summary}</p>
        </div>

        {/* Scores */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Scores</p>
          {dimensions.map(d => (
            <div key={d.key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{d.label}</span>
                <span className="font-semibold text-gray-900">{a[d.key]}/5</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${scoreColor(a[d.key])}`}
                  style={{ width: `${(a[d.key] / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quotes */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Supporting Quotes</p>
          {Object.entries(a.quotes).map(([key, quote]) => (
            <div key={key} className="border-l-2 border-gray-200 pl-4">
              <p className="text-xs text-gray-400 capitalize mb-1">{key}</p>
              <p className="text-gray-700 text-sm italic">"{quote}"</p>
            </div>
          ))}
        </div>

        {/* Transcript */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Full Transcript</p>
          {candidate.transcript.map((t, i) => (
            <div key={i} className={`text-sm ${t.speaker === 'ai' ? 'text-gray-500' : 'text-gray-900'}`}>
              <span className="font-medium">{t.speaker === 'ai' ? 'Interviewer' : candidate.name}: </span>
              {t.text}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}