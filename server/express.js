// O objetivo deste arquivo é configurar o servidor do express
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const webRoutes = require("../routes/web");
const apiRoutes = require("../routes/api");

// Configura as variáveis de ambiente
dotenv.config();

// Guardando dentro da variável app uma propriedade
app.set("port", process.env.PORT || 5000);

// Seto a propriedade "view engine" do express com "hbs"
app.set("view engine", "hbs");

// Define as rotas estáticas para os arquivos da pasta /public
app.use(express.static("./public"));

// Middleware do Express que é usado para fazer o parsing dos dados enviados pelo cliente através de formulários HTML
app.use(express.urlencoded({ extended: false }));

// Define as rotas
app.use(webRoutes);
app.use(apiRoutes);

module.exports = app;
