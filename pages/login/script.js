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

function redirectProfile() {
    // Exibe a mensagem de sucesso após 2 segundos
    window.location.assign("/pages/primeiroacesso/index.html")
    // setTimeout(function() {
    // }, 4000);
}

///// TESTE DE INTEGRACAO /////
const urlPath = "login"
const url = `http://localhost:3333/${urlPath}` //vai ser mudado quando atualizar o render

// LOGIN
function login() {
    //inputs do form de login
    let userEmail = document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value

    const user = {
        email: userEmail,
        password: userPassword
    }

    loginIntegration(user)
}

function loginIntegration(user) {
    axios.post(url, user)
    .then(response => {
        console.log("Response:" + response)
        console.log("Data:" + response.data)
        localStorage.setItem("userData", JSON.stringify(response.data))
        redirectProfile()
    })
    .catch(error => {
        console.log(error)
        console.log(error.response.data)
    })
}