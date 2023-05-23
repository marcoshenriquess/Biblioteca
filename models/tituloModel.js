const Database = require('../utils/database');
const fs = require('fs');

const conexao = new Database();

class TituloModel {

    #tituloCod;
    #tituloNome;
    #tituloEdicao;
    #tituloAno;
    #editoraCod;
    #tituloImagem;
    #editoraNome;

    get tituloCod() {
        return this.#tituloCod;
    }

    set tituloCod(tituloCod) {
        this.#tituloCod = tituloCod;
    }

    get tituloNome() {
        return this.#tituloNome;
    }

    set tituloNome(tituloNome) {
        this.#tituloNome = tituloNome;
    }

    get tituloNome() {
        return this.#tituloNome;
    }

    set tituloNome(tituloNome) {
        this.#tituloNome = tituloNome;
    }

    get tituloEdicao() {
        return this.#tituloEdicao;
    }

    set tituloEdicao(tituloEdicao) {
        this.#tituloEdicao = tituloEdicao;
    }

    get tituloAno() {
        return this.#tituloAno;
    }

    set tituloAno(tituloAno) {
        this.#tituloAno = tituloAno;
    }

    get editoraCod() {
        return this.#editoraCod;
    }

    set editoraCod(editoraCod) {
        this.#editoraCod = editoraCod;
    }

    get tituloImagem() {
        return this.#tituloImagem;
    }

    set tituloImagem(tituloImagem) {
        this.#tituloImagem = tituloImagem;
    }

    get editoraNome() {
        return this.#editoraNome;
    }

    set editoraNome(editoraNome) {
        this.#editoraNome = editoraNome;
    }

    constructor(tituloCod, tituloNome, tituloEdicao, tituloAno, editoraCod, tituloImagem, editoraNome) {
        this.#tituloCod = tituloCod;
        this.#tituloNome = tituloNome;
        this.#tituloEdicao = tituloEdicao;
        this.#tituloAno = tituloAno;
        this.#editoraCod = editoraCod;
        this.#tituloImagem = tituloImagem;
        this.#editoraNome = editoraNome;
    }

    async buscarTitulo(tituloCod) {
        let sql = 'select * from titulo t inner join editora ed on t.editora_cod = ed.ed_cod where tit_cod = ?';
        let valores = [tituloCod];
        let rows = await conexao.ExecutaComando(sql, valores);
        var titulo = [];
        console.log("titulocod dentro do buscarTitulo da model: ", tituloCod, rows.length)

        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                var row = rows[i];

                let titImagem = row["tit_imagem"];
                if (titImagem != null && titImagem != "") {
                    if (fs.existsSync(global.RAIZ_PROJETO + "/public" + global.TITULO_IMG_CAMINHO + titImagem) == false) {
                        titImagem = "sem-imagem.png";
                    }
                }
                else {
                    titImagem = "sem-imagem.png"
                }

                titulo.push(new TituloModel());

                titImagem = global.TITULO_IMG_CAMINHO + titImagem;
                titulo = new TituloModel(row["tit_cod"], row["tit_nome"], row["tit_edicao"], row["tit_ano"], row["editora_cod"], row["tit_imagem"], row["ed_nome"]);
            }
        }
        console.log("esse é o titulo: ", titulo.tituloCod);
        return titulo;
    }

    async listarTitulos() {
        let sql = 'select * from titulo t inner join editora ed on t.editora_cod = ed.ed_cod';
        let rows = await conexao.ExecutaComando(sql);

        let listaTitulos = [];

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            listaTitulos.push(
                new TituloModel(row['tit_cod'], row['tit_nome'], row['tit_edicao'], row['tit_ano'], row['editora_cod'], row['tit_imagem'], row['ed_nome'])
            );
        }

        return listaTitulos;
    }

    async gravarTitulo() {
        let result = false;

        if (this.#tituloCod == 0) {
            let sql = "insert into titulo (tit_nome, tit_edicao, tit_ano, editora_cod, tit_imagem) values (?, ?, ?, ?, ?)";
            let valores = [this.#tituloNome, this.#tituloEdicao, this.#tituloAno, this.#editoraCod, this.#tituloImagem];

            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else {
            let sql = "update titulo set tit_nome = ?, tit_edicao = ?, tit_ano = ?, editora_cod = ?, tit_imagem = ? where tit_cod = ?";
            let valores = [this.#tituloNome, this.#tituloEdicao, this.#tituloAno, this.#editoraCod, this.#tituloImagem, this.#tituloCod];

            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }

        return result;
    }

    async deletarTitulo(tituloCod) {
        let sql = "delete from titulo where tit_cod = ?"
        let valores = [tituloCod];
        console.log(tituloCod)
        let result = conexao.ExecutaComandoNonQuery(sql, valores);
        console.log("passei por aqui");
        return result;
    }

}
module.exports = TituloModel;