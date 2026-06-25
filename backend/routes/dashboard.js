const { Router } = require("express"); // importa o Router do Express
const { getDashboard, getHistorico } = require("../services/dashboardService"); // importa as funções do dashboardService
const { getClima } = require("../controllers/climaController"); // importa a função do climaController

const router = Router(); // cria o roteador

// rota principal — retorna clima, moedas e insight da Claude
router.get("/dashboard", getDashboard);

// rota de histórico — retorna histórico de valorização do dólar para o gráfico
router.get("/historico", getHistorico);

// rota do mapa — recebe lat e lon e retorna dados do clima via Open-Meteo
router.get("/clima", getClima);

module.exports = router; // exporta o roteador para o app.js usar