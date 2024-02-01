// Selecionando elementos do DOM
const modal = document.getElementsByClassName("container-modal")[0]; // Container envolvendo os modais
const modal1 = document.getElementsByClassName("modal-1")[0]; // Primeiro modal
const modal2 = document.getElementsByClassName("modal-2")[0]; // Segundo modal
const modal3 = document.getElementsByClassName("modal-3")[0]; // Último modal

const BtnInput = document.getElementsByClassName("enviar-projeto-2")[0]; // Botão para adicionar imagem no primeiro modal
const inputIMG = document.getElementById("input-file"); // Input invisível associado ao formulário e botão acima

// Inputs do formulário
let inptTitle = document.getElementById("titulo");
let inptLink = document.getElementById("link");
let inptDescricao = document.getElementById("descricao");
let inptTag = document.getElementById("tags");

// Campos da prévia onde os inputs serão exibidos
let previewTitle = document.querySelector(".title h5");
let previewDescri = document.querySelector("#des-1");
let previewLink = document.querySelector(".descricao a");

console.log(previewDescri)
console.log(previewLink)

// Imagens a serem exibidas nos modais
const containerModais = document.getElementsByClassName("container-modal")[0]; // Container que envolve os modais
let preview = document.getElementById("exibir-projeto"); // Imagem exibida no primeiro modal
let preview2 = document.getElementById("exibir-projeto-2"); // Imagem exibida no segundo modal

// Inputs/Submissões do formulário e botões associados
const inpSubmit = document.getElementById("Enviar"); // Input/Submit do formulário (Enviar)
const btnSalvar = document.getElementById("btnSalvar"); // Botão para enviar o formulário

// Abre e fecha o primeiro modal
function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    preview.style.display = 'none';
    BtnInput.style.display = 'inline';
    preview2.src = "/";
    
    LimparForm()
}

// Abre e fecha o segundo modal
function openModal2() {
    modal2.style.display = "flex";
    containerModais.style.height = "75rem";
    autocompletar();
}

function closeModal2() {
    modal2.style.display = "none";
    containerModais.style.height = "57rem";
}

// Abre e fecha o último modal
function openModal3() {
    modal.style.display = "flex";
    modal1.style.display = "none";
    modal3.style.display = "flex";

    // Reset nos campos das imagens carregadas
    preview2.src = "/";
    preview.style.display = 'none';
    BtnInput.style.display = 'inline';
    LimparForm()
}

function closeModal3() {
    modal3.style.display = "none";
    modal.style.display = "none";
    modal1.style.display = "inline";
}

// Função associada ao botão para abrir o input de arquivo invisível
BtnInput.addEventListener("click", () => {
    inputIMG.click();
});

// Funcionalidade para o usuário enviar a imagem
inputIMG.addEventListener("change", () => {
    let file = inputIMG.files[0];

    if (file) {
        var leitura = new FileReader();
        leitura.onload = function (event) {
            var imageUrl = event.target.result;

            preview.src = imageUrl;
            preview2.src = imageUrl;
            preview.style.display = 'inline';
            BtnInput.style.display = 'none';
        };
        leitura.readAsDataURL(file);
    } else {
        alert('Nenhum arquivo selecionado.');
    }
});

// Preenche os campos da prévia com o que está sendo preenchido nos campos do formulário
// Funcao sendo chamada dentro do openModal2(botao de visualzação)
function autocompletar() {
    if (inptTitle.value === "") {
        previewTitle.textContent = "Título do projeto";
    } else {
        previewTitle.textContent = inptTitle.value;
    }

    if (inptDescricao.value === "") {
        previewDescri.textContent = "(Descrição)";
    } else {
        previewDescri.textContent = inptDescricao.value;
    }

    if (inptLink.value === "") {
        previewLink.textContent = "Link do projeto";
    } else {
        previewLink.textContent = inptLink.value;
    }
}


//limpar campos do formulário
function LimparForm() {
    inptTitle.value = ""; 
    inptLink.value = ""; 
    inptDescricao.value = ""; 
    inptTag.value = "";
}