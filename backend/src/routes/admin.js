const express = require('express');
const router = express.Router();
const { getAllCandidates, getCandidateById } = require('../controllers/adminController');

router.get('/candidates', getAllCandidates);
router.get('/candidates/:id', getCandidateById);

router.delete('/candidates/:id', async (req, res) => {
  try {
    await require('../models/Candidate').findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.patch('/candidates/:id/status', async (req, res) => {
  try {
    console.log('PATCH hit:', req.params.id, req.body)
    const candidate = await require('../models/Candidate').findByIdAndUpdate(
      req.params.id,
      { $set: { adminStatus: req.body.adminStatus } },
      { returnDocument: 'after' }
    )
    console.log('Updated adminStatus:', candidate?.adminStatus)
    res.json(candidate)
  } catch (err) {
    console.error('PATCH error:', err)
    res.status(500).json({ error: err.message })
  }
})

router.post('/candidates/:id/send-report', async (req, res) => {
  try {
    const Candidate = require('../models/Candidate')
    const { sendReport } = require('../services/emailService')
    const candidate = await Candidate.findById(req.params.id)
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' })
    if (!candidate.email) return res.status(400).json({ error: 'No email on file for this candidate' })
    if (!candidate.assessment) return res.status(400).json({ error: 'Assessment not ready yet' })
    await sendReport({
      candidateEmail: candidate.email,
      candidateName: candidate.name,
      assessment: candidate.assessment,
      role: candidate.role,
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router;