require("dotenv").config(); // carrega as variáveis do .env
const axios = require("axios"); // biblioteca para fazer requisições HTTP
const Anthropic = require("@anthropic-ai/sdk"); // SDK da Claude

// cria o cliente da Claude com a chave do .env
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const chat = async (req, res) => {
    try {
        // pega a pergunta, cidade, moeda e moedas do body da requisição
        const { pergunta, cidade, moeda, moedas } = req.body;

        // valida se a pergunta foi enviada
        if (!pergunta) {
            return res.status(400).json({ erro: "Pergunta é obrigatória." });
        }

        // pega a cidade, moeda e moedas ou usa padrão
        const cidade_ = cidade || "São Paulo";
        const moeda_ = moeda || "USD";
        const moedas_param = moedas || "BRL,EUR";

        // monta a URL do clima dinamicamente
        const CLIMA_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade_}&appid=${process.env.CLIMA_API_KEY}&units=metric&lang=pt_br`;

        // monta a URL de moedas dinamicamente com as moedas escolhidas
        const MOEDAS_URL = `https://api.frankfurter.app/latest?from=USD&to=${moedas_param}`;

        // busca clima e moedas em paralelo para ter contexto
        const [climaResult, moedasResult] = await Promise.allSettled([
            axios.get(CLIMA_URL),
            axios.get(MOEDAS_URL)
        ]);

        // pega os dados ou null se falhar
        const clima = climaResult.status === "fulfilled" ? climaResult.value.data : null;
        const moedasData = moedasResult.status === "fulfilled" ? moedasResult.value.data : null;

        // monta o resumo de todas as moedas disponíveis
        const moedasResumo = moedasData ? Object.entries(moedasData.rates).map(([cod, val]) => `${cod}: ${val}`).join(", ") : "indisponível";

        // monta o contexto com os dados reais para a Claude
        const contexto = `
            Você é um assistente financeiro e meteorológico inteligente.
            Responda a pergunta do usuário com base nos dados abaixo em português.
            Seja direto e objetivo.

            Dados atuais:
            - Clima em ${cidade_}: ${clima ? `${clima.main.temp}°C, ${clima.weather[0].description}, umidade ${clima.main.humidity}%` : "indisponível"}
            - Moedas (em relação ao USD): ${moedasResumo}
            - Moeda de interesse do usuário: ${moeda_}

            Pergunta do usuário: ${pergunta}
        `;

        // chama a Claude com o contexto e a pergunta
        const mensagem = await client.messages.create({
            model: "claude-haiku-4-5-20251001", // modelo rápido e eficiente
            max_tokens: 300, // limite de tokens da resposta
            messages: [{
                role: "user",
                content: contexto
            }]
        });

        // retorna a resposta da Claude para o front-end
        res.json({
            resposta: mensagem.content[0].text,
            contexto: {
                cidade: cidade_,
                moeda: moeda_,
                clima: clima ? `${clima.main.temp}°C` : "indisponível",
                moedas: moedasResumo
            }
        });

    } catch (error) {
        // se der erro retorna status 500 com a mensagem
        res.status(500).json({ erro: error.message });
    }
};

module.exports = { chat }; // exporta a função para as rotas usarem