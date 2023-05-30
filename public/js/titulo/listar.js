document.addEventListener("DOMContentLoaded", function () {

    //carregarLivros();

    let btnExcluir = document.querySelectorAll(".btnExcluir");

    for (let i = 0; i < btnExcluir.length; i++) {
        btnExcluir[i].addEventListener("click", excluirTitulo);
    }
})

function excluirTitulo() {

    if (confirm("Tem certeza que deseja excluir esse título?")) {
        //recuperar id pelo dataset
        let tituloCod = this.dataset.id;
        var data = {
            tituloCod: tituloCod
        }
        fetch("/admin/titulo/excluir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function (r) {
            return r.json();
        }).then(function (r) {
            if (r.ok) {
                window.location.reload();
            }
        }).catch(function (e) {
            console.log(e);
        })

    }
    else {
    }
}

function carregarLivros() {
    fetch('/titulo/listar')
        .then(r => {
            return r.json();
        })
        .then(r => {
            console.log(r);
            if (r.lista.length > 0) {
                let html = "";
                for (var i = 0; i < r.lista.length; i++) {
                    html += `<tr>
                            <td>${r.lista[i].codigo}</td>
                            <td>${r.lista[i].nome}</td>                           
                            <td>${r.lista[i].edicao}</td>
                            <td>${r.lista[i].ano}</td>
                            <td>${r.lista[i].editora}</td>
                        </tr>`
                }

                document.getElementById("corpoDiv").innerHTML += html;
            }
        })
        .catch(e => {
            console.log(e);
        })
}