const UsuarioModel = require("../models/usuariosModel");

class UserController{
    constructor(){

    }
    UserView(req,res) {
        res.render('usuario/home', { });
    }
    async UserListaView(req,res) {
        let usuario = new UsuarioModel();
        let listaUsuarios = await usuario.listarUsuarios();
        let listaUsu = [];

        for(let i = 0; i<listaUsuarios.length; i++){
            listaUsu.push({
                cod: listaUsuarios[i].usuarioCod,
                nome: listaUsuarios[i].usuarioNome,
                email: listaUsuarios[i].usuarioEmail,
                cpf: listaUsuarios[i].usuarioCpf,
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
                cpf: listaUsuarios[i].usuarioCpf,
            })
        }
        res.render('usuario/lista', {  lista: listaUsu});
    }
    UserCadastroView(req,res) {
        res.render('usuario/cadastro', { });
    }

    async UserCadastro(req,res) {

        let ok = false;
        if(req.body != null) {
            if(req.body.inptNome != "" && req.body.inptEmail != "" && req.body.inptCpf != "" && req.body.inptDtNasc != "") {
 
                let tipoUser = false;
                if(req.body.comboUser=='Usuario')
                    tipoUser = false;
                else
                    tipoUser = true;
                let usuario = new UsuarioModel(0,req.body.inptNome,req.body.inptEmail,req.body.inptCpf,40028922,tipoUser);
                ok = await usuario.gravarUsuario();
            }
        }
            res.render('usuario/cadastro', {})
    }
    async UserLista(req, res){
        let usuario = new UsuarioModel();
        let listaUsuarios = await usuario.listarUsuarios();


        res.render('usuario/lista',{ lista: listaUsuarios})
    }
}
module.exports = UserController;