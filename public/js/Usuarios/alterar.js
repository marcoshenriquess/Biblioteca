document.addEventListener("DOMContentLoaded", function () {

    var btnAlterar = document.getElementById("btnAlterarUsuario");

    btnAlterar.addEventListener("click", function () {
        alterarUsu();
    })
})

function alterarUsu() {
    limparErros();

    var inptId = document.getElementById("inptId");
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
            cod: inptId.value,
            nome: inptNome.value,
            email: inptEmail.value,
            cpf: inptCpf.value,
            telefone: inptTelefone.value,
            senha: inptSenha.value,
            perfilId: selPerfil.value
        };

        fetch('/admin/usuario/alterar', {
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
            if(r.ok){

                document.getElementById("sucesso").innerText = "Usuario alterado com sucesso!";
                document.getElementById("sucesso").style = "display:block";
            }
            else {
                document.getElementById("erro").innerText = "Erro ao alterar Usuario!";
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