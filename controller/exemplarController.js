class ExemController{
    constructor(){

    }

    ExemCad(req,res){
        res.render("exemplar/cadastro", { });
    }
}
module.exports = ExemController;