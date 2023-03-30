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
        
        this.#router.post('/cadastro',ctrl.UserCadastro);
        this.#router.get('/cadastro',ctrl.UserCadastroView);

        this.#router.post('/lista',ctrl.UserLista);
        this.#router.get('/lista',ctrl.UserListaView);

        this.#router.post('/excluir',ctrl.deletarUsuario);


    }
}
module.exports = UserRouter;