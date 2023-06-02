const Database = require('../utils/database');

const conexao = new Database();

class ExemplarModel  {

    #exemplarCod;
    #exemplarTitulo


    get exemplarCod(){
        return this.#exemplarCod;
    }

    set exemplarCod(exemplarCod) {
        this.#exemplarCod = exemplarCod;
    }

    get exemplarTitulo(){
        return this.#exemplarTitulo;
    }

    set exemplarTitulo(exemplarTitulo) {
        this.#exemplarTitulo = exemplarTitulo;
    }
 
    constructor(exemplarCod,exemplarTitulo){
        this.#exemplarTitulo = exemplarTitulo;
        this.#exemplarCod = exemplarCod;


    }

   
    async gravarExemplar() {
        let result = false;
        if(this.#exemplarCod == 0){
            let sql = "insert into exemplar (titulo_tit_cod) values (?)";
            let valores = [this.#exemplarTitulo];
    
            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        return result;
    }
    async gravarPedido(carrinho,dataprevista) {
        let result = false;
        if(carrinho != undefined){
            
            //Insere na tabela de empréstimos retornando o código do empréstimo
            let sql = "insert into emprestimo (emp_data, emp_data_devo, usuario_usu_cod_funcionario, usuario_usu_cod) values (?, ?, ?, ?);";
            let valores = ['2023-06-30', '2023-07-30', null, 2];
            await conexao.ExecutaComando(sql, valores);
            let LcodigoEmprestimo = await conexao.ExecutaComando('SELECT LAST_INSERT_ID() as id;');
            let LCodigoExemplar = 0;
            
            
            //Insere na tabela de exemplar has emprestimos
            for(let i=0;i<=carrinho.length;i++)
            {
                if(LcodigoEmprestimo[0].id==38)
                    LCodigoExemplar = 1;
                else    
                    LCodigoExemplar = 6;
                sql = "insert into exemplar_has_emprestimo (emp_num, dt_Devol, exemplar_exe_cod, dt_prevista_devol) values (?, ?, ?, ?)";
                valores = [LcodigoEmprestimo[0].id, '2023-07-30', LCodigoExemplar+i+1, '2023-07-30'];
                result = await conexao.ExecutaComandoNonQuery(sql, valores);
            }
            
        }
        
        return result;
    }


}
module.exports = ExemplarModel;