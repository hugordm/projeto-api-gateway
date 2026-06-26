require("dotenv").config();
const axios = require("axios");
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MOEDAS_URL = process.env.MOEDAS_URL || "";

async function getDashboard(req, res) {
    try {
        const cidade = req.query.cidade || "São Paulo";
        const CLIMA_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.CLIMA_API_KEY}&units=metric&lang=pt_br`;
        
        const [climaResult, moedasResult] = await Promise.allSettled([
            axios.get(CLIMA_URL),
            axios.get(MOEDAS_URL)
        ]);

        const clima = climaResult.status === "fulfilled" ? climaResult.value.data : null;
        const moedas = moedasResult.status === "fulfilled" ? moedasResult.value.data : null;

        const avisos = [];
        if (!clima) avisos.push("Dados de clima indisponíveis");
        if (!moedas) avisos.push("Dados de moedas indisponíveis");

        // sem Claude aqui — só clima e moedas
        res.json({ clima, moedas, avisos });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

// nova função — gera insight sob demanda quando usuário clicar no botão
async function getInsight(req, res) {
    try {
        const cidade = req.query.cidade || "São Paulo";
        const moeda = req.query.moeda || "USD";

        const CLIMA_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.CLIMA_API_KEY}&units=metric&lang=pt_br`;

        const [climaResult, moedasResult] = await Promise.allSettled([
            axios.get(CLIMA_URL),
            axios.get(MOEDAS_URL)
        ]);

        const clima = climaResult.status === "fulfilled" ? climaResult.value.data : null;
        const moedas = moedasResult.status === "fulfilled" ? moedasResult.value.data : null;

        const resumo = `Temperatura em ${clima ? `${clima.name}: ${clima.main.temp}°C, ${clima.weather[0].description}` : "indisponível"}. Dolar: ${moedas ? moedas.rates.BRL : "indisponível"}. Euro: ${moedas ? moedas.rates.EUR : "indisponível"}`;

        const mensagem = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 200,
            messages: [{
                role: "user",
                content: `Com base nesses dados: ${resumo}, gere uma frase curta focando na moeda ${moeda} em português.`
            }]
        });

        res.json({ insight: mensagem.content[0].text });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function getHistorico(req, res) {
    try {

        const { start, end } = req.query;

        const inicio = start || "2026-01-01";
        const fim = end || "2026-06-24";

        const resposta = await axios.get(
            `https://api.frankfurter.app/${inicio}..${fim}?from=USD&to=BRL`
        );
        res.json(resposta.data);

    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
}

module.exports = { getDashboard, getHistorico, getInsight };