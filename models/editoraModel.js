const Database = require('../utils/database');

const conexao = new Database();

class EditoraModel {
    #editoraCod;
    #editoraNome;

    constructor(editoraCod, editoraNome) {
        this.#editoraCod = editoraCod;
        this.#editoraNome = editoraNome;
    }

    get editoraCod() {
        return this.#editoraCod;
    }

    set editoraCod(editoraCod) {
        this.#editoraCod = editoraCod;
    }

    get editoraNome() {
        return this.#editoraNome;
    }

    set editoraNome(editoraNome) {
        this.#editoraNome = editoraNome;
    }

    async listarEditoras() {
        let sql = "select * from editora";
        let listaEditoras = [];
        let rows = await conexao.ExecutaComando(sql);

        for (var i = 0; i < rows.length; i++) {
            let row = rows[i];
            listaEditoras.push(new EditoraModel(row["ed_cod"], row["ed_nome"]));
        }
        return listaEditoras;
    }
}

module.exports = EditoraModel;