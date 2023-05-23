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

    async UserAlterar(req,res){
        let usuarioModel = new UsuarioModel();
        if (req.params != null && req.params.id != null) {
            let id_usuario = req.params.id;
            usuarioModel = await UsuarioModel.buscarUsuario(id_usuario);
        }
        let usuModel = new TipoUsuModel();
        let listaTipo = await usuModel.listar();
        res.render('usuario/cadastro', { lista: listaTipo, AltUsu: usuModel });

    }
}
module.exports = UserController;