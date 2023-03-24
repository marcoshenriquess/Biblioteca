const express = require('express');
const UserController = require('../controller/usuarioController');

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
        this.#router.get('/',ctrl.UserView);
        this.#router.get('/cadastrar',ctrl.UserCadastro);
        this.#router.get('/lista',ctrl.UserLista);
    }
}
module.exports = UserRouter;