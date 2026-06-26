require("dotenv").config(); // carrega as variáveis do .env
const axios = require("axios"); // biblioteca para fazer requisições HTTP
const Anthropic = require("@anthropic-ai/sdk"); // SDK da Claude

// cria o cliente da Claude com a chave do .env
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// URL da API de moedas vem do .env
const MOEDAS_URL = process.env.MOEDAS_URL || "";

// busca clima e moedas em paralelo — sem chamar a Claude
async function getDashboard(req, res) {
    try {
        // pega a cidade da URL (?cidade=Recife) ou usa São Paulo como padrão
        const cidade = req.query.cidade || "São Paulo";

        // monta a URL do clima dinamicamente com a cidade e a chave da API
        const CLIMA_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.CLIMA_API_KEY}&units=metric&lang=pt_br`;
        
        // busca as duas APIs ao mesmo tempo em paralelo
        // Promise.allSettled não para se uma falhar — cada uma tem seu resultado independente
        const [climaResult, moedasResult] = await Promise.allSettled([
            axios.get(CLIMA_URL),
            axios.get(MOEDAS_URL)
        ]);

        // se a API funcionou (fulfilled), pega os dados — senão retorna null
        const clima = climaResult.status === "fulfilled" ? climaResult.value.data : null;
        const moedas = moedasResult.status === "fulfilled" ? moedasResult.value.data : null;

        // monta os avisos para o front-end saber se alguma API falhou
        const avisos = [];
        if (!clima) avisos.push("Dados de clima indisponíveis");
        if (!moedas) avisos.push("Dados de moedas indisponíveis");

        // devolve clima, moedas e avisos — sem insight (gerado sob demanda)
        res.json({ clima, moedas, avisos });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

// gera insight da Claude sob demanda — só quando o usuário clicar no botão
async function getInsight(req, res) {
    try {
        // pega cidade e moeda da URL
        const cidade = req.query.cidade || "São Paulo";
        const moeda = req.query.moeda || "USD";

        // monta a URL do clima
        const CLIMA_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.CLIMA_API_KEY}&units=metric&lang=pt_br`;

        // busca clima e moedas em paralelo para ter contexto
        const [climaResult, moedasResult] = await Promise.allSettled([
            axios.get(CLIMA_URL),
            axios.get(MOEDAS_URL)
        ]);

        const clima = climaResult.status === "fulfilled" ? climaResult.value.data : null;
        const moedas = moedasResult.status === "fulfilled" ? moedasResult.value.data : null;

        // monta o resumo com os dados reais para enviar para a Claude
        const resumo = `Temperatura em ${clima ? `${clima.name}: ${clima.main.temp}°C, ${clima.weather[0].description}` : "indisponível"}. Dolar: ${moedas ? moedas.rates.BRL : "indisponível"}. Euro: ${moedas ? moedas.rates.EUR : "indisponível"}`;

        // chama a Claude Haiku — rápido e eficiente para textos curtos
        const mensagem = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 200, // limite de tokens da resposta
            messages: [{
                role: "user",
                content: `Com base nesses dados: ${resumo}, gere uma frase curta focando na moeda ${moeda} em português.`
            }]
        });

        // retorna o insight gerado pela Claude
        res.json({ insight: mensagem.content[0].text });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

// busca histórico de valorização do dólar — alimenta o gráfico de tendências
async function getHistorico(req, res) {
    try {
        // pega o período da URL ou usa padrão de 2026
        const { start, end } = req.query;
        const inicio = start || "2026-01-01";
        const fim = end || "2026-06-24";

        // chama a Frankfurter — gratuita, sem limite e sem chave
        const resposta = await axios.get(
            `https://api.frankfurter.app/${inicio}..${fim}?from=USD&to=BRL,EUR`
        );

        // retorna o histórico completo para o front-end montar o gráfico
        res.json(resposta.data);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

module.exports = { getDashboard, getHistorico, getInsight }; // exporta as três funções