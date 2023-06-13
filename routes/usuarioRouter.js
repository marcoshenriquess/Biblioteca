const express = require('express');
const UserController = require('../controller/usuarioController');
const Autenticacao = require('../middlewares/autenticacao');

<<<<<<< HEAD
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
=======
class UserRouter {
    #router;
    get router() {
        return this.#router;
    }

    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        let ctrl = new UserController();
        let auth = new Autenticacao();
        this.#router.get('/', ctrl.UserView);
        this.#router.get('/lista', ctrl.UserLista);
        this.#router.get('/cadastro', ctrl.UserCadastroView);
        this.#router.get('/alterar/:id', ctrl.UserAlterarView);
        this.#router.post('/cadastro', ctrl.UserCadastro);
        this.#router.post('/excluir', ctrl.deletarUsuario);
>>>>>>> 8ce84b8f56051b5cef08e5d7886f7387beb1e191
        this.#router.post('/alterar', ctrl.UserAlterar);

    }
}
module.exports = UserRouter;