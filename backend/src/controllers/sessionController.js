const Candidate = require("../models/Candidate.js");
const { chat } = require("../services/geminiService.js");
const { assess } = require("../services/assessmentService.js");

const startSession = async (req, res) => {
  try {
    const { name, role, email } = req.body;
    const candidate = await Candidate.create({
      name,
      role,
      email,
      transcript: [],
    });
    const aiResponse = await chat([]);
    candidate.transcript.push({ speaker: "ai", text: aiResponse.text });
    await candidate.save();
    res.json({ candidateId: candidate._id, message: aiResponse.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { candidateId, text } = req.body;
    const candidate = await Candidate.findById(candidateId);
    candidate.transcript.push({ speaker: "candidate", text });
    const aiResponse = await chat(candidate.transcript);
    candidate.transcript.push({ speaker: "ai", text: aiResponse.text });
    await candidate.save();
    res.json({ message: aiResponse.text, isComplete: aiResponse.isComplete });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const endSession = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const candidate = await Candidate.findById(candidateId);
    const assessment = await assess(candidate.transcript);
    candidate.assessment = assessment;
    await candidate.save();
    res.json({ assessment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { startSession, sendMessage, endSession };
