const modal = document.getElementsByClassName("container-modal")[0]
const BtnInput = document.getElementsByClassName("enviar-projeto-2")[0]
const inputIMG = document.getElementById("input-file")
let preview = document.getElementById("exibir-projeto")

console.log(preview)

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    preview.style.display = 'none';
    BtnInput.style.display = 'inline';
}

BtnInput.addEventListener("click", () => {
    inputIMG.click()
})


inputIMG.addEventListener("change", () => {
    var file = inputIMG.files[0]

    if (file) {
        var leitura = new FileReader();
        leitura.onload = function (event) {
            var imageUrl = event.target.result

            preview.src = imageUrl;
            preview.style.display = 'inline';
            BtnInput.style.display = 'none';
        };
        leitura.readAsDataURL(file);
    } else {
        alert('Nenhum arquivo selecionado.')
    }
});


