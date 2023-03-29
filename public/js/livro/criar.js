document.addEventListener("DOMContentLoaded", function() {

    var btnGravarCadastro = document.getElementById("btnCadastrarLivro");

    btnGravarCadastro.addEventListener("click", function() {
        gravarLivro();
    })
});

function gravarLivro() {

    limparErros();
    
    var inputTitulo = document.getElementById("titulo");
    var inputEditora = document.getElementById("editora");
    var inputSinopse = document.getElementById("sinopse");
    var inputDescricao = document.getElementById("descricao");

    var listaErros = [];

    if(inputTitulo.value == "" || inputTitulo.value == undefined || inputTitulo.value == null){
        listaErros.push("inputTitulo");
    }
    
    if(inputEditora.value == "" || inputEditora.value == undefined || inputEditora.value == null){
        listaErros.push("inputEditora");
    }

    if(inputSinopse.value == "" || inputSinopse.value == undefined || inputSinopse.value == null){
        listaErros.push("inputSinopse");
    }

    if(inputDescricao.value == "" || inputDescricao.value == undefined || inputDescricao.value == null){
        listaErros.push("inputDescricao");
    }

    if(listaErros.length == 0){

        var data = {
            titulo: inputTitulo.value,
            editora: inputEditora.value,
            sinopse: inputSinopse.value,
            descricao: inputDescricao.value,
        };

        fetch('/livro/cadastro', { 
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {          
            if(r.ok) {
                inputTitulo.value = "";
                inputEditora.value = "";
                inputSinopse.value = "";
                inputDescricao.value = "";

                document.getElementById("sucesso").innerText = "Livro gravado com sucesso!";
                document.getElementById("sucesso").style = "display:block";
            }
            else{
                document.getElementById("erros").innerText = "Erro ao gravar livro!";
                document.getElementById("erros").style = "display:block";
            }
        })
        .catch(e=> {
            console.log(e);
        })

    }
    else{
        mostrarErros(listaErros)
    }
}


function mostrarErros(lista) {
    for(var i = 0; i<lista.length; i++){
        let id = lista[i];

        document.getElementById(id).classList.add("campoErro");

        document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";

        document.getElementById("erros").style= "display:block";
    }
}

function limparErros() {
    document.getElementById("inputTitulo").classList.remove("campoErro");
    document.getElementById("inputDescricao").classList.remove("campoErro");
    document.getElementById("inputSinopse").classList.remove("campoErro");
    document.getElementById("inputEditora").classList.remove("campoErro");
   
    document.getElementById("erros").style = "display:none";
    document.getElementById("sucesso").style = "display:none";
}


