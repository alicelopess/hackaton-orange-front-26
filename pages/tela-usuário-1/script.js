const modal = document.getElementsByClassName("container-modal")[0] // Primeiro modal
const modal2 = document.getElementsByClassName("modal-2")[0] // Segundo modal

const BtnInput = document.getElementsByClassName("enviar-projeto-2")[0] // Btn adicionar imagem no primeiro modal
const inputIMG = document.getElementById("input-file") // input invisivel associado ao form e button acima

const containerModais = document.getElementsByClassName("container-modal")[0] //container que envolve os modais
let preview = document.getElementById("exibir-projeto") //Imagem a ser exibida no primeiro modal
let preview2 = document.getElementById("exibir-projeto-2") //Imagem a ser exibida no segundo modal

// Detalhe: Como há dois locais onde as imagens carregas forão exibidas, com medidas diferentes
// optei por utilizar um id para cada



/*Primeiro modal / abrir e fechar*/
function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    preview.style.display = 'none';
    BtnInput.style.display = 'inline';
}


/*Segundo modal / abrir e fechar

Detalhe: Precisei mexer na altura do container que envolve o modal (sombra) devido ao bug de altura  */
function openModal2(){
    modal2.style.display = "flex";
    containerModais.style.height = "75rem"
}

function closeModal2(){
    modal2.style.display = "none";
    containerModais.style.height = "57rem"
}



//Criei essa funcao associada ao botao para que ela chame o input (que está invisível)
BtnInput.addEventListener("click", () => {
    inputIMG.click()
})

// Funcionalidade para o usuário enviar a imagem e ela s
inputIMG.addEventListener("change", () => {
    let file = inputIMG.files[0]

    if (file) {
        var leitura = new FileReader();
        leitura.onload = function (event) {
            var imageUrl = event.target.result

            preview.src = imageUrl;
            preview2.src= imageUrl;
            preview.style.display = 'inline';
            BtnInput.style.display = 'none';
        };
        leitura.readAsDataURL(file);
    } else {
        alert('Nenhum arquivo selecionado.')
    }
});


