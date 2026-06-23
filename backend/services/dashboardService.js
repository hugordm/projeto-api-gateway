require("dotenv").config();
const axios = require("axios");
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const CLIMA_URL = process.env.CLIMA_URL || "";
const MOEDAS_URL = process.env.MOEDAS_URL || "";

async function getDashboard(req, res) {
    try {
        const [climaResult, moedasResult] = await Promise.allSettled([
            axios.get(CLIMA_URL),
            axios.get(MOEDAS_URL)
        ]);

        const clima = climaResult.status === "fulfilled" ? climaResult.value.data : null;
        const moedas = moedasResult.status === "fulfilled" ? moedasResult.value.data : null;

        const avisos = [];
        if (!clima) avisos.push("Dados de clima indisponíveis");
        if (!moedas) avisos.push("Dados de moedas indisponíveis");

        // TODO: ajustar os campos abaixo após Hugo Correia enviar o JSON das APIs
        const resumo = `Temperatura: ${clima ? clima.CAMPO_AQUI : "indisponível"}, Dolar: ${moedas ? moedas.CAMPO_AQUI : "indisponível"}`;

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
            insight,
            avisos
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

module.exports = { getDashboard };