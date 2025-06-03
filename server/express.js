const express = require('express');
const dotenv = require('dotenv');
const app = express();
const DataBase = require('../database/DataBase');

// Configura as variáveis de ambiente
dotenv.config();

// Request é o que vem do navegador
// Response é o que manda para o navegador
app.get('/', async (request, response) => {
    const result = await DataBase.executeSQLQuery("SELECT * FROM Produto");
    response.send(result);
});

// Guardando dentro da variável app uma propriedade
app.set("port", process.env.PORT || 5000);

module.exports = app;