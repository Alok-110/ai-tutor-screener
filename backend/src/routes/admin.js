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
    const candidate = await require('../models/Candidate').findByIdAndUpdate(
      req.params.id,
      { adminStatus: req.body.adminStatus },
      { new: true }
    )
    res.json(candidate)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router;