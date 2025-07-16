const DataBase = require("../database/DataBase");

class MesaModel {
    /** 
     * Os atributos da classe Model precisam ser correspondentes Ã s colunas do banco de dados.
     */
    id = null;
    numero = null;
    estado = null;
    dataAtualizacao = null;
    dataCriacao = null;

    /**
     * Construtor da Classe MesaModel
     * @param {MesaModel}     mesa     O objeto de entrada Ã© simples (precisa conter apenas chave e valor, sem mÃ©todos) e precisa conter as chaves: id, numero, estado, dataAtualizacao e dataCriacao. Esses campos sÃ£o as colunas da tabela no banco de dados. Caso nÃ£o passe um objeto com esses campos, um model vazio serÃ¡ criado.
     */
    constructor(mesa) {
        if (mesa &&
            "id" in mesa &&
            "numero" in mesa &&
            "estado" in mesa &&
            "dataAtualizacao" in mesa &&
            "dataCriacao" in mesa
        ) {
            this.id = mesa.id;
            this.numero = mesa.numero;
            this.estado = mesa.estado;
            this.dataAtualizacao = mesa.dataAtualizacao;
            this.dataCriacao = mesa.dataCriacao;
        }
    }

    /**
     * Busca um objeto MesaModel no banco de dados
     * @param  {Number}        id      ID da mesa a ser procurada no banco de dados.
     * @return {MesaModel}             Retorna um objeto MesaModel com as informaÃ§Ãµes encontradas, caso nÃ£o encontre, retorna null.
     */
    static async findOne(id) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Mesa WHERE Mesa.id = ?`, [id]);
        if (result && result.length == 1)
            return new MesaModel(result[0]);
        return null;
    }

    /**
     * Busca todos objetos MesaModel no banco de dados.
     * @return {[MesaModel, ...]} Retorna um array com objetos MesaModel que contÃ©m apenas as informaÃ§Ãµes encontradas, caso nÃ£o encontre, retorna um array vazio [].
     */
    static async findAll() {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Mesa`);
        if (result && result.length > 0) {
            // Transforma um array de Mesa [Mesa, ...] em uma array de MesaModel [MesaModel, ...]
            const modelArray = result.map(function (obj) {
                obj = new MesaModel(obj);
                return obj;
            });
            return modelArray;
        }
        return [];
    }

    /**
     * Salva um objeto MesaModel no banco de dados. O atributo que deve ser informado: "numero", "estado". Os atributos: "id" "dataAtualizacao" e "dataCriacao" sÃ£o criados automaticamente.
     * @returns {MesaModel} Retorna um objeto MesaModel com as informaÃ§Ãµes recÃ©m inseridas no banco de dados.
     */
    async save() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horÃ¡rio atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`INSERT INTO Mesa VALUES (null, ?, ?, ?, ?);`,
            [
                this.numero,
                this.estado,
                timestamp,
                timestamp
            ]
        );
        const mesa = await DataBase.executeSQLQuery(`SELECT * FROM Mesa WHERE Mesa.id = ?`, [result.insertId]);
        return new MesaModel(mesa[0]);
    }

    /**
     * Atualiza um objeto MesaModel no banco de dados. O atributo que deve ser informado: "numero", "estado". O atributo: "dataAtualizacao" Ã© atualizado automaticamente. Os atributos: "id" e "dataCriacao" nÃ£o sÃ£o alterados.
     * @returns {TipoProdutoModel} Retorna um objeto TipoProdutoModel com as informaÃ§Ãµes atualizadas no banco de dados.
     */
    async update() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horÃ¡rio atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`UPDATE Mesa
                                                           SET numero = ?,
                                                               estado = ?,
                                                               dataAtualizacao = ?
                                                           WHERE Mesa.id = ?`,
            [
                this.numero,
                this.estado,
                timestamp,
                this.id
            ]
        );
        const mesa = await DataBase.executeSQLQuery(`SELECT * FROM Mesa WHERE Mesa.id = ?`, [this.id]);
        return new MesaModel(mesa[0]);
    }

    /**
     * Deleta um objeto MesaModel no banco de dados.
     * @returns {MesaModel} Retorna um objeto MesaModel com as informaÃ§Ãµes removidas banco de dados.
     */
    async delete() {
        const result = await DataBase.executeSQLQuery(`DELETE FROM Mesa WHERE Mesa.id = ?`, [this.id]);
        return this;
    }
}

module.exports = MesaModel;