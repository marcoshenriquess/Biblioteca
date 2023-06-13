const TipoUsuModel = require("../models/tipoUsuarioModel");
const UsuarioModel = require("../models/usuarioModel");

class UserController{
    constructor(){

    }
    UserView(req,res) {
        res.render('usuario/home', { });
    }
    async UserListaView(req, res){
        let usuario = new UsuarioModel();
        let listaUsuarios = await usuario.listarUsuarios();


        res.render('usuario/lista',{ lista: listaUsuarios})
    }
    async UserLista(req,res) {
        let usuario = new UsuarioModel();
        let listaUsuarios = await usuario.listarUsuarios();
        let listaUsu = [];

        for(let i = 0; i<listaUsuarios.length; i++){
            listaUsu.push({
                cod: listaUsuarios[i].usuarioCod,
                nome: listaUsuarios[i].usuarioNome,
                email: listaUsuarios[i].usuarioEmail,
                cpf: listaUsuarios[i].usuarioCpf,
                tipoUsu: listaUsuarios[i].tipoNome
            })
        }

        res.render('usuario/lista', {  lista: listaUsu});
    }
    async deletarUsuario(req, res){
        let ok = false;
        let usuario = new UsuarioModel();
        ok = usuario.deletarUsuario(req.body.usuarioId);
        let listaUsuarios = await usuario.listarUsuarios();
        let listaUsu = [];
        
        for(let i = 0; i<listaUsuarios.length; i++){
            listaUsu.push({
                cod: listaUsuarios[i].usuarioCod,
                nome: listaUsuarios[i].usuarioNome,
                email: listaUsuarios[i].usuarioEmail,
                cpf: listaUsuarios[i].usuarioCpf
            })
        }
        res.render('usuario/lista', {  lista: listaUsu});
    }
    async UserCadastroView(req,res) {
        let usuModel = new TipoUsuModel();
        let listaTipo = await usuModel.listar();
        res.render('usuario/cadastro', { lista: listaTipo });
    }

    async UserCadastro(req,res) {

        let ok = false;
        if(req.body != null) {
            let usuario = new UsuarioModel(0, req.body.nome, req.body.email,req.body.cpf, req.body.telefone, req.body.senha, req.body.perfilId);
            ok = usuario.gravarUsuario();
        }

        res.send({ ok: ok})
    }

    async UserAlterarView(req, res) {
        let usuarioModel = new UsuarioModel();
        if(req.params != null && req.params.id != null){
            let usuarioCod = req.params.id;           
            usuarioModel = await usuarioModel.buscarUsuario(usuarioCod);
        }
        let tipoUsu = new TipoUsuModel();
        let listaPerfil = await tipoUsu.listar();
        res.render('usuario/alterar', { lista: listaPerfil, AltUsu: usuarioModel });
    }

    async UserAlterar(req,res){
        let ok = false;
        if(req.body != null) {
            if(req.body.cod > 0 && req.body.nome != null && req.body.email != null && req.body.cpf != null && req.body.telefone != null && req.body.senha != null && req.body.perfilId != null) {
                if(req.body.perfilId > 0) {
                    let usuario = new UsuarioModel(req.body.cod, req.body.nome, req.body.email, req.body.cpf, req.body.telefone, req.body.senha, req.body.perfilId);
                    usuario.usuarioCod = req.body.cod;
                    ok = usuario.gravarUsuario();
                }
            }
        }
        res.send({ ok: ok})
    }
}
module.exports = UserController;