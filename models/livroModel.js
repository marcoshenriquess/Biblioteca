const Database = require('../utils/database');

const conexao = new Database();

class LivroModel {

    #livroId;
    #livroTitulo;
    #livroEdicao;
    #livroAno;
    #livroEditora;

    get livroId(){
        return this.#livroId;
    }

    set livroId(livroId) {
        this.#livroId = livroId;
    }
    
    get livroTitulo(){
        return this.#livroTitulo;
    }

    set livroTitulo(livroTitulo) {
        this.#livroTitulo = livroTitulo;
    }

    get livroEditora(){
        return this.#livroEditora;
    }

    set livroEditora(livroEditora) {
        this.#livroEditora = livroEditora;
    }

    get livroEdicao(){
        return this.#livroEdicao;
    }

    set livroEdicao(livroEdicao) {
        this.#livroEdicao = livroEdicao;
    }    

    get livroAno(){
        return this.#livroAno;
    }

    set livroAno(livroAno) {
        this.#livroAno = livroAno;
    }    

    
    
    constructor(livroId, livroTitulo, livroEdicao, livroAno, livroEditora){
        this.#livroId = livroId;
        this.#livroTitulo = livroTitulo;
        this.#livroEdicao = livroEdicao;
        this.#livroAno = livroAno;
        this.#livroEditora = livroEditora;
    }

    async buscarLivro(id){
        let sql = "select * from titulo where tit_cod = ?"
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return new LivroModel(rows[0]["tit_cod"],rows[0]["tit_nome"],rows[0]["tit_edicao"],rows[0]["tit_ano"],rows[0]["editora_cod"]);
        }
        return null;
    }

    async listarlivros() {
        let sql = "select * from titulo";
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new LivroModel(row["tit_cod"], row["tit_nome"], row["tit_edicao"],row["tit_ano"],row["editora_cod"]));
        }

        return listaRetorno;
    }

    async gravarLivro() {
        let result = false;
        if(this.#livroId == 0){
            let sql = "insert into titulo (tit_nome, tit_edicao, tit_ano, editora_cod) values (?, ?, ?, ?)";
            let valores = [this.#livroTitulo, this.#livroEdicao, this.#livroAno, this.#livroEditora];
    
            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            let sql = "update titulo set tit_nome = ?, tit_edicao = ?, tit_ano = ?, editora_cod = ?";
            let valores = [this.#livroTitulo, this.#livroEdicao, this.#livroAno, this.#livroEditora];

            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        return result;
    }

    async deletarLivro(livroId) {
        let sql = "delete from titulo where tit_cod = ?"
        let valores = [livroId];

        let result = conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}
module.exports = LivroModel;