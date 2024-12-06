const frm_reset_password = document.getElementById('frm_reset_password');
const username = document.getElementById('username');
const adresse_email = document.getElementById('adresse_email');
const lmessage = document.getElementById('lmessage');

let utilisateurData = [];

window.addEventListener("load", function (event) {
    if (sessionStorage.getItem("mon_achat_utilisateurs")) {
        utilisateurData = JSON.parse(sessionStorage.getItem("mon_achat_utilisateurs"));
    } else {
        sessionStorage.setItem("mon_achat_utilisateurs", JSON.stringify(utilisateurData));
    }
});

frm_reset_password.addEventListener('click', function(event) {
    event.preventDefault();
    let uName = username.value;
    let email = adresse_email.value;
    const utilisateurExiste = utilisateurData.find(x => x.username === uName && x.email === email);
    if (!utilisateurExiste) {
        lmessage.style.color = "red";
        lmessage.innerHTML = "Nom d'utilisateur/email inéxistant";
    } else {
        let newPassword = `${utilisateurExiste.username}123@`;
        utilisateurData.find(x => x.username === uName && x.email === email).password = newPassword;
        sessionStorage.setItem("mon_achat_utilisateurs", JSON.stringify(utilisateurData));
        //envoie email
            emailjs.send("service_dgly2xt","template_g9pg2jv",{
            from_name: "PLANIF Market",
            to_name: utilisateurExiste.username,
            message: "Hello, "+ `${utilisateurExiste.username}`+ "," + " your password has been changed to : " + newPassword,
            reply_to: `${utilisateurExiste.username}`,
            to_email: `${utilisateurExiste.email}`
            });
        
        lmessage.style.color = "green";
        lmessage.innerHTML = "Mot de passe ré-initialisé avec succès";
        setInterval(() => {
            location.replace("login.html");
        }, 3000);
    }
});