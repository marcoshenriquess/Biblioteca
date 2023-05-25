const Database = require('../utils/database');

const conexao = new Database();

class UsuarioModel {

    #usuarioCod;
    #usuarioNome;
    #usuarioEmail;
    #usuarioCpf;
    #usuarioTelefone;
    #usuarioSenha;
    #tipoCod;
    #tipoNome;

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

    get usuarioEmail() {
        return this.#usuarioEmail;
    }

    set usuarioEmail(usuarioEmail) {
        this.#usuarioEmail = usuarioEmail;
    }

    get usuarioCpf() {
        return this.#usuarioCpf;
    }

    set usuarioCpf(usuarioCpf){
        this.#usuarioCpf = usuarioCpf;
    }

    get usuarioTelefone() {
        return this.#usuarioTelefone;
    }

    set usuarioTelefone(usuarioTelefone){
        this.#usuarioTelefone = usuarioTelefone;
    }

    get usuarioSenha(){
        return this.#usuarioSenha;
    }
    set usuarioSenha(usuarioSenha){
        this.#usuarioSenha = usuarioSenha;
    }

    get tipoCod() {
        return this.#tipoCod;
    }

    set tipoCod(tipoCod) {
        this.#tipoCod = tipoCod;
    }
    get tipoNome() {
        return this.#tipoNome;
    }

    set tipoNome(tipoNome) {
        this.#tipoNome = tipoNome;
    }

    constructor(usuarioCod, usuarioNome, usuarioEmail, usuarioCpf, usuarioTelefone, usuarioSenha, tipoCod, tipoNome) {
        this.#usuarioCod = usuarioCod;
        this.#usuarioNome = usuarioNome;
        this.#usuarioEmail = usuarioEmail;
        this.#usuarioCpf = usuarioCpf;
        this.#usuarioTelefone = usuarioTelefone;
        this.#usuarioSenha = usuarioSenha;
        this.#tipoCod = tipoCod;
        this.#tipoNome = tipoNome;
    }

    async buscarUsuario(id){
        let sql = "select * from usuario where usu_cod = ?"
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return new UsuarioModel(rows[0]["usu_cod"], rows[0]["usu_nome"], rows[0]["usu_email"], rows[0]["usu_cpf"], rows[0]["usu_telefone"], rows[0]["usu_senha"], rows["tipo_nome"]);
        }
        return null;
    }

    async listarUsuarios() {
        let sql = 'select * from usuario u inner join tipousuario p on u.tipousuario_tipo_cod = p.tipo_cod';
        let rows = await conexao.ExecutaComando(sql);

        let listaUsuarios = [];

        for(let i = 0; i<rows.length; i++){
            let row = rows[i];
            listaUsuarios.push(
                new UsuarioModel(row["usu_cod"], 
                row["usu_nome"],row["usu_email"],
                row["usu_cpf"], row["usu_telefone"], row["usu_senha"], row["tipo_cod"], row["tipo_nome"])
            );
        }

        return listaUsuarios;
    }

    async gravarUsuario() {
        let result = false;
        if(this.#usuarioCod == 0){
            let sql = "insert into usuario (usu_nome,usu_cpf,usu_email,usu_telefone,usu_senha,tipousuario_tipo_cod) values (?, ?, ?, ?, ?, ?)";
            let valores = [this.#usuarioNome, this.#usuarioCpf,  this.#usuarioEmail, this.#usuarioTelefone, this.#usuarioSenha, this.#tipoCod];
    
            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            let sql = "update usuario set usu_nome = ?, usu_cpf = ?, usu_email = ?, usu_telefone = ?, usu_senha = ?, tipousuario_tipo_cod = ? where usu_cod = ?";
            let valores = [this.#usuarioNome, this.#usuarioCpf,  this.#usuarioEmail, this.#usuarioTelefone, this.#usuarioSenha, this.#tipoCod, this.#usuarioCod];

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