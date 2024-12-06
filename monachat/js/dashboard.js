const logout = document.getElementById("logout");
const utilisateurconnecte = document.getElementById('utilisateurconnecte');
const nombreproduit_a_acher = document.getElementById('nombreproduit_a_acher');
const nombrepanier = document.getElementById('nombrepanier');
const nombreproduit_acheter = document.getElementById('nombreproduit_acheter');

let produitData= [];
let UserLogin = {};

const listSuperMarche = [
    {
        nom : "Délimart 32",
        adresse : "32 Rte de Delmas, Port-au-Prince 6120, Haïti",
        telephone : " +509 28 13 1249"
    },
    {
        nom : "Délimart Turgeau",
        adresse : "148 Ave Jean-Paul II, Port-au-Prince, Haïti",
        telephone : "+509 28 11 1098"
    },
    {
        nom : "Olympic Market",
        adresse : "Lalue, Angle Ruelle Berne, Port-au-Prince 7410, Haïti",
        telephone : "+509 55 15 5050"
    },
    {
        nom : "KONPA MARKET",
        adresse : "34, rue Panaméricaine Pétion-Ville",
        telephone : "44 09 34 34"
    },
    {
        nom : "Caribbean SuperMarket",
        adresse : "51 Metellus, Pétion-Ville, Haïti",
        telephone : "+509 31 13 3333"
    },
    {
        nom : "BonJean Market",
        adresse : "Delmas 69, Rte de Delmas, Port-au-Prince, Haïti",
        telephone : "+509 28 11 0402"
    },
    {
        nom : "Big Star Market",
        adresse : "6 Angle Rue Chavannes & Lamarre., Petion-Ville, Haïti",
        telephone : "+509 28 13 0261"
    },
    {
        nom : "Giant Supermarket",
        adresse : "68 Oge, Pétion-Ville, Haïti",
        telephone : "+509 29 47 4444"
    },
    {
        nom : "Supermax Supermarket",
        adresse : "5 Darguin, Petion-Ville, Haïti",
        telephone : "+509 28 19 3030"
    }
];

const smallCardContainer = document.getElementById('smallCardContainer');


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

    utilisateurconnecte.textContent = `Bonjour ${UserLogin.nom} ${UserLogin.prenom}`;

    if(produitData.length > 0) {
        let produits_a_acheter = produitData.filter(a => !a.est_achte && !a.est_dans_le_panier && a.utilisateur == UserLogin.username).length;
        let panier = produitData.filter(a => !a.est_achte && a.est_dans_le_panier && a.utilisateur == UserLogin.username).length;
        let produits_achetes = produitData.filter(a => a.est_achte && a.est_dans_le_panier && a.utilisateur == UserLogin.username).length;
        nombreproduit_a_acher.textContent = produits_a_acheter;
        nombrepanier.textContent = panier;
        nombreproduit_acheter.textContent = produits_achetes;
    }

    

    listSuperMarche.forEach(item => {
        const smallCard = document.createElement('div');
        smallCard.classList.add('small-card');
    
        const title = document.createElement('h3');
        title.classList.add('small-card-title');
        title.textContent = item.nom;
    
        const description = document.createElement('p');
        description.classList.add('small-card-description');
        description.textContent = item.adresse;
    
        const telephone = document.createElement('p');
        telephone.classList.add('small-card-telephone');
        telephone.textContent = item.telephone;
    
        smallCard.appendChild(title);
        smallCard.appendChild(description);
        smallCard.appendChild(telephone);
        smallCardContainer.appendChild(smallCard);
    });
});

logout.addEventListener("click", function(event) {
    UserLogin = {};
    sessionStorage.setItem("mon_achat_login", JSON.stringify(UserLogin));
    location.replace('login.html');
});

