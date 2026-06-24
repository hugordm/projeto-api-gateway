require("dotenv").config(); // carrega as variáveis do .env
const axios = require("axios"); // biblioteca para fazer requisições HTTP
const Anthropic = require("@anthropic-ai/sdk"); // SDK da Claude

// cria o cliente da Claude com a chave do .env
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// URL da API de moedas vem do .env
const MOEDAS_URL = process.env.MOEDAS_URL || "";

async function getDashboard(req, res) {
    try {
        // pega a cidade da URL (?cidade=Recife) ou usa São Paulo como padrão
        const cidade = req.query.cidade || "São Paulo";
        
        // monta a URL do clima dinamicamente com a cidade e a chave da API
        const CLIMA_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.CLIMA_API_KEY}&units=metric&lang=pt_br`;
        
        // busca as duas APIs ao mesmo tempo em paralelo
        // Promise.allSettled não para se uma falhar — cada uma tem seu resultado
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

        // monta o resumo para enviar para a Claude gerar o insight
        // verifica se cada dado existe antes de acessar os campos
        const resumo = `Temperatura em ${clima ? `${clima.name}: ${clima.main.temp}°C, ${clima.weather[0].description}` : "indisponível"}. Dolar: ${moedas ? moedas.rates.BRL : "indisponível"}`;
        
        // chama a Claude Haiku para gerar uma frase de análise em português
        const mensagem = await client.messages.create({
            model: "claude-haiku-4-5-20251001", // modelo mais rápido e eficiente
            max_tokens: 200, // limite de tokens da resposta
            messages: [{
                role: "user",
                content: `Com base nesses dados: ${resumo}, gere uma frase curta de análise em português.`
            }]
        });

        // pega o texto da resposta da Claude
        const insight = mensagem.content[0].text;

        // devolve tudo junto para o front-end em um único objeto JSON
        res.json({
            clima,   // dados do clima da cidade
            moedas,  // dados das moedas
            insight, // análise gerada pela Claude
            avisos   // avisos de erro caso alguma API falhe
        });

    } catch (error) {
        // se der algum erro geral, retorna status 500 com a mensagem
        res.status(500).json({ erro: error.message });
    }
}

module.exports = { getDashboard }; // exporta a função para as rotas usarem