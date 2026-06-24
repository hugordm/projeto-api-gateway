const { Router } = require("express"); // importa o Router do Express
const { getDashboard } = require("../services/dashboardService"); // importa a função do service

const router = Router(); // cria o roteador

// define que GET /api/dashboard chama a função getDashboard
router.get("/dashboard", getDashboard);

module.exports = router; // exporta o roteador para o app.js usar