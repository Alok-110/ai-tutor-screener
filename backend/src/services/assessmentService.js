const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const assess = async (transcript) => {
  const transcriptText = transcript
    .map(t => `${t.speaker === 'ai' ? 'Interviewer' : 'Candidate'}: ${t.text}`)
    .join('\n');

  const prompt = `You are evaluating a tutor candidate for Cuemath based on this interview transcript.

${transcriptText}

Score the candidate 1-5 on each dimension and return ONLY a valid JSON object, no markdown, no explanation:
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
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().replace(/```json|```/g, '').trim();
  return JSON.parse(raw);
};

module.exports = { assess };