document.addEventListener("DOMContentLoaded", function() {
    
    //carregarLivros();

    let btnExcluir = document.querySelectorAll(".btnExcluir");

    for(let i = 0; i< btnExcluir.length; i++){
        btnExcluir[i].addEventListener("click", excluirLivro);
    }
})

function excluirLivro() {

    if(confirm("Tem certeza que deseja excluir esse livro?")){
        //recuperar id pelo dataset
        let id = this.dataset.id;
        var data = {
            livroId: id
        }
        fetch("/livro/excluir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function(r) {
            return r.json();
        }).then(function(r) {
            if(r.ok){
                window.location.reload();
            }
        }).catch(function(e) {
            console.log(e);
        })

    }
    else{

    }
}

function carregarLivros() {
    fetch('/livro/listar')
    .then(r => {
        return r.json();
    })
    .then(r => {
        console.log(r);
        if(r.lista.length > 0){
            let div = "";
            for(var i = 0; i<r.lista.length; i++) {
                div += `<div class="d-flex flex-column justify-content-start">
                            <h5>${r.lista[i].titulo}</h5>                           
                            <p>${r.lista[i].descricao}</p>
                            <p>${r.lista[i].sinopse}</p>
                            <p>${r.lista[i].editora}</p>
                        </div>`
            }

            document.getElementById("corpoDiv").innerHTML += div;
        }
    })
    .catch(e => {
        console.log(e);
    })

    console.log("Fim da função");
}