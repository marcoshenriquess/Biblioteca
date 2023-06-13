const express = require('express');
const LivroController = require('../controller/livroController');

class LivroRota{
    #router;
    get router(){
        return this.#router;
    }

    set router(router){
        this.#router = router;
    }

    constructor(){
        this.#router = express.Router();
        let ctrl = new LivroController();
        this.#router.get('/',ctrl.LivroView);
        this.#router.get('/cadastro',ctrl.LivroCadastro);
        this.#router.post('/cadastro',ctrl.gravarLivro);
        this.#router.get('/lista',ctrl.LivroLista);
        this.#router.get('/listar',ctrl.LivroListar);
        //sthis.#router.post('/excluir', ctrl.deletarLivro);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.post('/alterar', ctrl.alterarLivro);
    }
}
module.exports = LivroRota;