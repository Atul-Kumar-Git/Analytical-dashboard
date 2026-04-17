const express = require('express');
const router = express.Router();
const { track } = require('../controllers/trackController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, track);

module.exports = router;