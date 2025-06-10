// O objeto desse arquivo é configurar as rotas web
const express = require('express');
const router = express.Router();
const DataBase = require("../database/DataBase");

// Ainda não é uma rota WEB
router.get("/", async (request, response) => {
    return response.send("Seja bem vindo.");
});

// Ainda não é uma rota WEB
router.get("/produto", async (request, response) => {
    const result = await DataBase.executeSQLQuery("SELECT * FROM Produto");
    return response.send(result);
});

module.exports = router;