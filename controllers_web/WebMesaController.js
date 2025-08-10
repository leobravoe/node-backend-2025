const MesaModel = require("../models/MesaModel");

class WebMesaController {
    /**
     * Mostra uma tela com todos os recursos
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     */
    async index(req, res) {
        const mesas = await MesaModel.findAll();
        return res.render("mesa/index", { layout: "layouts/main", title: "Index de Mesa", mesas });
    }

    /**
     * Mostra um formulário para criação de um novo recurso
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     */
    async create(req, res) {
        return res.render("mesa/create", { layout: "layouts/main", title: "Create de Mesa" });
    }

    /**
     * Salva um novo recurso no banco de dados
     * @param {*} req Requisição da rota do express
     * @param {*} res Resposta da rota do express
     */
    async store(req, res) {
        const mesa = new MesaModel();
        mesa.numero = req.body.numero;
        mesa.estado = req.body.estado;
        const result = await mesa.save();
        return res.redirect("/mesa");
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

module.exports = new WebMesaController();

