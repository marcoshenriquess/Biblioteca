const TituloModel = require("../models/tituloModel");
const EditoraModel = require("../models/editoraModel");
const fs = require('fs');


class TituloController {
    constructor() {

    }

    async listarTitulos(req, res) {
        let tituloModel = new TituloModel();
        let listaTitulos = await tituloModel.listarTitulos();
        res.render('titulo/listar', { lista: listaTitulos });
    }
    
    //ok
    async listarEditoras(req, res) {
        let editoraModel = new EditoraModel();
        let listaEditoras = await editoraModel.listarEditoras();
        res.render('titulo/criar', { lista: listaEditoras });
    }

    async tituloLista(req, res) {
        let livro = new TituloModel();
        let listaTitulos = await livro.listarTitulos();
        let editoraModel = new EditoraModel();
        let listaEditoras = await editoraModel.listarEditoras();

        let listaTit = [];

        for (let i = 0; i < listaTitulos.length; i++) {
            listaTit.push({
                id: listaTitulos[i].tituloCod,
                nome: listaTitulos[i].tituloNome,
                edicao: listaTitulos[i].tituloEdicao,
                ano: listaTitulos[i].tituloAno,
                editora: listaTitulos[i].editoraCod,
            })
        }
        res.render('titulo/listar', { lista: listaTit, listaEd: listaEditoras, ok: true })
    }

    async alterarView(req, res) {
        let tituloModel = new TituloModel();
        console.log("entrou no alterar view")
        if (req.params != null && req.params.id != null) {
            let tituloCod = req.params.id;
            tituloModel = await tituloModel.buscarTitulo(tituloCod);
        }
        let editoraModel = new EditoraModel();
        let listaEditoras = await editoraModel.listarEditoras();
        res.render('titulo/alterar', { lista: listaEditoras, titAlt: tituloModel });
    }

    async alterarTitulo(req, res) {
        var ok = true;
        if (req.body.nome != "" && req.body.edicao != "" && req.body.ano != "" && req.body.editora != '0' && req.file != null && (req.file.filename.includes(".jpg") || req.file.filename.includes(".png"))) {

            let titulo = new TituloModel(req.body.id, req.body.nome, req.body.edicao, req.body.ano, req.body.editora, req.file.filename, "");
            console.log("cod dentro do alterarTitulo: ", req.body.id)
            let tituloAnterior = await titulo.buscarTitulo(req.body.id);

            if (tituloAnterior.tituloImagem != null && tituloAnterior.tituloImagem != "") {
                if (fs.existsSync(global.RAIZ_PROJETO + "/public" + global.TITULO_IMG_CAMINHO + tituloAnterior.produtoImagem)) {
                    fs.unlinkSync(global.RAIZ_PROJETO + "/public" + global.TITULO_IMG_CAMINHO + tituloAnterior.produtoImagem)
                }
            }
            ok = await titulo.gravarTitulo();
        }
        else {
            ok = false;
        }
        res.send({ ok: ok })
    }

    async gravarTitulo(req, res) {
        let ok = false;
        let rBody = req.body;
        if (req.body != null) {
            if (rBody.nome != null && rBody.edicao != null && rBody.ano != null && rBody.editora > 0 && req.file != null && (req.file.filename.includes(".jpg") || req.file.filename.includes(".png"))) {
                let titulo = new TituloModel(0, req.body.nome, req.body.edicao, req.body.ano, req.body.editora, req.file.filename, "");
                ok = titulo.gravarTitulo();
            }
        }
        res.send({ ok: ok })
    }

    async deletarTitulo(req, res) {
        let ok = false;

        if (req.body.tituloCod != null && req.body.tituloCod > 0) {
            let tituloModel = new TituloModel();
            ok = tituloModel.deletarTitulo(req.body.tituloCod);
        }
        res.send({ ok: ok })
    }
}
module.exports = TituloController;