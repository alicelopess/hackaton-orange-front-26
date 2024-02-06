// Config
const path = "projects" //pode ser user
const url = `http://localhost:3333/${path}`


const userData = JSON.parse(localStorage.getItem("userData"))
if (!userData) window.location.replace('/')

// Modais
const modalContainer = document.getElementById('container-modal') // Container envolvendo os modais
const modalCriarProjeto = document.getElementById('modal-adicionar-projeto') // Modal de criar projeto
const modalVisualizarProjeto = document.getElementById('modal-visualizar-projeto') // Modal de visualizar projeto criado
const modalExcluirProjeto = document.getElementById('modal-projeto-acao-excluir') // Modal de alerta quando vai excluir projeto
const modalProjetoAcaoSucesso = document.getElementById('modal-projeto-acao-sucesso') // Modal de alerta quando tem acao sucesso de projeto criado ou excluido
const mensagemAcaoSucesso = document.getElementById('modal-projeto-acao-sucesso-mensagem')

const buttonExcluirProjeto = document.getElementById("btn-excluir-projeto")
const buttonSalvarProjeto = document.getElementById('btnSalvar')
const BtnInput = document.getElementsByClassName("enviar-projeto-2")[0]; // Botão para adicionar imagem no primeiro modal
const inputIMG = document.getElementById("input-file"); // Input invisível associado ao formulário e botão acima

// Inputs do formulário
let inptTitle = document.getElementById("titulo");
let inptLink = document.getElementById("link");
let inptDescricao = document.getElementById("descricao");
let inptTag = document.getElementById("tags");

// Campos do modal de projeto
const imagemProjeto = document.getElementById("imagem-projeto-criado")
const dataProjeto = document.getElementById("data-projeto-criado")
const tituloProjeto = document.getElementById("titulo-projeto-criado")
const descricaoProjeto = document.getElementById("descricao-projeto-criado")
const tagsProjeto = document.getElementById("tags-projeto-criado")
const linkProjeto = document.getElementById("link-projeto-criado")

// Imagens a serem exibidas nos modais
let preview = document.getElementById("exibir-projeto"); // Imagem exibida no primeiro modal
// let preview2 = document.getElementById("exibir-projeto-2"); // Imagem exibida no segundo modal

// Inputs/Submissões do formulário e botões associados
const inpSubmit = document.getElementById("Enviar"); // Input/Submit do formulário (Enviar)
const btnSalvar = document.getElementById("btnSalvar"); // Botão para enviar o formulário


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////// FUNCOES MODAIS//////////////
// funcao generica para exibir e ocultar fundo preto e modal escolhido
function openModal(modal) {
    modalContainer.style.display = "flex";
    modal.style.display = "flex"
}
function closeModal(modal) {
    modalContainer.style.display = "none";
    modal.style.display = "none"
}

// funcoes de abrir e fechar modal de adicionar novo projeto
function openModalAdicionarProjeto() {
    openModal(modalCriarProjeto)
    buttonSalvarProjeto.setAttribute('mode', 'create')
}
function closeModalAdicionarProjeto() {
    BtnInput.style.display = 'flex';
    preview.style.display = 'none';


    closeModal(modalCriarProjeto)
    limparForm()
}

// funcones para abrir e fechar modal de preview
function openModalVisualizarPreviewProjeto() {
    openModal(modalVisualizarProjeto)
    autocompletar()
}
function closeModalVisualizarPreviewProjeto() {
    closeModal(modalVisualizarProjeto)
}

//funcoes fechar modal do alerta de projeto criado ou projeto excluido
function closeModalProjetoAcaoSucesso() {
    closeModal(modalProjetoAcaoSucesso)
}

// funcoes abrir e fechar modal da visualizacao de projeto (tanto projeto criado quando previa)
function openModalVisualizarProjeto(project) {
    openModal(modalVisualizarProjeto)
    renderProjectModal(project)

}
function closeModalVisualizarProjeto() {
    const criandoProjeto = modalCriarProjeto.style.display == 'flex'

    if (criandoProjeto) {
        modalVisualizarProjeto.style.display = 'none'
        return;
    }

    closeModal(modalVisualizarProjeto)
}

