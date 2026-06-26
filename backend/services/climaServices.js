// services/climaService.js
const axios = require('axios');

// Função que busca os dados do clima na API Open-Meteo
const buscarClima = async (lat, lon) => {
    try {
        // URL da API externa
        const urlOpenMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

        // Faz a requisição para a API externa
        const resposta = await axios.get(urlOpenMeteo);
        const dados = resposta.data;

        // Formata os dados para o front-end
        const dadosFormatados = {
            atual: {
                temperatura: dados.current.temperature_2m,
                umidade: dados.current.relative_humidity_2m,
                vento: dados.current.wind_speed_10m
            },
            previsao: {
                data: dados.daily.time[1],
                max: dados.daily.temperature_2m_max[1],
                min: dados.daily.temperature_2m_min[1]
            }
        };

        return dadosFormatados;
    } catch (error) {
        console.error('Erro no Service:', error.message);
        throw new Error('Erro ao buscar dados do clima na API externa');
    }
};

module.exports = { buscarClima };