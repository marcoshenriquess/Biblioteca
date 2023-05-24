const express = require('express');
const multer = require("multer");
const TituloController = require('../controller/tituloController');

class TituloRouter {
    #router;

    get router() {
        return this.#router;
    }

    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();

        let storage = multer.diskStorage({
            destination: function (req, res, cb) {
                cb(null, 'public/img/Titulos');
            },
            filename: function (req, file, cb) {
                var ext = file.originalname.split(".")[1];
                cb(null, Date.now().toString() + "." + ext);
            }
        })

        let upload = multer({ storage });

        let ctrl = new TituloController();
        this.#router.get('/', ctrl.listarTitulos);
        this.#router.get('/cadastro', ctrl.listarEditoras);
        this.#router.post('/criar', upload.single("inputImagem"), ctrl.gravarTitulo);
        this.#router.get('/listar', ctrl.tituloLista);
        this.#router.post('/excluir', ctrl.deletarTitulo);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.post('/alterar', upload.single("inputImagem"), ctrl.alterarTitulo);
        this.#router.post("/buscar", ctrl.buscarTitulo);

    }


}
module.exports = TituloRouter;