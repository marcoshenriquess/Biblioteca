const express = require('express');
const UserController = require('../controller/usuarioController');
const Autenticacao = require('../middlewares/autenticacao');

class UserRouter{
    #router;
    get router(){
        return this.#router;
    }

    set router(router){
        this.#router = router;
    }

    constructor(){
        this.#router = express.Router();
        let ctrl = new UserController();
        let auth = new Autenticacao();
        this.#router.get('/',ctrl.UserView);
        this.#router.get('/lista',ctrl.UserLista);
        this.#router.get('/cadastro',ctrl.UserCadastroView);
        this.#router.get('/alterar/:id', ctrl.UserAlterarView);
        this.#router.post('/cadastro',ctrl.UserCadastro);
        this.#router.post('/excluir',ctrl.deletarUsuario);
        this.#router.post('/alterar', ctrl.UserAlterar);

    }
}
module.exports = UserRouter;