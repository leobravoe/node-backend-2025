// O objetivo deste arquivo é configurar o servidor do express
const express = require('express');
const methodOverride = require("method-override");
const HbsConfigureCustomHelpers = require("../hbs_config/HbsConfigureCustomHelpers");
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

// Configura os CustomHelpers do pacote hbs
HbsConfigureCustomHelpers.run();

// Define as rotas estáticas para os arquivos da pasta /public
app.use(express.static("./public"));

// Define uma rota estática /upload, para manter arquivos enviados (ex.: /uploads/produtos/yyy.jpg)
app.use("/uploads", express.static("./uploads"));

// Middleware do Express que é usado para fazer o parsing dos dados enviados pelo cliente através de formulários HTML
app.use(express.urlencoded({ extended: false }));

// Configura o method-override no express para poder usar put ou delete nos <form> do HTML
app.use(methodOverride(req => req.body?._method?.toUpperCase() || req.query?._method?.toUpperCase())); // lê _method do body e da query

// Define as rotas
app.use(webRoutes);
app.use(apiRoutes);

module.exports = app;
