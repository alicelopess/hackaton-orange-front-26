const modal = document.getElementsByClassName("container-modal")[0]

function openModal(){
    modal.style.display = "flex";
    containerModais.style.height = "75rem"
}

function closeModal(){
    modal.style.display = "none";
    containerModais.style.height = "57rem"
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
menuMobLinks.addEventListener('click', function() {
    console.log("Drop-2 clicado");
})


//Sair para tela de login
const btnLogout = document.getElementsByClassName("drop-3")[0];

function logout(){
    window.location.href = "../login/index.html"
}