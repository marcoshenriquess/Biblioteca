const Database = require('../utils/database');

const conexao = new Database();

class ExemplarModel  {

    #exemplarCod;
    #exemplarNumero;
    #exemplarStatus;
    #exemplarEdicao;
    #exemplarAno;
    #exemplarBaixas;
    #exemplarEntradas;

    get exemplarCod(){
        return this.#exemplarCod;
    }

    set exemplarCod(exemplarCod) {
        this.#exemplarCod = exemplarCod;
    }
    
    get exemplarNumero(){
        return this.#exemplarNumero;
    }

    set exemplarNumero(exemplarNumero) {
        this.#exemplarNumero = exemplarNumero;
    }

    get exemplarStatus(){
        return this.#exemplarStatus;
    }

    set exemplarStatus(exemplarStatus) {
        this.#exemplarStatus = exemplarStatus;
    }    

    get exemplarEdicao(){
        return this.#exemplarEdicao;
    }

    set exemplarEdicao(exemplarEdicao) {
        this.#exemplarEdicao = exemplarEdicao;
    }    

    get exemplarAno(){
        return this.#exemplarAno;
    }

    set exemplarAno(exemplarAno) {
        this.#exemplarAno = exemplarAno;
    }

    get exemplarBaixas(){
        return this.#exemplarBaixas;
    }

    set  exemplarBaixas(exemplarBaixas) {
        this.#exemplarBaixas = exemplarBaixas;
    }

    get exemplarEntradas(){
        return this.#exemplarEntradas;
    }

    set  exemplarEntradas(exemplarEntradas) {
        this.#exemplarEntradas = exemplarEntradas;
    }

    
    constructor(exemplarCod, exemplarNumero, exemplarStatus, exemplarEdicao, exemplarAno){
        this.#exemplarCod = exemplarCod;
        this.#exemplarStatus = exemplarStatus;
        this.#exemplarEdicao = exemplarEdicao;
        this.#exemplarAno = exemplarAno;
        this.#exemplarNumero = exemplarNumero;
    }

    async buscarLivro(id){
        let sql = "select * from titulo where tit_cod = ?"
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return new LivroModel(rows[0]["tit_cod"],rows[0]["tit_titulo"],rows[0]["tit_descricao"],rows[0]["tit_sinopse"],rows[0]["tit_editora"]);
        }
        return null;
    }

    async listarlivros() {
        let sql = "select * from titulo";
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new LivroModel(row["tit_cod"], row["tit_titulo"], row["tit_descricao"],row["tit_sinopse"],row["tit_editora"]));
        }

        return listaRetorno;
    }

    async gravarExemplar() {
        let result = false;
        if(this.#exemplarCod == 0){
            //Função de cadastro
            let sql = "insert into exemplares (tit_titulo, tit_descricao, tit_sinopse, tit_editora) values (?, ?, ?, ?)";
            let valores = [this.#exemplarNumero, this.#exemplarStatus, this.#exemplarEdicao, this.#exemplarAno];
    
            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            //Função de update
            let sql = "update titulo set tit_titulo = ?, tit_descricao = ?, tit_sinopse = ?, tit_editora = ?";
            let valores = [this.#exemplarNumero, this.#exemplarStatus, this.#exemplarEdicao, this.#exemplarAno];

            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        return result;
    }

    async deletarLivro(exemplarCod) {
        let sql = "delete from titulo where tit_cod = ?"
        let valores = [exemplarCod];

        let result = conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}
module.exports = LivroModel;