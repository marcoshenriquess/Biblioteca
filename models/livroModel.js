const Database = require('../utils/database');

const conexao = new Database();

class LivroModel {

    #livroId;
    #livroTitulo;
    #livroDescricao;
    #livroSinopse;
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

    get livroDescricao(){
        return this.#livroDescricao;
    }

    set livroDescricao(livroDescricao) {
        this.#livroDescricao = livroDescricao;
    }    

    get livroSinopse(){
        return this.#livroSinopse;
    }

    set livroSinopse(livroSinopse) {
        this.#livroSinopse = livroSinopse;
    }    

    get livroEditora(){
        return this.#livroEditora;
    }

    set livroEditora(livroEditora) {
        this.#livroEditora = livroEditora;
    }
    
    constructor(livroId, livroTitulo, livroDescricao, livroSinopse, livroEditora){
        this.#livroId = livroId;
        this.#livroTitulo = livroTitulo;
        this.#livroDescricao = livroDescricao;
        this.#livroSinopse = livroSinopse;
        this.#livroEditora = livroEditora;
    }

    async buscarLivro(id){
        let sql = "select * from titulo where tit_cod = ?"
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return new LivroModel(rows[0]["tit_cod"],rows[0]["descricao"],rows[0]["sinopse"],rows[0]["editora_cod"],rows[0]["tit_titulo"],rows[0]["tit_editora"]);
        }
        return null;
    }

    async listarlivros() {
        let sql = "select * from titulo";
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new LivroModel(row["tit_cod"], row["descricao"],row["sinopse"],row["editora_cod"],rows["tit_titulo"],rows["tit_editora"]));
        }

        return listaRetorno;
    }

    async gravarLivro() {
        let result = false;
        if(this.#livroId == 0){
            let sql = "insert into titulo (tit_cod, descricao, sinopse, editora_cod) values (?, ?, ?, ?)";
            let valores = [this.#livroTitulo, this.#livroDescricao, this.#livroSinopse, this.#livroEditora];
    
            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            let sql = "update titulo set tit_cod = ?, descricao = ?, sinopse = ?, editora_cod = ?, where tit_cod = ?";
            let valores = [this.#livroTitulo, this.#livroDescricao, this.#livroSinopse, this.#livroEditora];

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