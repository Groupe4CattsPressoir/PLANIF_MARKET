const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const username = document.getElementById("username");
const adresse_email = document.getElementById('adresse_email');
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const frmNouveauCompte = document.getElementById("frmNouveauCompte");
const lmessage = document.getElementById("lmessage");

let utilisateurData = [];

window.addEventListener("load", function (event) {
    if (sessionStorage.getItem("mon_achat_utilisateurs")) {
        utilisateurData = JSON.parse(sessionStorage.getItem("mon_achat_utilisateurs"));
    } else {
        sessionStorage.setItem("mon_achat_utilisateurs", JSON.stringify(utilisateurData));
    }
});

const Utilisateur = {
    nom: "",
    prenom: "",
    username: "",
    email: "",
    password: ""
}

frmNouveauCompte.addEventListener("submit", (e) => {
    e.preventDefault();
    if (utilisateurData.length > 0) {
        const compteExisteDeja = utilisateurData.find(a => a.username === username.value && a.email === adresse_email.value);
        if (compteExisteDeja) {
            lmessage.style.color = "red";
            lmessage.innerHTML = "Ce compte existe déja, essayer avec un autre nom d'utilisateur et email ...";
        } else {
            if (password.value !== confirmPassword.value) {
                lmessage.style.color = "red";
                lmessage.innerHTML = "Mot de passe et confirmer mot de passe doit etre le meme ...";
            } else {
                Utilisateur.nom = nom.value;
                Utilisateur.prenom = prenom.value;
                Utilisateur.username = username.value;
                Utilisateur.email = adresse_email.value;
                Utilisateur.password = password.value;
                utilisateurData.push(Utilisateur);
                sessionStorage.setItem("mon_achat_utilisateurs", JSON.stringify(utilisateurData));
                lmessage.style.color = "green";
                lmessage.innerHTML = "Compte d'utilisateur créé avec succès";
                setInterval(() => {
                    location.replace("index.html");
                }, 3000);
            }
        }
    } else {
        if (password.value !== confirmPassword.value) {
            lmessage.style.color = "red";
            lmessage.innerHTML = "Password and Confirm password must be the same ...";
        } else {
            Utilisateur.nom = nom.value;
            Utilisateur.prenom = prenom.value;
            Utilisateur.username = username.value;
            Utilisateur.email = adresse_email.value;
            Utilisateur.password = password.value;
            utilisateurData.push(Utilisateur);
            sessionStorage.setItem("mon_achat_utilisateurs", JSON.stringify(utilisateurData));
            lmessage.style.color = "green";
            lmessage.innerHTML = "Compte d'utilisateur créé avec succès";
            setInterval(() => {
                location.replace("index.html");
            }, 3000);

        }
    }

});
