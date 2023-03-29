const LivroModel = require("../models/livroModel");

class LivroController{
    constructor(){

    }

    LivroView(req,res) {
        res.render('livro/home', { });
    }

    async LivroCadastro(req,res){
        //let livroModel = new LivroModel();
        //let listaPerfil = await perfilModel.listarLivros();
        res.render('livro/cadastro', {lista: listaLivros});
    }
    
    async LivroLista(req,res) {
        let livro = new LivroModel();
        let listaLivros = await livro.listarlivros();
        res.render('livro/lista', {lista: listaLivros});
    }

    async listarLivros(req, res){
        let livro = new LivroModel();
        let listaLivros = await livro.listarLivros();

        let listaLiv = [];

        for(let i = 0; i<listaLivros.length; i++){
            listaLiv.push({
                id: listaLivros[i].livroId,
                titulo: listaLivros[i].livroTitulo,
                descricao: listaLivros[i].livroDescricao,
                sinopse: listaLivros[i].livroSinopse,
                editora: listaLivros[i].livroEditora,
            })
        }

        res.send({ lista: listaLiv, ok: true })
    }

    async alterarLivro(req, res){
        let ok = false;
        if(req.body != null) {
            if(req.body.id > 0 && req.body.titulo != null && req.body.descricao != null && req.body.sinopse != null && req.body.editora != null) {
                if(req.body.livroId > 0) {
                    let livro = new LivroModel(req.body.titulo, req.body.descricao, req.body.sinopse, req.body.editora);
                    ok = livro.gravarLivro();
                }
            }
        }

        res.send({ ok: ok})
    }

    async gravarLivro(req, res) {

        let ok = false;
        if(req.body != null) {
            if(req.body.titulo != null && req.body.descricao != null && req.body.sinopse != null && req.body.editora != null) {
                if(req.body.livroId > 0) {
                    let livro = new LivroModel(0, req.body.titulo, req.body.descricao, req.body.sinopse, req.body.editora);
                    ok = livro.gravarLivro();
                }
            }
        }

        res.send({ ok: ok})
    }

    async deletarlivro(req, res){
        let ok = false;
        if(req.body.livroId != null && req.body.livroId > 0){
            let livroModel = new LivroModel();
            ok = livroModel.deletarlivro(req.body.livroId);
        }
        res.send({ok: ok})
    }
}
module.exports = LivroController;