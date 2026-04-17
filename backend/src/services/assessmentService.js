require('dotenv').config();
const Groq = require('groq-sdk');
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const assess = async (transcript) => {
  const transcriptText = transcript
    .map(t => `${t.speaker === 'ai' ? 'Interviewer' : 'Candidate'}: ${t.text}`)
    .join('\n');

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are an expert hiring evaluator. Return ONLY valid JSON, no markdown, no explanation.'
      },
      {
        role: 'user',
        content: `Evaluate this tutor candidate interview transcript for Cuemath:

${transcriptText}

Return ONLY this JSON:
{
  "clarity": <1-5>,
  "warmth": <1-5>,
  "simplicity": <1-5>,
  "fluency": <1-5>,
  "engagement": <1-5>,
  "recommendation": "<Strong Yes / Yes / No>",
  "summary": "<2-3 sentence overall summary>",
  "quotes": {
    "clarity": "<exact quote from transcript>",
    "warmth": "<exact quote from transcript>",
    "simplicity": "<exact quote from transcript>"
  }
}`
      }
    ],
    max_tokens: 500
  });

  const raw = response.choices[0].message.content.replace(/```json|```/g, '').trim();
  return JSON.parse(raw);
};

module.exports = { assess };