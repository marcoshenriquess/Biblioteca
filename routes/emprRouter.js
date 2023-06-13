const express = require('express');
const EmprController = require('../controller/emprController');

class EmprRota{

    #router;

    get router(){
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        const ctrl = new EmprController();
<<<<<<< HEAD
        this.#router.get("/listar", ctrl.ListarEmprestimos);

=======
        this.#router.get("/", ctrl.EmpreCad);
>>>>>>> 8ce84b8f56051b5cef08e5d7886f7387beb1e191
    }

}
module.exports = EmprRota;