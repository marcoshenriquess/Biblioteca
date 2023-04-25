class exemplarController{
    constructor(){

    }

    ExemplarCad(req,res){
        res.render("exemplar/cadastrar", { });
    }
}
module.exports = exemplarController;