const { Router } = require('express');
const { getClima } = require('../controllers/climaController');

const router = Router();

// Rota GET /api/clima
router.get('/clima', getClima);

module.exports = router;