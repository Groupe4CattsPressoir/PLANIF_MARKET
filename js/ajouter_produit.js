const frm_ajouter_produit = document.getElementById('frm_ajouter_produit');
const date_achat = document.getElementById('date_achat');
const nom_produit = document.getElementById('nom_produit');
const quantite_produit = document.getElementById('quantite_produit');
const list_supermarche = document.getElementById('list_supermarche');

const logout = document.getElementById("logout");

let produitData= [];
let UserLogin = {};

window.addEventListener("load", function (event) {
    if (sessionStorage.getItem("mon_achat_login")) {
        UserLogin = JSON.parse(sessionStorage.getItem("mon_achat_login"));
    } else {
        sessionStorage.setItem("mon_achat_login", JSON.stringify(UserLogin));
    }
    if(Object.keys(UserLogin).length === 0) {
        this.location.replace("login.html");
    }

    if (sessionStorage.getItem("mon_achat_produits")) {
        produitData = JSON.parse(sessionStorage.getItem("mon_achat_produits"));
    } else {
        sessionStorage.setItem("mon_achat_produits", JSON.stringify(produitData));
    }
});

logout.addEventListener("click", function(event) {
    UserLogin = {};
    sessionStorage.setItem("mon_achat_login", JSON.stringify(UserLogin));
    location.replace('login.html');
});

const Achat = {
    id: "",
    nom_produit: "",
    quantite_produit: 1,
    date_achat: "",
    supermarche: "",
    est_dans_le_panier : false,
    est_achte: false,
    utilisateur : ""
}

frm_ajouter_produit.addEventListener("submit", function (e) {
    e.preventDefault();
    const date = new Date();
    Achat.id = date.getTime();
    Achat.nom_produit = nom_produit.value;
    Achat.quantite_produit = quantite_produit.value;
    Achat.date_achat = date_achat.value;
    Achat.supermarche = list_supermarche.value;
    Achat.utilisateur = UserLogin.username;
    produitData.push(Achat);
    sessionStorage.setItem("mon_achat_produits", JSON.stringify(produitData));
    location.replace("list_produit.html");
});
