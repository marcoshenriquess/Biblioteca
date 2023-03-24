class LivroController{
    constructor(){

    }
    LivroView(req,res) {
        res.render('livro/home', { });
    }
    LivroCadastro(req,res){
        res.render('livro/cadastro', { });
    }
    LivroLista(req,res) {
        res.render('livro/lista', { });
    }
}
module.exports = LivroController;