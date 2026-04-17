import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const recommendationColor = {
  'Strong Yes': 'bg-green-50 text-green-700',
  'Yes': 'bg-blue-50 text-blue-700',
  'No': 'bg-red-50 text-red-700'
}

export default function Admin() {
  const navigate = useNavigate()
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/candidates`)
      setCandidates(res.data)
      setLoading(false)
    }
    fetch()
  }, [])

  const avgScore = (a) => {
    if (!a) return '-'
    return ((a.clarity + a.warmth + a.simplicity + a.fluency + a.engagement) / 5).toFixed(1)
  }

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center text-gray-400">
      Loading...
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
            <p className="text-sm text-gray-400">{candidates.length} interviews completed</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
          >
            + New Interview
          </button>
        </div>

        {/* Table */}
        {candidates.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">
            No interviews yet. Start one from the home page.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wide">
                  <th className="text-left px-6 py-4">Candidate</th>
                  <th className="text-left px-6 py-4">Role</th>
                  <th className="text-left px-6 py-4">Avg Score</th>
                  <th className="text-left px-6 py-4">Recommendation</th>
                  <th className="text-left px-6 py-4">Date</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, i) => (
                  <tr
                    key={c._id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-all ${i === candidates.length - 1 ? 'border-0' : ''}`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                    <td className="px-6 py-4 text-gray-500">{c.role}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{avgScore(c.assessment)}</td>
                    <td className="px-6 py-4">
                      {c.assessment ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${recommendationColor[c.assessment.recommendation] || 'bg-gray-100 text-gray-600'}`}>
                          {c.assessment.recommendation}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xs">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/report/${c._id}`)}
                        className="text-gray-400 hover:text-gray-900 transition-all text-xs underline"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}