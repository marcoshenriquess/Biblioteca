document.addEventListener("DOMContentLoaded", function () {

    var btnCadastrarUsuario = document.getElementById("btnCadastrarUsuario");

    btnCadastrarUsuario.addEventListener("click", function () {
        gravarUsuario();
    })
})

function gravarUsuario() {
    limparErros();

    var inptNome = document.getElementById("inptNome");
    var inptEmail = document.getElementById("inptEmail");
    var inptCpf = document.getElementById("inptCpf");
    var inptTelefone = document.getElementById("inptTelefone");
    var inptSenha = document.getElementById("inptSenha");
    var selPerfil = document.getElementById("selPerfil");

    var listaErros = [];

    if(inptNome.value == "" || inptNome.value == null ){
        listaErros.push("inptNome");
    }
    if(inptEmail.value == "" || inptEmail.value == null){
        listaErros.push("inptEmail");
    }
    if(inptCpf.value == "" || inptCpf.value == null){
        listaErros.push("inptCpf");
    }
    if(inptTelefone.value == "" || inptTelefone.value == null){
        listaErros.push("inptTelefone");
    }
    if(inptSenha.value == "" || inptSenha.value == null){
        listaErros.push("inptSenha");
    }
    if(selPerfil.value == "0"){
        listaErros.push("selPerfil");
    }

    if(listaErros.length == 0){
        var data = {
            nome: inptNome.value,
            email: inptEmail.value,
            cpf: inptCpf.value,
            telefone: inptTelefone.value,
            senha: inptSenha.value,
            perfilId: selPerfil.value
        };

        fetch('/usuario/cadastro', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(r => {
            return r.json();
        })
        .then(r => {
            console.log(r);
            console.log(inptCpf.value);
            console.log(inptNome.value);
            console.log(inptEmail.value);
            if(r.ok){
                inptNome.value = "";
                inptEmail.value = "";
                inptCpf.value = "";
                inptTelefone.value = "";
                inptSenha.value = "";
                selPerfil.value = 0;

                document.getElementById("sucesso").innerText = "Título gravado com sucesso!";
                document.getElementById("sucesso").style = "display:block";
            }
            else {
                document.getElementById("erro").innerText = "Erro ao gravar título!";
                document.getElementById("erro").style = "display:block";

            }
        })
        .catch(e => {
            console.log("Ocorreu um erro : ", e);
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

        document.getElementById("erro").innerText = "Preencha corretamente os campos destacados abaixo:";

        document.getElementById("erro").style = "display:none";
    }
}

function limparErros() {
    document.getElementById("inptNome").classList.remove("campoErro");
    document.getElementById("inptEmail").classList.remove("campoErro");
    document.getElementById("inptCpf").classList.remove("campoErro");
    document.getElementById("inptTelefone").classList.remove("campoErro");
    document.getElementById("inptSenha").classList.remove("campoErro");
    document.getElementById("selPerfil").classList.remove("campoErro");

}





























































/*
document.addEventListener("DOMContentLoaded", function () {


    var btnGravar = document.getElementById("btnGravarUsuario");


    btnGravar.addEventListener("click", function() {
        gravarUsuario();
    })
});

function gravarUsuario() {

    var inptNome = document.getElementById("inptNome");
    var inptEmail = document.getElementById("inptEmail");
    var inptCpf = document.getElementById("inptCpf");
    var inptTelefone = document.getElementById("inptTelefone");
    var inptSenha = document.getElementById("inptSenha");
    var selPerfil = document.getElementById("selPerfil");

    var listaErros = [];

    if(inptNome.value == "" || inptNome.value == undefined || inptNome.value == null){
        listaErros.push("inptNome");
    }
    
    if(inptEmail.value == "" || inptEmail.value == undefined || inptEmail.value == null){
        listaErros.push("inptEmail");
    }
    
    if(inptCpf.value == "" || inptCpf.value == undefined || inptCpf.value == null){
        listaErros.push("inptCpf");
    }
    
    if(inptTelefone.value == "" || inptTelefone.value == undefined || inptTelefone.value == null){
        listaErros.push("inptTelefone");
    }

    if(inptSenha.value == "" || inptSenha.value == undefined || inptSenha.value == null){
        listaErros.push("inptSenha");
    }

    if(selPerfil.value == '1'){
        listaErros.push("selPerfil");
    }

    if(listaErros.length == 0){

        var data = {
            nome: inptNome.value,
            email: inptEmail.value,
            cpf: inptCpf.value,
            telefone: inptTelefone.value,
            senha: inptSenha.value,
            perfilId: selPerfil.value
        };

        fetch('/usuario/cadastro', { 
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
                nome.value = "";
                email.value = "";
                cpf.value = "";
                telefone.value = "";
                senha.value = "";
                selPerfil.value = 0;

                document.getElementById("alertaSucesso").innerText = "Usuário gravado com sucesso!";
                document.getElementById("alertaSucesso").style = "display:block";
            }
            else{
                document.getElementById("erros").innerText = "Erro ao gravar usuário!";
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
 */