const Database = require('../utils/database');

const conexao = new Database();

class EmprestimoModel {
    #emprestimoCod;
    #emprestimoData;
    #emprestimoDataDevolucao;
    #usuarioCod;
    #tituloNome;

    constructor(emprestimoCod, emprestimoData, emprestimoDataDevolucao, usuarioCod, tituloNome) {
        this.#emprestimoCod = emprestimoCod;
        this.#emprestimoData = emprestimoData;
        this.#emprestimoDataDevolucao = emprestimoDataDevolucao;
        this.#usuarioCod = usuarioCod;
        this.#tituloNome = tituloNome;

    }

    get emprestimoCod() {
        return this.#emprestimoCod;
    }

    set emprestimoCod(emprestimoCod) {
        this.#emprestimoCod = emprestimoCod;
    }

    get emprestimoData() {
        return this.#emprestimoData;
    }

    set emprestimoData(emprestimoData) {
        this.#emprestimoData = emprestimoData;
    }
    get emprestimoDataDevolucao() {
        return this.#emprestimoDataDevolucao;
    }

    set emprestimoDataDevolucao(emprestimoDataDevolucao) {
        this.#emprestimoDataDevolucao = emprestimoDataDevolucao;
    }
    get usuarioCod() {
        return this.#usuarioCod;
    }

    set usuarioCod(usuarioCod) {
        this.#usuarioCod = usuarioCod;
    }
    get tituloNome() {
        return this.#tituloNome;
    }

    set tituloNome(tituloNome) {
        this.#tituloNome = tituloNome;
    }


    async listarEmprestimos() {
        let sql =`select emp_cod,emp_data,emp_data_devo,usuario_usu_cod,exemplar_has_emprestimo.nome_titulo from emprestimo
        inner join exemplar_has_emprestimo on exemplar_has_emprestimo.emp_num = emprestimo.emp_cod 
        inner join exemplar on exemplar.exe_cod = exemplar_has_emprestimo.exemplar_exe_cod
        inner join titulo on titulo.tit_cod = exemplar.titulo_tit_cod`;
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new EmprestimoModel(row["emp_cod"], row["emp_data"], row["emp_data_devo"],row["usuario_usu_cod"],row["nome_titulo"]));
        }

        return listaRetorno;
    }
}

module.exports = EmprestimoModel;