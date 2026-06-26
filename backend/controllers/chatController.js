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

        // URL do histórico do dólar em 2026 para análise de tendência
        const HISTORICO_URL = `https://api.frankfurter.app/2026-01-01..${new Date().toISOString().split("T")[0]}?from=USD&to=BRL`;

        // URL dos feriados nacionais do ano atual
        const FERIADOS_URL = `https://brasilapi.com.br/api/feriados/v1/${new Date().getFullYear()}`;

        // busca todas as APIs em paralelo — Promise.allSettled garante que
        // nenhuma falha vai derrubar o chatbot
        const [climaResult, moedasResult, historicoResult, feriadosResult] = await Promise.allSettled([
            axios.get(CLIMA_URL),
            axios.get(MOEDAS_URL),
            axios.get(HISTORICO_URL),
            axios.get(FERIADOS_URL)
        ]);

        // pega os dados ou null se falhar
        const clima = climaResult.status === "fulfilled" ? climaResult.value.data : null;
        const moedasData = moedasResult.status === "fulfilled" ? moedasResult.value.data : null;
        const historicoData = historicoResult.status === "fulfilled" ? historicoResult.value.data : null;
        const feriadosData = feriadosResult.status === "fulfilled" ? feriadosResult.value.data : null;

        // monta o resumo de todas as moedas disponíveis
        const moedasResumo = moedasData
            ? Object.entries(moedasData.rates).map(([cod, val]) => `${cod}: ${val}`).join(", ")
            : "indisponível";

        // calcula tendência e variação do histórico do dólar
        let tendenciaResumo = "indisponível";
        if (historicoData) {
            const historico = Object.entries(historicoData.rates);
            const primeiro = historico[0]; // valor mais antigo
            const ultimo = historico[historico.length - 1]; // valor mais recente

            // pega todos os valores para calcular máxima e mínima
            const valores = historico.map(([, v]) => v.BRL);
            const maxima = Math.max(...valores).toFixed(4);
            const minima = Math.min(...valores).toFixed(4);

            // calcula variação percentual no período
            const variacao = (((ultimo[1].BRL - primeiro[1].BRL) / primeiro[1].BRL) * 100).toFixed(2);
            const tendencia = variacao >= 0 ? "subiu" : "caiu";

            tendenciaResumo = `De R$ ${primeiro[1].BRL} (${primeiro[0]}) para R$ ${ultimo[1].BRL} (${ultimo[0]}). O dólar ${tendencia} ${Math.abs(variacao)}% no período. Máxima: R$ ${maxima} | Mínima: R$ ${minima}`;
        }

        // pega os próximos 3 feriados a partir de hoje
        const hoje = new Date().toISOString().split("T")[0];
        const proximosFeriados = feriadosData
            ? feriadosData.filter(f => f.date >= hoje).slice(0, 3).map(f => `${f.name} (${f.date})`).join(", ")
            : "indisponível";

        // monta o contexto completo com todos os dados reais para a Claude
        const contexto = `
            Você é um assistente financeiro e meteorológico inteligente.
            Responda a pergunta do usuário com base nos dados abaixo em português.
            Seja direto e objetivo.

            Dados atuais:
            - Clima em ${cidade_}: ${clima ? `${clima.main.temp}°C, ${clima.weather[0].description}, umidade ${clima.main.humidity}%` : "indisponível"}
            - Moedas (em relação ao USD): ${moedasResumo}
            - Moeda de interesse do usuário: ${moeda_}
            - Histórico do dólar em 2026: ${tendenciaResumo}
            - Próximos feriados nacionais: ${proximosFeriados}

            Pergunta do usuário: ${pergunta}
        `;

        // chama a Claude com o contexto completo e a pergunta
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
                moedas: moedasResumo,
                tendenciaDolar: tendenciaResumo,
                proximosFeriados
            }
        });

    } catch (error) {
        // se der erro retorna status 500 com a mensagem
        res.status(500).json({ erro: error.message });
    }
};

module.exports = { chat }; // exporta a função para as rotas usarem