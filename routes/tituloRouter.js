const express = require('express');
const multer = require("multer");
const TituloController = require('../controller/tituloController');
const Autenticacao = require('../middlewares/autenticacao');

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
        let auth = new Autenticacao();

        let ctrl = new TituloController();
        this.#router.get('/', auth.usuarioIsAdmin, ctrl.listarTitulos);
        this.#router.get('/cadastro', auth.usuarioIsAdmin, ctrl.listarEditoras);
        this.#router.post('/criar', auth.usuarioIsAdmin, upload.single("inputImagem"), ctrl.gravarTitulo);
        this.#router.get('/listar', auth.usuarioIsAdmin, ctrl.tituloLista);
        this.#router.post('/excluir', auth.usuarioIsAdmin, ctrl.deletarTitulo);
        this.#router.get('/alterar/:id', auth.usuarioIsAdmin, ctrl.alterarView);
        this.#router.post('/alterar', auth.usuarioIsAdmin, upload.single("inputImagem"), ctrl.alterarTitulo);
        this.#router.post("/buscar", auth.usuarioIsAdmin, ctrl.buscarTitulo);

    }


}
module.exports = TituloRouter;