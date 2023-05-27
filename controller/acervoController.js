const TituloModel = require("../models/tituloModel");

class AcervoController {

    async listarLivrosView(req, res) {
        let titulo = new TituloModel();
        let listaTitulo = await titulo.listaAcervo();

        res.render('acervo/index', { titulos: listaTitulo, layout: 'acervo/index' });
    }    
}

module.exports = AcervoController;