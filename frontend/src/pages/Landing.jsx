import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="text-4xl font-bold tracking-tight">Cuemath</div>
        <div className="text-gray-500 text-lg">Tutor Screening Interview</div>

        <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-3 border border-gray-200">
          <p className="text-gray-700 font-medium text-sm uppercase tracking-wide">What to expect</p>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>✅ A short 8-10 minute voice conversation</li>
            <li>✅ 5 questions about your teaching approach</li>
            <li>✅ No math tests — just a friendly chat</li>
            <li>✅ Results shared with the Cuemath team</li>
          </ul>
        </div>

        <p className="text-gray-400 text-sm">
          Make sure you're in a quiet place with a working microphone.
          Best experienced on <span className="text-gray-700 font-medium">Google Chrome</span>.
        </p>

        <button
          onClick={() => navigate('/setup')}
          className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-base"
        >
          Begin Interview →
        </button>
      </div>
    </div>
  )
}