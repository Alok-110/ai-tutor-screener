const express = require('express');
const router = express.Router();
const { startSession, sendMessage, endSession } = require('../controllers/sessionController');

router.post('/start', startSession);
router.post('/message', sendMessage);
router.post('/end', endSession);
// router.post('/speak', async (req, res) => {
//   try {
//     const { text } = req.body
//     console.log('Key loaded:', process.env.ELEVENLABS_API_KEY ? 'YES' : 'MISSING')
//     console.log('Voice ID:', process.env.ELEVENLABS_VOICE_ID)

//     const response = await fetch(
//       `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
//       {
//         method: 'POST',
//         headers: {
//           'xi-api-key': process.env.ELEVENLABS_API_KEY,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           text,
//           model_id: 'eleven_turbo_v2',
//           voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.3, use_speaker_boost: true }
//         })
//       }
//     )

//     if (!response.ok) {
//       const errText = await response.text()
//       console.error('ElevenLabs error:', response.status, errText)
//       throw new Error(`ElevenLabs ${response.status}: ${errText}`)
//     }

//     const arrayBuffer = await response.arrayBuffer()
//     res.set('Content-Type', 'audio/mpeg')
//     res.send(Buffer.from(arrayBuffer))
//   } catch (err) {
//     console.error('Speak route error:', err.message)
//     res.status(500).json({ error: err.message })
//   }
// })

module.exports = router;