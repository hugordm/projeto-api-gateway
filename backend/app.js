require("dotenv").config(); // carrega as variáveis do .env
const express = require("express"); // framework para criar o servidor
const cors = require("cors"); // permite o front-end se comunicar com o back-end
const dashboardRoutes = require("./routes/dashboard"); // importa as rotas

const app = express(); // cria a aplicação
const port = 8000; // porta do servidor

app.use(cors()); // habilita o CORS para todas as origens
app.use(express.json()); // permite receber JSON no body das requisições
app.use("/api", dashboardRoutes); // conecta as rotas ao caminho /api

// inicia o servidor na porta 8000
app.listen(port, () => {
    console.log(`Servidor BFF rodando na porta ${port}!`);
});