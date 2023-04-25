const express = require('express');
const exemplarController = require('../controller/exemplarController');

class ExemplarRota{

    #router;

    get router(){
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        const ctrl = new exemplarController();
        this.#router.get("/cadastrar", ctrl.ExemplarCad);
    }

}
module.exports = ExemplarRota;