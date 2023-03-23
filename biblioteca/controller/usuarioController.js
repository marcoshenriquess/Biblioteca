class UserController{
    constructor(){

    }
    UserView(req,res) {
        res.render('usuario/home', { });
    }
    UserCadastro(req,res){
        res.render('usuario/cadastrar', { });
    }
    UserLista(Req,res) {
        res.render('usuario/lista', { });
    }
}
module.exports = UserController;