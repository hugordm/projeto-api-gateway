const axios = require('axios'); // biblioteca para fazer requisições HTTP

// converte o nome da cidade em coordenadas geográficas (lat e lon)
const getGeocoding = async (req, res) => {
    const { cidade } = req.query;

    if (!cidade) {
        return res.status(400).json({ erro: 'Parâmetro cidade é obrigatório.' });
    }

    try {
        const resposta = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${process.env.CLIMA_API_KEY}`
        );

        if (resposta.data.length === 0) {
            return res.status(404).json({ erro: 'Cidade não encontrada.' });
        }

        const { name, lat, lon, state, country } = resposta.data[0];
        res.json({ name, lat, lon, state, country });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// converte coordenadas geográficas em nome da cidade (Reverse Geocoding)
const getReverseGeocoding = async (req, res) => {
    const { lat, lon } = req.query; // pega lat e lon da URL

    if (!lat || !lon) {
        return res.status(400).json({ erro: 'Parâmetros lat e lon são obrigatórios.' });
    }

    try {
        // chama a API de Reverse Geocoding do OpenWeatherMap
        const resposta = await axios.get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.CLIMA_API_KEY}`
        );

        if (resposta.data.length === 0) {
            return res.status(404).json({ erro: 'Cidade não encontrada.' });
        }

        // retorna o nome da cidade para o front-end preencher o campo
        const { name, state, country } = resposta.data[0];
        res.json({ name, state, country });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

module.exports = { getGeocoding, getReverseGeocoding }; // exporta as duas funções