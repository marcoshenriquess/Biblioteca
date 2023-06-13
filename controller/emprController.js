const EmprestimoModel = require("../models/emprestimoModel");
const ExemplarModel = require("../models/exemplarModel");

class EmprController{
    constructor(){

    }

    EmpreCad(req,res){
        res.render("emprestimo/emprestimo", { });
    }
    async ListarEmprestimos(req, res){
        let emprestimo = new EmprestimoModel();
        let listaEmprestimos = await emprestimo.listarEmprestimos();

        let listaEmpr = [];

        for(let i = 0; i<listaEmprestimos.length; i++){
            listaEmpr.push({
                id: listaEmprestimos[i].emprestimoCod,
                titulo: listaEmprestimos[i].tituloNome,
                data: listaEmprestimos[i].emprestimoData,
                dataDevolucao: listaEmprestimos[i].emprestimoDataDevolucao,
                usuarioCod: listaEmprestimos[i].usuarioCod,
            })
        }
        console.log(listaEmpr)
        res.render("Emprestimo/emprestimo", {lista: listaEmpr});
    }
}
module.exports = EmprController;