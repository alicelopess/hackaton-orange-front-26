let visibleSenh = document.getElementsByClassName("exibirSenha")[0]
let hiddenSenh = document.getElementsByClassName("ocultarSenha")[0]
let senhaInput = document.getElementById("inputSenh");


let verfSnha = true; 
function optionSenha() {


    if (verfSnha) {
        visibleSenh.style.display = "none";
        hiddenSenh.style.display = "inline";
        senhaInput.type = "text";
    } else {
        hiddenSenh.style.display = "none";
        visibleSenh.style.display = "inline"; 
        senhaInput.type = "password";
    }
    verfSnha = !verfSnha; 
}