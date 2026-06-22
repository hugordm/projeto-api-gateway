require("dotenv").config();
const axios = require("axios");
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const CLIMA_URL = process.env.CLIMA_URL || "";
const MOEDAS_URL = process.env.MOEDAS_URL || "";

async function getDashboard(req, res) {
    try {
        const [climaResponse, moedasResponse] = await Promise.all([
            axios.get(CLIMA_URL),
            axios.get(MOEDAS_URL)
        ]);

        const clima = climaResponse.data;
        const moedas = moedasResponse.data;

        // TODO: ajustar os campos abaixo após Hugo Correia enviar o JSON das APIs
        const resumo = `Temperatura: ${clima.CAMPO_AQUI}, Dolar: ${moedas.CAMPO_AQUI}`;

        const mensagem = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 200,
            messages: [{
                role: "user",
                content: `Com base nesses dados: ${resumo}, gere uma frase curta de análise em português.`
            }]
        });

        const insight = mensagem.content[0].text;

        res.json({
            clima,
            moedas,
            insight
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

module.exports = { getDashboard };