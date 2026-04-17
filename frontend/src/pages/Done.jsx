import { useNavigate } from 'react-router-dom'

export default function Done() {
  const navigate = useNavigate()
  const name = localStorage.getItem('candidateName')

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-bold">You're all done, {name}!</h1>
        <p className="text-gray-400">
          Thank you for interviewing with Cuemath. Our team will review your responses and get back to you within 2-3 business days.
        </p>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-left space-y-2">
          <p className="text-sm text-gray-400">What happens next:</p>
          <p className="text-sm text-gray-300">📋 Your responses are being reviewed</p>
          <p className="text-sm text-gray-300">📧 You'll hear from us via email</p>
          <p className="text-sm text-gray-300">🚀 Shortlisted candidates move to a live round</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}