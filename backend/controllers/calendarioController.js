const axios = require('axios'); // biblioteca para fazer requisições HTTP

// busca os feriados nacionais do ano atual via BrasilAPI
const getFeriados = async (req, res) => {
    try {
        // pega o ano da URL ou usa o ano atual como padrão
        const ano = req.query.ano || new Date().getFullYear();

        // chama a BrasilAPI — pública e sem chave
        const resposta = await axios.get(
            `https://brasilapi.com.br/api/feriados/v1/${ano}`
        );

        // retorna os feriados para o front-end
        res.json(resposta.data);

    } catch (error) {
        // se der erro retorna status 500
        res.status(500).json({ erro: error.message });
    }
};

module.exports = { getFeriados }; // exporta para as rotas usarem