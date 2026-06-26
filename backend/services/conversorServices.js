const axios = require('axios');

const conversorMoeda = async (req, res) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
        return res.status(400).json({
            error: 'Parâmetros "from", "to" e "amount" são obrigatórios.'
        });
    }

    try {
        const url = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${from}`;
        const response = await axios.get(url);

        if (response.data.result !== 'success') {
            return res.status(500).json({ error: 'Erro ao consultar a API de câmbio.' });
        }

        const rate = response.data.conversion_rates[to];
        if (!rate) {
            return res.status(400).json({ error: `Moeda "${to}" não suportada.` });
        }

        const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
        res.json({ from, to, amount: parseFloat(amount), convertedAmount, rate });

    } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

module.exports = { conversorMoeda };