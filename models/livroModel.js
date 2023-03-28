const Database = require('../utils/database');

const conexao = new Database();

class LivroModel {

    #livroId;
    #livroTitulo;
    #livroEdicao;
    #livroAutor;
    #livroLancamento
    #livroEditora;
    #livroUnidade;
    #livroGenero;

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

    get livroEdicao(){
        return this.#livroEdicao;
    }

    set livroEdicao(livroEdicao) {
        this.#livroEdicao = livroEdicao;
    }

    get livroAutor(){
        return this.#livroAutor;
    }

    set livroAutor(livroAutor) {
        this.#livroAutor = livroAutor;
    } 

    get livroLancamento(){
        return this.#livroLancamento;
    }

    set livroLancamento(livroLancamento) {
        this.#livroLancamento = livroLancamento;
    }

    get livroEditora(){
        return this.#livroEditora;
    }

    set livroEditora(livroEditora) {
        this.#livroEditora = livroEditora;
    }

    get livroUnidade(){
        return this.#livroUnidade;
    }

    set livroUnidade(livroUnidade) {
        this.#livroUnidade = livroUnidade;
    }

    get livroGenero(){
        return this.#livroGenero;
    }

    set livroGenero(livroGenero) {
        this.#livroGenero= livroGenero;
    } 
    
    constructor(livroId, livroTitulo, livroEdicao, livroAutor, livroLancamento, livroEditora, livroUnidade, livroGenero){
        this.#livroId = livroId;
        this.#livroTitulo = livroTitulo;
        this.#livroEdicao = livroEdicao;
        this.#livroAutor = livroAutor;
        this.#livroLancamento = livroLancamento;
        this.#livroEditora = livroEditora;
        this.#livroUnidade = livroUnidade;
        this.#livroGenero = livroGenero;
    }

    async buscarLivro(id){
        let sql = "select * from tb_livros where liv_id = ?"
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return new LivroModel(rows[0]["liv_id"],rows[0]["liv_titulo"],rows[0]["liv_edicao"],rows[0]["liv_autor"],rows[0]["liv_lancamento"],rows[0]["liv_editora"],rows[0]["liv_unidade"],rows[0]["liv_genero"]);
        }
        return null;
    }

    async listarlivros() {
        let sql = "select * from tb_livros";
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new LivroModel(row["liv_id"], row["liv_titulo"],row["liv_edicao"],row["liv_autor"],row["liv_lancamento"],row["liv_editora"],row["liv_unidade"],row["liv_genero"]));
        }

        return listaRetorno;
    }

    async gravarUsuario() {
        let result = false;
        if(this.#livroId == 0){
            let sql = "insert into tb_livros (liv_titulo, liv_edicao, liv_autor, liv_lancamento, liv_editora, liv_unidade, liv_genero) values (?, ?, ?, ?, ?, ?, ?)";
            let valores = [this.#livroTitulo, this.#livroEdicao, this.#livroAutor, this.#livroLancamento, this.#livroEditora, this.#livroUnidade, this.#livroGenero];
    
            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            let sql = "update tb_livros set liv_titulo = ?, liv_edicao = ?, liv_autor = ?, liv_lancamento = ?, liv_editora = ?, liv_unidade = ?, liv_genero = ? ,where liv_id = ?";
            let valores = [this.#livroTitulo, this.#livroEdicao, this.#livroAutor, this.#livroLancamento, this.#livroEditora, this.#livroUnidade, this.#livroGenero];

            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }

        return result;

    }

    async deletarLivro(livroId) {
        let sql = "delete from tb_livros where liv_id = ?"
        let valores = [livroId];

        let result = conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = LivroModel;