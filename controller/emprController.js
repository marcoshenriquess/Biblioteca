class EmprController{
    constructor(){

    }

    EmpreCad(req,res){
        res.render("emprestimo/emprestimo", { });
    }
}
module.exports = EmprController;