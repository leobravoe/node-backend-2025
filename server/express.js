// O objeto desse arquivo é configurar o servidor express
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const webRoutes = require("../routes/web");
const apiRoutes = require("../routes/api");

// Configura as variáveis de ambiente
dotenv.config();

// Guardando dentro da variável app uma propriedade
app.set("port", process.env.PORT || 5000);

// Define as rotas
app.use(webRoutes);
app.use(apiRoutes);

module.exports = app;
