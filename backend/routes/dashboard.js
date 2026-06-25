const { Router } = require("express"); // importa o Router do Express
const { getDashboard, getHistorico } = require("../services/dashboardService"); // importa as funções do dashboardService
const { getClima } = require("../controllers/climaController"); // importa a função do climaController
const { getGeocoding } = require("../controllers/geocodingController"); // importa a função do geocodingController

const router = Router(); // cria o roteador

// rota principal — retorna clima, moedas e insight da Claude
router.get("/dashboard", getDashboard);

// rota de histórico — retorna histórico de valorização do dólar para o gráfico
router.get("/historico", getHistorico);

// rota do mapa — recebe lat e lon e retorna dados do clima via Open-Meteo
router.get("/clima", getClima);

// rota de geocoding — converte nome da cidade em coordenadas para o mapa
router.get("/geocoding", getGeocoding);

module.exports = router; // exporta o roteador para o app.js usar