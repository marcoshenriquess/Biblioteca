document.addEventListener("DOMContentLoaded", function () {

    var btnGravarCadastro = document.getElementById("btnCadastrarTitulo");

    btnGravarCadastro.addEventListener("click", function () {
        gravarTitulo();
    })

    var inputImagem = document.getElementById("titImagem");
    inputImagem.addEventListener("change", exibirImagem);
});

function exibirImagem() {
    var inputValue = document.getElementById("titImagem").files[0];
    if (inputValue.name.includes(".jpg") || inputValue.name.includes(".png")) {
        var imgInput = document.getElementById("imgInput");
        imgInput.src = URL.createObjectURL(inputValue);
        imgInput.style["display"] = "block";
    }
    else {
        alert("Formato inválido (Apenas .jpg e .png)");
    }
}

function esconderImagem() {
    var imgInput = document.getElementById("imgInput");
    imgInput.style["display"] = "none";
}

function gravarTitulo() {

    limparErros();

    var inputNome = document.getElementById("titNome");
    var inputEdicao = document.getElementById("titEdicao");
    var inputAno = document.getElementById("titAno");
    var selEditora = document.getElementById("titEditora");
    var iptImagem = document.getElementById("titImagem");

    var liErros = [];

    if (inputNome.value == "" || inputNome.value == undefined || inputNome.value == null) {
        liErros.push("titNome");
    }

    if (inputEdicao.value == "" || inputEdicao.value == undefined || inputEdicao.value == null) {
        liErros.push("titEdicao");
    }

    if (inputAno.value == "" || inputAno.value == undefined || inputAno.value == null) {
        liErros.push("titAno");
    }

    if (selEditora.value == '0') {
        liErros.push("titEditora");
    }

    if (iptImagem.value == "" || iptImagem.value == undefined || iptImagem.value == null) {
        liErros.push("titImagem");
    }

    if (liErros.length == 0) {

        var inputImg = iptImagem.files[0];
        console.log(iptImagem.files[0])
        if (inputImg.name.includes(".jpg") || inputImg.name.includes(".png")) {

            var formData = new FormData();
            formData.append("nome", inputNome.value);
            formData.append("edicao", inputEdicao.value);
            formData.append("ano", inputAno.value);
            formData.append("editora", selEditora.value);
            formData.append("inputImagem", inputImg);

            fetch('/admin/titulo/criar', {
                method: "POST",
                body: formData
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    console.log(r);
                    if (r.ok) {
                        inputNome.value = "";
                        inputEdicao.value = "";
                        inputAno.value = "";
                        selEditora.value = 0;
                        esconderImagem();

                        document.getElementById("sucesso").innerText = "Título gravado com sucesso!";
                        document.getElementById("sucesso").style = "display:block";
                    }
                    else {
                        document.getElementById("erro").innerText = "Erro ao gravar título!";
                        document.getElementById("erro").style = "display:block";

                    }
                })
                .catch(e => {
                    
                })
        } else
            alert("Formato de arquivo inválido!");
    }
    else {
        mostrarErros(liErros);
    }
}

function mostrarErros(listaE) {
    for (var i = 0; i < listaE.length; i++) {
        let id = listaE[i];

        document.getElementById(id).classList.add("cErro");

        document.getElementById("erro").innerText = "Preencha corretamente os campos destacados acima!";

        document.getElementById("erro").style = "display:block";
    }
}

function limparErros() {
    document.getElementById("titNome").classList.remove("cErro");
    document.getElementById("titEdicao").classList.remove("cErro");
    document.getElementById("titAno").classList.remove("cErro");
    document.getElementById("titEditora").classList.remove("cErro");
    document.getElementById("titImagem").classList.remove("cErro");

    document.getElementById("erro").style = "display:none";
    document.getElementById("sucesso").style = "display:none";
}


