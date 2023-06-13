<<<<<<< HEAD
const EmprestimoModel = require("../models/emprestimoModel");
const ExemplarModel = require("../models/exemplarModel");

=======
>>>>>>> 8ce84b8f56051b5cef08e5d7886f7387beb1e191
class EmprController{
    constructor(){

    }

    EmpreCad(req,res){
        res.render("emprestimo/emprestimo", { });
    }
<<<<<<< HEAD
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
=======
>>>>>>> 8ce84b8f56051b5cef08e5d7886f7387beb1e191
}
module.exports = EmprController;