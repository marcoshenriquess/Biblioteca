const express = require('express');
const ExemController = require('../controller/exemplarController');

class ExemRota{

    #router;

    get router(){
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        const ctrl = new ExemController();
        this.#router.get("/cadastro", ctrl.ExemCad);
    }

}
module.exports = ExemRota;