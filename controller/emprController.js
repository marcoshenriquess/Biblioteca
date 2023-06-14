const EmprestimoModel = require("../models/emprestimoModel");

class EmprController{
    constructor(){

    }

    Emprestimo(req,res){
        res.render("emprestimo/home", { });
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
        res.render("emprestimo/listar", {lista: listaEmpr});
    }
}
module.exports = EmprController;