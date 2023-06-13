const Database = require('../utils/database');

const conexao = new Database();

class TipoUsuModel {

    #tipoId;
    #tipoNome;

    get tipoId(){
        return this.#tipoId;
    }
    set tipoId(tipoId){
        this.#tipoId = tipoId;
    }

    get tipoNome(){
        return this.#tipoNome;
    }
    set tipoNome(tipoNome){
        this.#tipoNome = tipoNome;
    }

    constructor(tipoId,tipoNome) {
        this.#tipoId = tipoId;
        this.#tipoNome = tipoNome;
    }

    async listar() {
        let sql = 'SELECT * FROM tipousuario';
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(let i = 0; i<rows.length; i++){
            let row = rows[i];
            listaRetorno.push(
                new TipoUsuModel(row["tipo_cod"],row["tipo_nome"])
            );
        }

        return listaRetorno;
    }

}

module.exports = TipoUsuModel;