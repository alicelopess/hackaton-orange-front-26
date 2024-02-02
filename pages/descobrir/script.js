const modal = document.getElementsByClassName("container-modal")[0]

function openModal(){
    modal.style.display = "flex";
    containerModais.style.height = "75rem"
}

function closeModal(){
    modal.style.display = "none";
    containerModais.style.height = "57rem"
}