const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  role: String,
  transcript: [
    {
      speaker: String, 
      text: String,
    }
  ],
  assessment: {
    clarity: Number,
    warmth: Number,
    simplicity: Number,
    fluency: Number,
    engagement: Number,
    recommendation: String,
    summary: String,
    quotes: Object
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidate', candidateSchema);