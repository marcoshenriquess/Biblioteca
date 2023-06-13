const TituloModel = require("../models/tituloModel");
const ExemplarModel = require("../models/exemplarModel");


class AcervoController {

    async listarLivrosView(req, res) {
        let titulo = new TituloModel();
        let listaTitulo = await titulo.listaAcervo();

        res.render('acervo/index', { titulos: listaTitulo, layout: 'acervo/index' });
    }
    async buscarTitulo(req, res) {
        var ok = true;
        var msg = ""
        var retorno = null;
        if(req.body.id != null && req.body.id != ""){
            let tituloModel = new TituloModel();
            tituloModel = await tituloModel.buscarTitulo(req.body.id);

            retorno = {
                nome: tituloModel.tituloNome,
                id: tituloModel.tituloCod,
            };
        }
        else {
            ok = false;
            msg = "Parâmetro inválido!";
        }

        res.send({ ok: ok, msg: msg, retorno: retorno })
    }   
    async gravarPedido(req, res){
<<<<<<< HEAD
        var ok = false;
        var msg = '';
        var carrinho = req.body;
    
        if(carrinho != undefined ){
            if(carrinho.length > 3){
             msg = 'Escolha um máximo de 3 exemplares.';
            }
            else{
                let exemplarModel = new ExemplarModel(req.body.id);
                ok = await exemplarModel.gravarPedido(carrinho)
            }
        }
        res.send({ ok: ok, msg: msg});
=======
        var ok = true;
        var carrinho = req.body;
    
        if(carrinho != undefined ){
            let exemplarModel = new ExemplarModel(req.body.id);
            ok = await exemplarModel.gravarPedido(carrinho)

        }
        res.send({ ok: ok});
>>>>>>> 8ce84b8f56051b5cef08e5d7886f7387beb1e191

    } 

}

module.exports = AcervoController;