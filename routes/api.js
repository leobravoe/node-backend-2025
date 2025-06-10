const express = require('express');
const router = express.Router();
const DataBase = require("../database/DataBase");

router.get("/api/produto", async (request, response) => {
    const result = await DataBase.executeSQLQuery("SELECT * FROM Produto");
    return response.send(result);
});

module.exports = router;