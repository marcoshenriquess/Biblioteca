const UsuarioModel = require("../models/usuarioModel");
class Autenticacao {

    constructor(){

    } 

    async usuarioEstaLogado(req, res, next) {
        if(req.headers.cookie != null && req.headers.cookie.includes("usuarioLogado") != null) {
            var usuId = req.cookies.usuarioLogado;
            res.locals.usuarioLogado = await new UsuarioModel().buscarUsuario(usuId);
            next();
        }
        else{
            res.redirect("/login");
        }
    }

    async usuarioIsAdmin(req, res, next){
        if(req.cookies != undefined && req.cookies.usuarioLogado != undefined) {
            var usuId = req.cookies.usuarioLogado;
            let usuario = await new UsuarioModel().buscarUsuario(usuId);
            res.locals.usuarioLogado = usuario;
            if(usuario != null && usuario.perfilId == 1) {         
                next();
            }
            else{
                res.redirect("/login");
            }
        }
        else{
            res.redirect("/login");
        }
    }
}

module.exports = Autenticacao;