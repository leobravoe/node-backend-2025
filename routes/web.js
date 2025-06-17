const express = require('express');
const router = express.Router();
const DataBase = require("../database/DataBase");

// Rota WEB index
router.get("/", async (request, response) => {
    return response.render("index");
});

// Rota WEB index de Produto
router.get("/produto", async (request, response) => {
    const produtos = await DataBase.executeSQLQuery(`
        SELECT Produto.*, 
               TipoProduto.descricao 
        FROM Produto 
        JOIN TipoProduto ON TipoProduto_id = TipoProduto.id;`
    );
    // [  {id: 1, nome: "Pepperoni", ...}, {id: 2, "Laranja", ...}, {id: 3, Skol - Lata, ...} ]
    // console.log(produtos);
    // return response.send(produtos);
    return response.render("produto/index", { produtos });
});

// Rota WEB index de TipoProduto
router.get("/tipoproduto", async (request, response) => {
    const tipoProdutos = await DataBase.executeSQLQuery("SELECT * FROM TipoProduto");
    return response.render("tipoproduto/index", { tipoProdutos });
});

// Rota WEB index de Recurso
router.get("/recurso", async (request, response) => {
    return response.render("recurso/index");
});

module.exports = router;