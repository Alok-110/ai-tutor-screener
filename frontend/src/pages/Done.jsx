import { useNavigate } from 'react-router-dom'

export default function Done() {
  const navigate = useNavigate()
  const name = localStorage.getItem('candidateName')

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-bold tracking-tight">You're all done, {name}!</h1>
        <p className="text-gray-500">
          Thank you for interviewing with Cuemath. Our team will review your responses and get back to you within 2-3 business days.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-left space-y-2">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">What happens next</p>
          <p className="text-sm text-gray-600">📋 Your responses are being reviewed</p>
          <p className="text-sm text-gray-600">📧 You'll hear from us via email</p>
          <p className="text-sm text-gray-600">🚀 Shortlisted candidates move to a live round</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}