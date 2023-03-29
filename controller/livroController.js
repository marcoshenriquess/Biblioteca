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
        res.render('livro/cadastro', { });
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
                id: listaLivros[i].livroId,''
                titulo: listaLivros[i].livroTitulo,
                edicao: listaLivros[i].livroEdicao,
                autor: listaLivros[i].livroAutor,
                lancamento: listaLivros[i].livroLancamento,
                editora: listaLivros[i].livroEditora,
                lancamento: listaLivros[i].livroUnidade,
                lancamento: listaLivros[i].livroGenero,
            })
        }

        res.send({ lista: listaLiv, ok: true })
    }

    async alterarLivro(req, res){
        let ok = false;
        if(req.body != null) {
            if(req.body.id > 0 && req.body.titulo != null && req.body.edicao != null && req.body.autor != null && req.body.lancamento != null && req.body.editora!= null && req.body.unidade != null && req.body.genero != null) {
                if(req.body.livroId > 0) {
                    let livro = new LivroModel(req.body.titulo, req.body.edicao, req.body.autor, req.body.lancamento, req.body.editora,req.body.unidade,req.body.genero);
                    ok = livro.gravarLivro();
                }
            }
        }

        res.send({ ok: ok})
    }

    async gravarLivro(req, res) {

        let ok = false;
        if(req.body != null) {
            if(req.body.titulo != null && req.body.edicao != null && req.body.autor != null && req.body.lancamento != null && req.body.editora!= null && req.body.unidade != null && req.body.genero != null) {
                if(req.body.livroId > 0) {
                    let livro = new LivroModel(0, req.body.titulo, req.body.edicao, req.body.autor, req.body.lancamento, req.body.editora,req.body.unidade,req.body.genero);
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