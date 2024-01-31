const modal = document.getElementsByClassName("container-modal")[0] // Container envolvendo os modais
const modal1 = document.getElementsByClassName("modal-1")[0] // Primeiro modal
const modal2 = document.getElementsByClassName("modal-2")[0] // Segundo modal
const modal3 = document.getElementsByClassName("modal-3")[0] //último modal

const BtnInput = document.getElementsByClassName("enviar-projeto-2")[0] // Btn adicionar imagem no primeiro modal
const inputIMG = document.getElementById("input-file") // input invisivel associado ao form e button acima






//  Detalhe: Como há dois locais onde as imagens são exibidas, com medidas diferentes
//  optei por utilizar um id para cada

const containerModais = document.getElementsByClassName("container-modal")[0] //container que envolve os modais
let preview = document.getElementById("exibir-projeto") //Imagem a ser exibida no primeiro modal
let preview2 = document.getElementById("exibir-projeto-2") //Imagem a ser exibida no segundo modal


// Por algum motivo, não consegui utilizar o submit fora do form no HTML e manter o container do modal aberto,
// então optei por criar um outro botão e integrar os dois..

const inpSubmit = document.getElementById("Enviar") // Input/Submir do formulário (Enviar)
const btnSalvar = document.getElementById("btnSalvar") //Botão para enviar o formulário



/*Primeiro modal / abrir e fechar*/
function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    preview.style.display = 'none';
    BtnInput.style.display = 'inline';
    preview2.src = "/"
}


/*Segundo modal / abrir e fechar
Detalhe: Precisei mexer na altura do container que envolve o modal (sombra) devido ao bug de altura  */
function openModal2() {
    modal2.style.display = "flex";
    containerModais.style.height = "75rem"

    autocompletar()
}

function closeModal2() {
    modal2.style.display = "none";
    containerModais.style.height = "57rem"
}


/* Útimo modal / abrir e fechar */
function openModal3() {
    modal.style.display = "flex";
    modal1.style.display = "none";
    modal3.style.display = "flex";

    //reset nos campos das imagens carregadas
    preview2.src = "/"
    preview.style.display = 'none';
    BtnInput.style.display = 'inline';


}

function closeModal3() {
    modal3.style.display = "none";
    modal.style.display = "none";
    modal1.style.display = "inline";
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
            preview2.src = imageUrl;
            preview.style.display = 'inline';
            BtnInput.style.display = 'none';
        };
        leitura.readAsDataURL(file);
    } else {
        alert('Nenhum arquivo selecionado.')
    }
});




 //Em desenvolvimento
//Criei essa função para integrar o que está sendo preenchido nos campos do formulário
//com o que está sendo exibido no segundo modal
//Detalhe: adiconei a chamada dessa função dentro da openModal2

function autocompletar() {
    //inputs do form
    let inptTitle = document.getElementById("titulo")
    let inptLink = document.getElementById("link")
    let inptDescricao = document.getElementById("descricao")

    //Campos da prévia onde eu vou exibir o que há no input
    let previewTitle = document.querySelector(".title h5")
    let previewDescri = document.querySelector("#des-1")
    let previewLink = document.querySelector(".descricao a")


    if(inptTitle.value === ""){
        previewTitle.textContent = "(Título do projeto)"
    } else {
        previewTitle.textContent = inptTitle.value
    }

    previewTitle.textContent = inptTitle.value;
    previewDescri.textContent = inptDescricao.value;
    previewLink.textContent = inptTitle.value;   
}







