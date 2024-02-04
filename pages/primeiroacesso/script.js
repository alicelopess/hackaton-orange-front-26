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
let previewTag = document.querySelector(".tags");

//container dos projetos (precisei mexer neles para fixar o tamanho da tela quando abrir o modal)
const containerProj = document.getElementsByClassName("container-projetos")[0]; // Container que envolve os projects
const body = document.getElementsByTagName("body")[0];

// Imagens a serem exibidas nos modais
let preview = document.getElementById("exibir-projeto"); // Imagem exibida no primeiro modal
let preview2 = document.getElementById("exibir-projeto-2"); // Imagem exibida no segundo modal

// Inputs/Submissões do formulário e botões associados
const inpSubmit = document.getElementById("Enviar"); // Input/Submit do formulário (Enviar)
const btnSalvar = document.getElementById("btnSalvar"); // Botão para enviar o formulário

// Abre e fecha o primeiro modal
function openModal() {
    modal.style.display = "flex";

    abriContainer()
}

function closeModal() {
    modal.style.display = "none";
    preview.style.display = 'none';
    BtnInput.style.display = 'inline';
    preview2.src = "/";

    fecharContainer()
    LimparForm()
}

// Abre e fecha o segundo modal
function openModal2() {
    modal2.style.display = "flex";
    autocompletar();
    capturaTags();
    fixedPreview()

}

function closeModal2() {
    modal2.style.display = "none";

    limparTags();
    resetPreview();
}

// Abre e fecha o último modal (Botao Salvar)
function openModal3() {
    modal.style.display = "flex";
    modal1.style.display = "none";
    modal3.style.display = "flex";

    // Reset nos campos das imagens carregadas
    preview2.src = "/";
    preview.style.display = 'none';
    BtnInput.style.display = 'inline';
    fecharContainer()
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

// Preenche os campos do preview com o que está sendo preenchido nos campos do formulário
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

//Capturar as tags no input e exibir no preview
function capturaTags() {
    let palavras = inptTag.value.split(/\s+/);

    if (inptTag.value !== "") {
        palavras.forEach(tag => {

            let paragrafo = document.createElement("p");
            paragrafo.textContent = tag;
            previewTag.appendChild(paragrafo)
        });
    }

}


//Atualizar as tags quando sair do preview
function limparTags() {
    previewTag.innerHTML = ""
}



//Exibir data atualizada no preview
attData()
function attData() {
    let date = document.querySelector("#date")
    console.log(date.textContent)

    let dataAtual = new Date();
    let ano = dataAtual.getFullYear().toString().slice(-2);
    let mes = dataAtual.getMonth() + 1;
    let dataFormatada = mes + '/' + ano;

    date.textContent = dataFormatada;
}


//Precisei limitar manualmente o tamanho do meu container modal (sombra) 
//para cubrir meu modal
function abriContainer() {
    body.style.height = "100vh"
    containerProj.style.height = "50rem"
    containerProj.style.overflow = "hidden"
}

function fecharContainer() {
    containerProj.style.height = "auto"
    containerProj.style.overflow = "visible"

}


//Open menu mobile
const menuMob = document.getElementsByClassName("drop")[0];
const menuMobLinks = document.getElementsByClassName("drop-2")[0];
let menuVisible = false;

// Função para controlar o menu mobile
function controlMenuMobile() {
    if (menuVisible) {
        closeMenuMob();
    } else {
        openMenuMob();
    }
}

function openMenuMob() {
    menuMob.style.display = "flex";
    menuVisible = true;
}

function closeMenuMob() {
    menuMob.style.display = "none";
    menuVisible = false;
}

menuMob.addEventListener('click', controlMenuMobile);
menuMobLinks.addEventListener('click', function () {
    console.log("Drop-2 clicado");
})


//Sair para tela de login / Mobile
const btnLogout = document.getElementsByClassName("drop-3")[0];
function logout() {
    window.location.href = "../login/index.html"
}


//Fixar tela de visualização do projeto / Mobile
function fixedPreview() {
    window.scrollTo(0, 0);
    if (window.innerWidth < 900) {
        modal.style.height = "100vh"
        containerProj.style.height = "10rem"
    }
}

function resetPreview() {


    if (window.innerWidth < 1500) {
        modal.style.height = "220%"
        containerProj.style.height = "auto"
    } else {
        modal.style.height = "150%"
        containerProj.style.height = "auto"
    }

}