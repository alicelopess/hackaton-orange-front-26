const mensagemSuc = document.getElementsByClassName("sucesso")[0] //Noticação de sucesso

let visibleSenh = document.getElementsByClassName("exibirSenha")[0]
let hiddenSenh = document.getElementsByClassName("ocultarSenha")[0]
let senhaInput = document.getElementById("userPassword");


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
            window.location.href = "http://127.0.0.1:5500/index.html";
        }, 2000);
    }, 2000);
}


///// TESTE DE INTEGRACAO /////
const urlPath = "users"
const url = `http://localhost:3333/${urlPath}` //vai ser mudado quando atualizar o render

// CADASTRO
function resgister() {
    //inputs do form de cadastro
    let userFirstName = document.getElementById("userFirstName").value
    let userLastName = document.getElementById("userLastName").value
    let userEmail = document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value


    const newUser = {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword
    }

    console.log(newUser)
    registerIntegration(newUser)
}

function registerIntegration(newUser) {
        axios.post(url, newUser)
        .then(response => {
            console.log(response)
            redirect()

        })
        .catch(error => {
            console.log(error)
            console.log(error.response.data)
        })
}



