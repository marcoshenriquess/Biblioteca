const express = require('express')
const LoginController = require('../controller/loginController');

class LoginRoute {

    #router;

    get router() {
        return this.#router;
    }

    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();

        let ctrl = new LoginController();

        this.#router.get('/', ctrl.loginView);
        this.#router.get('/logout', ctrl.logout);
        this.#router.post('/', ctrl.autenticarUsuario);
    }
}

module.exports = LoginRoute;