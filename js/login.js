const username = document.getElementById("username");
const password = document.getElementById("password");
const frmLogin = document.getElementById("frmLogin");
const lmessage = document.getElementById("lmessage");
let utilisateurData = [];
let UserLogin = {};

window.addEventListener("load", function (event) {
    if (sessionStorage.getItem("mon_achat_utilisateurs")) {
        utilisateurData = JSON.parse(sessionStorage.getItem("mon_achat_utilisateurs"));
    } else {
        sessionStorage.setItem("mon_achat_utilisateurs", JSON.stringify(utilisateurData));
    }

    if (sessionStorage.getItem("mon_achat_login")) {
        UserLogin = JSON.parse(sessionStorage.getItem("mon_achat_login"));
    } else {
        sessionStorage.setItem("mon_achat_login", JSON.stringify(UserLogin));
    }
});

frmLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const uName = username.value;
    const uPassword = password.value;
    const utilisateurExiste = utilisateurData.find(x => x.username === uName && x.password === uPassword);
    if (!utilisateurExiste) {
        lmessage.style.color = "red";
        lmessage.innerHTML = "Nom d'utilisateur ou mot de passe incorrect";
    } else {
        UserLogin = utilisateurExiste;
        sessionStorage.setItem("mon_achat_login", JSON.stringify(UserLogin));
        location.replace("dashboard.html");
    }
});