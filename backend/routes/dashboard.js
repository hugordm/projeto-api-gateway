const { Router } = require("express"); // importa o Router do Express
const { getDashboard, getHistorico } = require("../services/dashboardService"); // importa as funções do service

const router = Router(); // cria o roteador

// define que GET /api/dashboard chama a função getDashboard
router.get("/dashboard", getDashboard);

// define que GET /api/historico chama a função getHistorico
router.get("/historico", getHistorico);

module.exports = router; // exporta o roteador para o app.js usar