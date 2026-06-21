const { Router } = require("express");
const { getDashboard } = require("../services/dashboardService");

const router = Router();

router.get("/dashboard", getDashboard);

module.exports = router;