// funcoes para exibir e ocultar modal de confirmar exclusao do projeto
function openModalExcluirProjeto() {
    openModal(modalExcluirProjeto)

}
function closeModalExcluirProjeto() {
    closeModal(modalExcluirProjeto)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCOES GENERICAS UTILITARIAS

// funcao para exibir e ocultar acoes de edicao e exclusao
function toggleProjetoAcoes(id) {
    let menu = document.getElementById(`menu-acao-${id}`)
    let menuAberto = menu.style.display == 'flex'


    if (menuAberto) menu.style.display = 'none'
    else menu.style.display = 'flex'

}

// funcao generica para guiar criacao ou edicao do projeto
function salvarProjeto() {
    const modoSave = buttonSalvarProjeto.getAttribute('mode');

    switch (modoSave) {
        case 'create':
            createProject()
            break
        case 'edit':
            const projectId = buttonSalvarProjeto.getAttribute('projectIdToEdit');
            updateProject(projectId)
            break
        default:
        
    }

}

//limpar campos do formulário
function limparForm() {
    preview.src = ""
    inptTitle.value = "";
    inptLink.value = "";
    inptDescricao.value = "";
    inptTag.value = "";

}

// formatar data em dd/mm/yyyy
function formatDate(date) {
    return Intl.DateTimeFormat().format(new Date(date))
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////INTEGRAÇÃO/////////////////////////////

function createProject() {
    //inputs do form
    let image = preview.src
    let title = inptTitle.value
    let tag = inptTag.value
    let link = inptLink.value
    let description = inptDescricao.value

    if (!image || !title || !tag || !link || !description) return

    const project = {
        title,
        tag,
        link,
        description,
        image,
    }

    axios.post(url, project, {
        headers: {
            'authorization': `Bearer ${userData.token}`
        }
    })
    .then(response => {
        closeModalAdicionarProjeto()

        openModal(modalProjetoAcaoSucesso)
        mensagemAcaoSucesso.innerText = response.data.message

        const data = response.data
        const projects = data.data
        renderProjects(projects)
        
        //alert(data)
    })
    .catch(error => {
        console.log(error)
    })
}

function getProjects() {
    const loadingProjetos = document.getElementById('projects-loading-state')
    loadingProjetos.style.display = 'flex'

    axios.get(url, {
        headers: {
            'authorization': `Bearer ${userData.token}`
        }
    })
        .then(response => {
            const data = response.data
            renderProjects(data)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            loadingProjetos.style.display = 'none'
        })
}

function updateProject(projectId) {
    let image = preview.src
    let title = inptTitle.value
    let tag = inptTag.value
    let link = inptLink.value
    let description = inptDescricao.value

    if (!image || !title || !tag || !link || !description) return

    const project = {
        title,
        tag,
        link,
        description,
        image,
    }

    axios.put(`${url}/${projectId}`, project, {
        headers: {
            'authorization': `Bearer ${userData.token}`
        }
    })
        .then(response => {
            closeModalAdicionarProjeto()

            const data = response.data
            const projects = data.projectsArray

            openModal(modalProjetoAcaoSucesso)
            mensagemAcaoSucesso.innerText = data.message

            renderProjects(projects)

        })
        .catch(error => {
            console.log(error)
        })
}

function deleteProject(projectId) {
    axios.delete(`${url}/${projectId}`, {
        headers: {
            'authorization': `Bearer ${userData.token}`
        }
    })
    .then(response => {
        const data = response.data

        closeModalExcluirProjeto()
        
        openModal(modalProjetoAcaoSucesso)
        mensagemAcaoSucesso.innerText = data.message

        renderProjects(data.projectsArray)
            
    })
    .catch(error => {
        console.log(error)
    })
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////RENDERIZACAO////////////////////

function renderProjects(projects) {
    if (projects.length > 0) {
        document.getElementById('projects-empty-state').style = 'display:none'
        document.getElementById('projects-list').style = 'display:flex'
    }
    else {
        document.getElementById('projects-empty-state').style = 'display:flex'
        document.getElementById('projects-list').style = 'display:none'
    }

    //Div com todos
    const listagemProjetos = document.getElementById('projects-list')

    const projectsDivs = projects.map((project) => {
        //Individual
        const div = document.createElement('div')
            div.classList.add("projeto-criado")
            div.onclick = function(){
                openModalVisualizarProjeto(project)
            }

        // IMAGE CONTAINER
        const containerImagem = document.createElement('div')
            containerImagem.classList.add('projeto-imagem-container')

            // ACTION MENU
            const edicao = document.createElement('div')
            edicao.classList.add('edicao-option')
            edicao.onclick = function(e){
                e.stopPropagation()
                toggleProjetoAcoes(project._id)
            }

                const icone = document.createElement('img')
                icone.setAttribute('src', '../../assets/edit.png')

                const menuAcao = document.createElement('div')
                menuAcao.setAttribute('id', `menu-acao-${project._id}`)
                menuAcao.classList.add('balao-options')

                const acaoEdicao = document.createElement('button')
                    acaoEdicao.onclick = function(){ 
                        buttonSalvarProjeto.setAttribute('mode', 'edit')
                        buttonSalvarProjeto.setAttribute('projectIdToEdit', project._id)
                        preview.style.display = 'block';
                        preview.style.borderRadius = '4px';
                        BtnInput.style.display = 'none';

                        preview.src = project.image
                        inptTitle.value = project.title
                        inptTag.value = project.tag
                        inptDescricao.value = project.description
                        inptLink.value = project.link
                        openModal(modalCriarProjeto)
                    }
                    acaoEdicao.innerText = "Editar"
                    
                    const acaoExcluir = document.createElement('button')
                    acaoExcluir.onclick = function(){ 
                        openModalExcluirProjeto()
                        buttonExcluirProjeto.onclick = function() {
                            deleteProject(project._id)
                        }
                     }
                    acaoExcluir.innerText = "Excluir"
                
                menuAcao.appendChild(acaoEdicao)
                menuAcao.appendChild(acaoExcluir)
            
            edicao.appendChild(icone)
            edicao.appendChild(menuAcao)

            const imagem = document.createElement('img')
                imagem.setAttribute('src', project.image)

        containerImagem.appendChild(edicao)
        containerImagem.appendChild(imagem)

        
        // MAIN INFORMATION
        const informacaoProjeto = document.createElement('div')
            informacaoProjeto.classList.add('projeto-infos')

            const info = document.createElement('div')
                info.classList.add("projeto-infos-geral")

                const avatar = document.createElement('img')
                    avatar.setAttribute('src', '../../assets/Image.png')
                    avatar.classList.add("projeto-avatar")

                const title = document.createElement('p') // nome do usuario
            
            info.appendChild(avatar)
            // nome do usuario
            info.appendChild(title).innerHTML = `${project.title} • ${formatDate(project.createdAt)} `

            const tags = document.createElement('div')
                tags.classList.add("tags")
            const tag = document.createElement('p')
                tag.innerHTML = `${project.tag}`

            tags.appendChild(tag)

        informacaoProjeto.appendChild(info)
        informacaoProjeto.appendChild(tags)
        

        div.appendChild(containerImagem)
        div.appendChild(info)

        
        return div
    })

    listagemProjetos.innerHTML = ""

    projectsDivs.forEach(projectDiv => {
        listagemProjetos.appendChild(projectDiv)
    });
}

function renderProjectModal(project) {
    const tags = project.tag.split(' ').map(tag => `<p>${tag}</p>`)

    dataProjeto.textContent = formatDate(project.createdAt)
    imagemProjeto.setAttribute('src', project.image)
    tituloProjeto.textContent = project.title
    descricaoProjeto.textContent = project.description
    tagsProjeto.innerHTML = tags
    linkProjeto.textContent = project.link

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// VALIDAR E REFATORAR CODIGO
    // Função associada ao botão para abrir o input de arquivo invisível
    document.getElementById("imagem-projeto").addEventListener("click", () => {
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
                preview.style.display = 'flex';
                BtnInput.style.display = 'none';
            };
            leitura.readAsDataURL(file);
        } else {
            alert('Nenhum arquivo selecionado.');
        }
    });


    // Preenche os campos do preview com o que está sendo preenchido nos campos do formulário
    // Funcao sendo chamada dentro do openmodalVisualizarProjeto(botao de visualzação)
    function autocompletar() {
        if (preview.src) {
            imagemProjeto.src = preview.src
        }

        dataProjeto.innerText = formatDate(new Date())

        if (inptTitle.value === "") {
            tituloProjeto.innerHTML = "Título do projeto";
        } else {
            tituloProjeto.textContent = inptTitle.value;
        }

        if (inptDescricao.value === "") {
            descricaoProjeto.textContent = "(Descrição)";
        } else {
            descricaoProjeto.textContent = inptDescricao.value;
        }

        if (inptTag.value === "") {
            tagsProjeto.textContent = "(Tags)";
        } else {
            capturaTags(inptTag.value);
        }

        if (inptLink.value === "") {
            linkProjeto.textContent = "Link do projeto";
        } else {
            linkProjeto.textContent = inptLink.value;
        }
    }

    //Capturar as tags no input e exibir no preview
    function capturaTags(tags) {
        let palavras = tags.split(/\s+/);
        tagsProjeto.innerHTML = ""

        if (inptTag.value !== "") {
            palavras.forEach(tag => {

                let paragrafo = document.createElement("p");
                paragrafo.textContent = tag;
                tagsProjeto.appendChild(paragrafo)
            });
        }

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
            modalContainer.style.height = "100vh"
            modalContainer.style.height = "10rem"
        }
    }

    function resetPreview() {


        if (window.innerWidth < 1500) {
            modalContainer.style.height = "220%"
            modalContainer.style.height = "auto"
        } else {
            modalContainer.style.height = "150%"
            modalContainer.style.height = "auto"
        }

    }


////// GET USER DATA FROM LOCAL STORAGE
function getUserData() {
    const userData = localStorage.getItem("userData")
    // console.log(userData)
    const userObjectData = JSON.parse(userData)
    // console.log(userObjectData)
    renderUserInformation(userObjectData)
}

////// MANIPULANDO USER DATA 
function renderUserInformation(userObjectData) {
    const userInfoContainer = document.getElementById("user-infos")

    var userFullName = document.createElement("h3")
    userFullName.id = "user-full-name"
    userFullName.innerHTML = `${userObjectData.firstName} ${userObjectData.lastName}`
    userInfoContainer.append(userFullName)

    var userCountry = document.createElement("p")
    userCountry.id = "user-country"
    userCountry.innerHTML = `${userObjectData.country}`
    userInfoContainer.append(userCountry)

    var createProjectBtn = document.createElement("button")
    createProjectBtn.className = "h"
    createProjectBtn.innerHTML = "ADICIONAR PROJETO"
    createProjectBtn.onclick = function() {openModalAdicionarProjeto()}
    userInfoContainer.append(createProjectBtn)
}

