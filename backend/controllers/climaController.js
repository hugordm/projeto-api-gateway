const { buscarClima } = require('../services/climaServices');

// Função que responde à requisição GET /api/clima
const getClima = async (req, res) => {
    // 1. Pegar os parâmetros da URL
    const { lat, lon } = req.query;

    // 2. Validar se os parâmetros foram enviados
    if (!lat || !lon) {
        return res.status(400).json({
            erro: 'Parâmetros latitude e longitude são obrigatórios.'
        });
    }

    try {
        // 3. Chamar o Service para buscar os dados
        const dadosClima = await buscarClima(lat, lon);

        // 4. Retornar os dados para o front-end
        return res.status(200).json({
            mensagem: 'Dados do clima obtidos com sucesso!',
            dados: dadosClima
        });
    } catch (error) {
        // 5. Em caso de erro
        console.error('Erro no Controller:', error.message);
        return res.status(500).json({
            erro: 'Erro ao consultar a API de clima externa.'
        });
    }
};

module.exports = { getClima };