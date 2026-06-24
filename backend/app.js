require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const port = 8000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET"],
}));
app.use(express.json());
app.use("/api", dashboardRoutes);

app.listen(port, () => {
    console.log(`Servidor BFF rodando na porta ${port}!`);
});