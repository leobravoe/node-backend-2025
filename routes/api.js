const express = require('express');
const router = express.Router();
const TipoProdutoModel = require("../models/TipoProdutoModel");
const ProdutoModel = require("../models/ProdutoModel");

router.get("/api/produto", async (request, response) => {
    const result = await ProdutoModel.findAll();
    return response.send(result);
});
router.get("/api/tipoproduto", async (request, response) => {
    const result = await TipoProdutoModel.findAll();
    return response.send(result);
});

module.exports = router;