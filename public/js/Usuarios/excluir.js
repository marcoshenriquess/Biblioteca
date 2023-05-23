document.addEventListener("DOMContentLoaded", function() {
    
    //carregarUsuarios();

    let btnExcluir = document.querySelectorAll(".btnExcluir");

    for(let i = 0; i< btnExcluir.length; i++){
        btnExcluir[i].addEventListener("click", excluirUsuario);
    }
})

function excluirUsuario() {

    if(confirm("Tem certeza que deseja excluir esse usuário?")){
        //recuperar id pelo dataset
        let id = this.dataset.id;
        var data = {
            usuarioId: id
        }
        fetch("/usuario/excluir", {
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