const TipoProdutoModel = require("../models/TipoProdutoModel");

class WebTipoProdutoController {
    /**
     * Mostra uma tela com todos os recursos
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     */
    async index(req, res) {
        const tipoProdutos = await TipoProdutoModel.findAll();
        return res.render("tipoproduto/index", { layout: "layouts/main", title: "Index de TipoProduto", tipoProdutos });
    }

    /**
     * Mostra um formulário para criação de um novo recurso
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     */
    async create(req, res) {
        return res.render("tipoproduto/create", { layout: "layouts/main", title: "Create de TipoProduto" });
    }

    /**
     * Salva um novo recurso no banco de dados
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     */
    async store(req, res) {
        const tipoProduto = new TipoProdutoModel();
        tipoProduto.descricao = req.body.descricao;
        const result = await tipoProduto.save();
        return res.redirect("/tipoproduto");
    }

    /**
     * Mostra um recurso específico
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
     */
    async show(req, res) {
    }

    /**
     * Mostra um formulário para editar um recurso específico
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
     */
    async edit(req, res) {
    }

    /**
     * Atualiza um recurso existente no banco de dados
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
     */
    async update(req, res) {
    }

    /**
     * Remove um recurso existente do banco de dados
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
     */
    async destroy(req, res) {
    }
}

module.exports = new WebTipoProdutoController();

