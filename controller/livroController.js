const LivroModel = require("../models/livroModel");

class LivroController{
    constructor(){

    }

    LivroView(req,res) {
        res.render('livro/home', { });
    }

    async LivroCadastro(req,res){
        //let livroModel = new LivroModel();
        //let cadLivros = await livroModel.gravarLivro();
        res.render('livro/cadastro', {});
    }
    
    async LivroListar(req,res) {
         let livro = new LivroModel();
         let listaLivros = await livro.listarlivros();
         res.render('livro/listar', {lista: listaLivros});
    }

    async LivroLista(req, res){
        let livro = new LivroModel();
        let listaLivros = await livro.listarlivros();

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
        console.log(listaLiv)
        res.send({ lista: listaLiv, ok: true })
    }
     
    async alterarView(req, res) {
        let livroModel = new LivroModel();
        if(req.params != null && req.params.id != null){
            let livroId = req.params.id;           
            livroModel = await livroModel.buscarLivro(livroId);
        }
        
        let listaPerfil = await livroModel.listarlivros();
        res.render('livro/alterar', { lista: listaPerfil, titAlteracao: livroModel });
    }

    async alterarLivro(req, res){
        let ok = false;
        if(req.body != null) {
            if(req.body.id > 0 && req.body.titulo != null && req.body.descricao != null && req.body.sinopse != null && req.body.editora != null){
                let livro = new LivroModel(req.body.id, req.body.titulo, req.body.descricao, req.body.sinopse, req.body.editora);
                ok = livro.gravarLivro();
            }
        }

        res.send({ ok: ok})
    }

    async gravarLivro(req, res) {
        let ok = false;
        if(req.body != null) {
            if(req.body.titulo != null && req.body.descricao != null && req.body.sinopse != null && req.body.editora != null) {
                let livro = new LivroModel(0, req.body.titulo, req.body.descricao, req.body.sinopse, req.body.editora);
                ok = livro.gravarLivro(); 
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