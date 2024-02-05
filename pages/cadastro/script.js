const mensagemSuc = document.getElementsByClassName("sucesso")[0] //Noticação de sucesso

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





function redirect() {
    // Exibe a mensagem de sucesso após 2 segundos
    setTimeout(function() {
        mensagemSuc.style.display = "flex";
        // Redireciona o usuário após mais 2 segundos (totalizando 4 segundos)
        setTimeout(function() {
            window.location.href = "https://alicelopess.github.io/hackaton-orange-front-26/";
        }, 2000);
    }, 2000);
}





