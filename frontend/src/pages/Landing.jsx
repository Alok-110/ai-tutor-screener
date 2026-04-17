import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="text-5xl font-bold text-white">Cuemath</div>
        <div className="text-xl text-gray-400">Tutor Screening Interview</div>

        <div className="bg-gray-900 rounded-2xl p-6 text-left space-y-4 border border-gray-800">
          <p className="text-gray-300 font-medium">What to expect:</p>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>✅ A short 8-10 minute voice conversation</li>
            <li>✅ 5 questions about your teaching approach</li>
            <li>✅ No math tests — just a friendly chat</li>
            <li>✅ Results shared with the Cuemath team</li>
          </ul>
        </div>

        <p className="text-gray-500 text-sm">
          Make sure you're in a quiet place with a working microphone.
          This interview works best on <span className="text-white">Google Chrome</span>.
        </p>

        <button
          onClick={() => navigate('/setup')}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg"
        >
          Begin Interview →
        </button>
      </div>
    </div>
  )
}