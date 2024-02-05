// Selecionando elementos do DOM
const modal = document.getElementsByClassName("container-modal")[0]; // Container envolvendo os modais
const modal1 = document.getElementsByClassName("modal-1")[0]; // Primeiro modal do formulário
const modal2 = document.getElementsByClassName("modal-2")[0]; // modal visualização do projeto
const modal3 = document.getElementsByClassName("modal-3")[0]; // modal de confirmação de criação projeto
const modal4 = document.getElementsByClassName("modal-4")[0]; // Modal de exclusão modal

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


// Adicione o código para exibir e ocultar o balão de opções para todos os elementos .options-criados
const opcoesCriados = document.querySelectorAll(".options-criados");
opcoesCriados.forEach(opcao => {
    opcao.addEventListener("click", () => {
        const balaoOption = opcao.nextElementSibling;
        balaoOption.style.display = (balaoOption.style.display === "none" || balaoOption.style.display === "") ? "flex" : "none";
    });

    opcao.addEventListener("dblclick", (event) => {
        event.preventDefault();
    });
});




// Abre e fecha o primeiro modal
function openModal() {
    modal.style.display = "flex";
    modal1.style.display = "inline"
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

// Abre e fecha o terceiro modal (Botao Salvar)
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


//local onde ficará a imagem convertida
let imagemBase64;

// Funcionalidade para o usuário enviar a imagem + conversão em base 64 para enviar pro backend
inputIMG.addEventListener("change", () => {
    let file = inputIMG.files[0];

    // Antes de converter o arquivo, precisa verificar o tamanho dele
    if (file) {
        const limiteTamanho = 10 * 1024 * 1024; //Criei essa var como parâmetro para comparar o tamanho
        if (file.size > limiteTamanho) {
            alert('Tamanho não suportado, por favor escolha um arquivo menor.');
            inputIMG.value = ''; // Caso o arquivo não atenda, exclui a alocação dele e deixa o input vazio
            return;
        }

        //Conversão de imagem para string.
        //É preciso ler o arquivo antes de executar a conversão 
        let leitura = new FileReader(); // FileReader() é um método nativo do js 
        leitura.onload = function (event) {
            imagemBase64 = event.target.result;
            console.log(imagemBase64)

            preview.src = imagemBase64;
            preview2.src = imagemBase64;
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
        modal.style.height = "150%"
        containerProj.style.height = "50rem"
        containerProj.style.overflow = "hidden"
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

//Teste de Integração

// url
const path = "projects" //pode ser user
const url = `http://localhost:3333/${path}`

function atribuicaoTeste() {
    modal4.style.display = "none"
    //inputs do form
    let inptTitle = document.getElementById("titulo").value
    let inptTag = document.getElementById("tags").value
    let inptLink = document.getElementById("link").value
    let inptDescription = document.getElementById("descricao").value


    const project = {
        title: inptTitle,
        tag: inptTag,
        link: inptLink,
        description: inptDescription,
        image: "image"
    }

    addProject(project)
}

function addProject(project) {
    axios.post(url, project)
        .then(response => {
            openModal3()
            console.log(response)
            const data = response.data
            //alert(data)
        })
        .catch(error => {
            console.log(error)
        })
}


function editar() {
    openModal()
    modal4.style.display = "none";
    balaoOption.style.display = "none";
    modal1.style.display = "inline";

}

function excluir() {
    modal.style.display = "inline";
    modal1.style.display = "none";
    modal3.style.display = "none";
    modal4.style.display = "flex"

}


function closeModal4() {
    modal4.style.display = "none";
    modal.style.display = "none";
    balaoOption.style.display = "none";

}