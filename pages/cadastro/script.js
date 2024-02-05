const mensagemSuc = document.getElementsByClassName("sucesso")[0]
console.log(mensagemSuc)



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
