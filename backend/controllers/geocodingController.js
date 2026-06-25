const axios = require('axios'); // biblioteca para fazer requisições HTTP

// converte o nome da cidade em coordenadas geográficas (lat e lon)
const getGeocoding = async (req, res) => {
    const { cidade } = req.query; // pega o nome da cidade da URL (?cidade=Recife)

    // valida se o parâmetro foi enviado
    if (!cidade) {
        return res.status(400).json({ erro: 'Parâmetro cidade é obrigatório.' });
    }

    try {
        // chama a API de Geocoding do OpenWeatherMap com a chave do .env
        const resposta = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${process.env.CLIMA_API_KEY}`
        );

        // se a cidade não foi encontrada retorna 404
        if (resposta.data.length === 0) {
            return res.status(404).json({ erro: 'Cidade não encontrada.' });
        }

        // extrai apenas os campos necessários do JSON
        const { name, lat, lon, state, country } = resposta.data[0];

        // retorna as coordenadas para o front-end centralizar o mapa
        res.json({ name, lat, lon, state, country });

    } catch (error) {
        // se der erro retorna status 500 com a mensagem
        res.status(500).json({ erro: error.message });
    }
};

module.exports = { getGeocoding }; // exporta para as rotas usarem