const { Router } = require("express"); // importa o Router do Express
const { getDashboard, getHistorico, getInsight } = require("../services/dashboardService"); // importa as funções do dashboardService
const { getClima } = require("../controllers/climaController"); // importa a função do climaController
const { getGeocoding } = require("../controllers/geocodingController"); // importa a função do geocodingController
const { chat } = require("../controllers/chatController");
const { getFeriados } = require("../controllers/calendarioController"); // importa a função do calendarioController
const { conversorMoeda } = require("../services/ConversorServices");

const router = Router(); // cria o roteador

// rota principal — retorna clima, moedas e insight da Claude
router.get("/dashboard", getDashboard);

// rota de histórico — retorna histórico de valorização do dólar para o gráfico
router.get("/historico", getHistorico);

// rota do mapa — recebe lat e lon e retorna dados do clima via Open-Meteo
router.get("/clima", getClima);

// rota de geocoding — converte nome da cidade em coordenadas para o mapa
router.get("/geocoding", getGeocoding);

// rota do chatbot — recebe pergunta e responde com contexto dos dados
router.post("/chat", chat);

// rota de insight — gera análise da Claude sob demanda
router.get("/insight", getInsight);

// rota do calendário — retorna feriados nacionais via BrasilAPI
router.get("/calendario", getFeriados);

// rota do conversor de moedas
router.get("/conversorMoeda", conversorMoeda);

module.exports = router; // exporta o roteador para o app.js usar