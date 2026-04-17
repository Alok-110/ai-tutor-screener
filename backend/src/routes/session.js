const express = require('express');
const router = express.Router();
const { startSession, sendMessage, endSession } = require('../controllers/sessionController');

router.post('/start', startSession);
router.post('/message', sendMessage);
router.post('/end', endSession);

module.exports = router;