class UserController{
    constructor(){

    }
    UserView(req,res) {
        res.render('usuario/home', { });
    }
    UserCadastro(req,res){
        res.render('usuario/cadastro', { });
    }
    UserLista(Req,res) {
        res.render('usuario/lista', { });
    }
}
module.exports = UserController;