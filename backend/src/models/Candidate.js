const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: { type: String, default: '' },
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
  adminStatus: { type: String, default: 'Pending Review' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidate', candidateSchema);