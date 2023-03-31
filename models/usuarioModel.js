const Database = require('../utils/database');

const conexao = new Database();

class UsuarioModel {

    #usuarioCod;
    #usuarioNome;
    #usuarioCpf;
    #usuarioEmail;
    #usuarioTipoFuncionario;
    #perfilId;

    get usuarioCod() { 
        return this.#usuarioCod;
    }

    set usuarioCod(usuarioCod) {
        this.#usuarioCod = usuarioCod;
    }

    get usuarioNome() {
        return this.#usuarioNome;
    }

    set usuarioNome(usuarioNome) {
        this.#usuarioNome = usuarioNome;
    }

    get usuarioCpf() {
        return this.#usuarioCpf;
    }

    set usuarioCpf(usuarioCpf){
        this.#usuarioCpf = usuarioCpf;
    }

    get usuarioEmail() {
        return this.#usuarioEmail;
    }

    set usuarioEmail(usuarioEmail) {
        this.#usuarioEmail = usuarioEmail;
    }

    get usuarioTipoFuncionario(){
        return this.#usuarioTipoFuncionario;
    }

    set usuarioTipoFuncionario(usuarioTipoFuncionario) {
        this.#usuarioTipoFuncionario = usuarioTipoFuncionario;
    }

    get perfilId() {
        return this.#perfilId;
    }

    set perfilId(perfilId) {
        this.#perfilId = perfilId;
    }

    constructor(usuarioCod, usuarioNome, usuarioCpf, usuarioEmail, usuarioTipoFuncionario, perfilId) {
        this.#usuarioCod = usuarioCod;
        this.#usuarioNome = usuarioNome;
        this.#usuarioCpf = usuarioCpf;
        this.#usuarioEmail = usuarioEmail;
        this.#usuarioTipoFuncionario = usuarioTipoFuncionario;
    }

    async buscarUsuario(id){
        let sql = "select * from usuario where usu_cod = ?"
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return new UsuarioModel(rows[0]["usu_cod"], rows[0]["nome"], rows[0]["email"], rows[0]["cpf"]);
        }
        return null;
    }

    async listarUsuarios() {
        let sql = 'select * from usuario';
        let rows = await conexao.ExecutaComando(sql);

        let listaUsuarios = [];

        for(let i = 0; i<rows.length; i++){
            let row = rows[i];
            listaUsuarios.push(
                new UsuarioModel(rows[i]["usu_cod"], rows[i]["nome"], rows[i]["email"], rows[i]["cpf"])
            );
        }

        return listaUsuarios;
    }

    async gravarUsuario() {
        let result = false;
        if(this.#usuarioCod == 0){
            let sql = "insert into usuario (nome, cpf, email, telefone, funcionario) values (?, ?, ?, ?, ?)";
            let valores = [this.#usuarioNome, this.#usuarioEmail, this.#usuarioCpf, this.#usuarioTipoFuncionario, this.#perfilId];
    
            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }

        return result;

    }

    async deletarUsuario(usuarioCod) {
        let sql = "delete from usuario where usu_cod = ?"
        let valores = [usuarioCod];

        let result = conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = UsuarioModel;