const Candidate = require('../models/Candidate.js');

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}, 'name role assessment createdAt');
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllCandidates, getCandidateById };