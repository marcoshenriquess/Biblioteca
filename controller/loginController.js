const UsuarioModel = require("../models/usuarioModel");

class LoginController {

    constructor() {

    }

    logout(req, res){
        res.clearCookie("usuarioLogado");
        res.redirect("/login");
        res.end();
    } 

    loginView(req, res) {
        res.render('login/index', { layout: 'login/index' });
    }

    async autenticarUsuario(req, res) {
        if(req.body.inputEmail != "" 
        && req.body.inputPassword != ""){
            let usuario = new UsuarioModel();
            usuario = await usuario.autenticarUsuario(req.body.inputEmail, req.body.inputPassword);
            if(usuario != null) {
                res.cookie("usuarioLogado", usuario.usuarioCod);
                res.redirect('/admin');
            }
            else{
                res.render('login/index', { msgErro: "Usuário ou senha inválidos", layout: 'login/index' })
            }
            
        }
        else {
            res.render('login/index', { msgErro: "Preencha os campos corretamente", layout: 'login/index' })
        }
    }
}

module.exports = LoginController;