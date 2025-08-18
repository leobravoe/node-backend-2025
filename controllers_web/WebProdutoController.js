const ProdutoModel = require("../models/ProdutoModel");
const TipoProdutoModel = require("../models/TipoProdutoModel");

class WebProdutoController {
    /**
     * Mostra uma tela com todos os recursos
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     */
    async index(req, res) {
        const produtos = await ProdutoModel.findAllWithTipoProdutoDescricao();
        return res.render("produto/index", { layout: "layouts/main", title: "Index de Produto", produtos });
    }

    /**
    * Mostra um formulário para criação de um novo recurso
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async create(req, res) {
        const tipoProdutos = await TipoProdutoModel.findAll();
        return res.render("produto/create", { layout:"layouts/main", title: "Create de Produto", tipoProdutos });
    }

    /**
    * Salva um novo recurso no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async store(req, res) {
        const produto = new ProdutoModel();
        produto.numero = req.body.numero;
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.TipoProduto_id = req.body.TipoProduto_id;
        produto.ingredientes = req.body.ingredientes;
        const result = await produto.save();
        return res.redirect("/produto");
    }

    /**
    * Mostra um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async show(req, res) {
        return res.send(`Show - Parâmetro submetido: ${req.params.produtoId}`);
    }

    /**
    * Mostra um formulário para editar um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async edit(req, res) {
        return res.send(`Edit - Parâmetro submetido: ${req.params.produtoId}`);
    }

    /**
    * Atualiza um recurso existente no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async update(req, res) {
    }

    /**
    * Remove um recurso existente do banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
        const produto = await ProdutoModel.findOne(req.params.produtoId);
        return res.send(produto);
    }
}
module.exports = new WebProdutoController();