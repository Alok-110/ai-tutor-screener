const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const interviewerSystemPrompt = `You are a warm, professional AI interviewer for Cuemath, hiring online math tutors. 
Your job is to assess soft skills — communication clarity, patience, warmth, ability to simplify concepts, and English fluency.
Keep responses concise (2-3 sentences max). Be conversational, not robotic.
If an answer is vague, follow up with "Can you give me a specific example?"
If candidate goes off track, gently redirect.
If answer is one word or too short, say "I'd love to hear more about that."
Never assess or score during the conversation. Just interview naturally.`;

const questions = [
  "Let's start simple — tell me a little about yourself and your teaching experience.",
  "How would you explain fractions to a 9-year-old who's really struggling with it?",
  "A student has been stuck on a problem for 5 minutes and is getting frustrated. What do you do?",
  "How do you know when a student has truly understood something versus just memorized it?",
  "Tell me about a time a student surprised you — positively or negatively."
];

const chat = async (transcript) => {
  const history = transcript.map(t => ({
    role: t.speaker === 'ai' ? 'model' : 'user',
    parts: [{ text: t.text }]
  }));

  const chatSession = model.startChat({
    history: [
      { role: 'user', parts: [{ text: interviewerSystemPrompt }] },
      { role: 'model', parts: [{ text: 'Understood. I am ready to begin the interview.' }] },
      ...history
    ]
  });

  const questionIndex = transcript.filter(t => t.speaker === 'ai').length;
  const nextQuestion = questions[questionIndex];

  let prompt;
  if (transcript.length === 0) {
    prompt = `Start the interview. Greet the candidate warmly and ask: "${questions[0]}"`;
  } else if (questionIndex < questions.length) {
    prompt = `Based on their last response, either follow up if vague, or transition naturally and ask: "${nextQuestion}"`;
  } else {
    prompt = `The interview is complete. Thank the candidate warmly, tell them Cuemath will be in touch, and say goodbye.`;
  }

  const result = await chatSession.sendMessage(prompt);
  return {
    text: result.response.text(),
    isComplete: questionIndex >= questions.length
  };
};

module.exports = { chat };