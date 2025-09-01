const ProdutoModel = require("../models/ProdutoModel");
const TipoProdutoModel = require("../models/TipoProdutoModel");

class WebProdutoController {
    /**
     * Mostra uma tela com todos os recursos
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     */
    async index(req, res) {
        try {
            const produtos = await ProdutoModel.findAllWithTipoProdutoDescricao();
            const mensagem = ['success', 'O produto foi salvo'];
            return res.render("produto/index", { layout: "layouts/main", title: "Index de Produto", produtos, mensagem });
        } catch (error) {
            return res.send(error);
        }
    }

    /**
    * Mostra um formulário para criação de um novo recurso
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async create(req, res) {
        const tipoProdutos = await TipoProdutoModel.findAll();
        return res.render("produto/create", { layout: "layouts/main", title: "Create de Produto", tipoProdutos });
    }

    /**
    * Salva um novo recurso no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    */
    async store(req, res) {
        const produto = new ProdutoModel();
        console.log(req.body);
        console.log(req.file);
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
        const produto = await ProdutoModel.findOneWithTipoProdutoDescricao(req.params.produtoId);
        return res.render("produto/show", { layout: "layouts/main", title: "Show de Produto", produto });
    }

    /**
    * Mostra um formulário para editar um recurso específico
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async edit(req, res) {
        const tipoProdutos = await TipoProdutoModel.findAll();
        const produto = await ProdutoModel.findOne(req.params.produtoId);
        return res.render("produto/edit", { layout: "layouts/main", title: "Edit de Produto", produto, tipoProdutos });
    }

    /**
    * Atualiza um recurso existente no banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async update(req, res) {
        const produto = await ProdutoModel.findOne(req.params.produtoId);
        if (produto) {
            produto.numero = req.body.numero;
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.TipoProduto_id = req.body.TipoProduto_id;
            produto.ingredientes = req.body.ingredientes;
            const result = await produto.update();
        }
        res.redirect("/produto");
    }

    /**
    * Remove um recurso existente do banco de dados
    * @param {*} req Requisição da rota do express
    * @param {*} res Resposta da rota do express
    * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
    */
    async destroy(req, res) {
        const produto = await ProdutoModel.findOne(req.params.produtoId);
        if (produto) {
            const result = await produto.delete();
        }
        return res.redirect("/produto");
    }
}
module.exports = new WebProdutoController();