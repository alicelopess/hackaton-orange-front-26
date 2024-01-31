const modal = document.getElementsByClassName("modal-projeto")[0]


let preview = document.getElementById("exibir-projeto")

function openModal(){
    modal.style.display = "flex";
    containerModais.style.height = "75rem"
}

function closeModal(){
    modal.style.display = "none";
    containerModais.style.height = "57rem"
}