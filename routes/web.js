const express = require('express');
const router = express.Router();
const TipoProdutoModel = require("../models/TipoProdutoModel");
const ProdutoModel = require("../models/ProdutoModel");

// Rota WEB index
router.get("/", async (request, response) => {
    return response.render("index");
});

// Rota WEB index de Produto
router.get("/produto", async (request, response) => {
    const produtos = await ProdutoModel.findAllWithTipoProdutoDescricao();
    return response.render("produto/index", { produtos });
});

// Rota WEB create de Produto
router.get("/produto/create", async (request, response) => {
    const tipoProdutos = await TipoProdutoModel.findAll();
    response.render("produto/create", { tipoProdutos });
});

// Rota WEB store de Produto
router.post("/produto", async (request, response) => {
    const produto = new ProdutoModel();
    produto.numero = request.body.numero;
    produto.nome = request.body.nome;
    produto.preco = request.body.preco;
    produto.TipoProduto_id = request.body.TipoProduto_id;
    produto.ingredientes = request.body.ingredientes;
    const result = await produto.save();
    response.redirect("/produto");
});

// Rota WEB index de TipoProduto
router.get("/tipoproduto", async (request, response) => {
    const tipoProdutos = await TipoProdutoModel.findAll();
    return response.render("tipoproduto/index", { tipoProdutos });
});

// Rota WEB create de TipoProduto
router.get("/tipoproduto/create", async (request, response) => {
    return response.render("tipoproduto/create");
});

// Rota WEB store de TipoProduto
router.post("/tipoproduto", async (request, response) => {
    const tipoProduto = new TipoProdutoModel();
    tipoProduto.descricao = request.body.descricao;
    const result = await tipoProduto.save();
    return response.redirect("/tipoproduto");
});

// Rota WEB index de Recurso
router.get("/recurso", async (request, response) => {
    return response.render("recurso/index");
});

module.exports = router;