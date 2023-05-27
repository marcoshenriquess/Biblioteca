const express = require('express');
const AcervoController = require('../controller/acervoController');

class AcervoRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {

        this.#router = express.Router();

        let ctrl = new AcervoController();

        this.#router.get('/', ctrl.listarLivrosView);
    }
}

module.exports = AcervoRoute;