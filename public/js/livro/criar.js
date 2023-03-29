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
    var liErros = [];

    if(inputTitulo.value == "" || inputTitulo.value == undefined || inputTitulo.value == null){
        liErros.push("titulo");
    }
    
    if(inputEditora.value == "" || inputEditora.value == undefined || inputEditora.value == null){
        liErros.push("editora");
    }

    if(inputSinopse.value == "" || inputSinopse.value == undefined || inputSinopse.value == null){
        liErros.push("sinopse");
    }

    if(inputDescricao.value == "" || inputDescricao.value == undefined || inputDescricao.value == null){
        liErros.push("descricao");
    }

    if(liErros.length == 0){

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
                console.log("teste sucesso")
            }
            else{
                document.getElementById("erro").innerText = "Erro ao gravar livro!";
                document.getElementById("erro").style = "display:block";
            }
        })
        .catch(e=> {
            console.log(e);
        })

    }
    else{
        mostrarErros(liErros)
    }
}

function mostrarErros(listaE) {
    for(var i = 0; i<listaE.length; i++){
        let id = listaE[i];

        document.getElementById(id).classList.add("cErro");

        document.getElementById("erro").innerText = "Preencha corretamente os campos destacados abaixo:";

        document.getElementById("erro").style= "display:block";
    }
}

function limparErros() {
    document.getElementById("titulo").classList.remove("cErro");
    document.getElementById("descricao").classList.remove("cErro");
    document.getElementById("sinopse").classList.remove("cErro");
    document.getElementById("editora").classList.remove("cErro");
   
    document.getElementById("erro").style = "display:none";
    document.getElementById("sucesso").style = "display:none";
}


