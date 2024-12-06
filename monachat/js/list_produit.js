const tb_list_achat = document.getElementById('tb_list_achat');
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
    fnListerProduitAAchater();
});

logout.addEventListener("click", function(event) {
    UserLogin = {};
    sessionStorage.setItem("mon_achat_login", JSON.stringify(UserLogin));
    location.replace('login.html');
});

function fnListerProduitAAchater(){
    tb_list_achat.innerHTML = "";
    let produitList = produitData.sort((a, b) => a.date_achat - b.date_achat).filter(a => !a.est_achte && !a.est_dans_le_panier && a.utilisateur == UserLogin.username);
    produitList.forEach((achat, index, list) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = achat.date_achat;
        const td2 = document.createElement('td');
        td2.textContent = achat.nom_produit;
        const td3 = document.createElement('td');
        td3.textContent = achat.quantite_produit;
        const td4 = document.createElement('td');
        td4.textContent = achat.supermarche;
        const td5 = document.createElement('td');
        const checkPanier = document.createElement('input');
        checkPanier.type = "checkbox";
        checkPanier.value = achat.id;
        if(achat.est_achte){
            checkPanier.checked = true;
        }
        checkPanier.onclick = function(event) {
            if(event.target.checked){
                produitData.find(obj => obj.id == event.target.value).est_dans_le_panier = true;
                tr.parentNode.removeChild(tr);
                //tr.classList.add("strikethrough");
            } 
            // else{
            //     produitData.find(obj => obj.id == event.target.value).est_achte = false;
            //     tr.classList.remove("strikethrough");
            // }
            sessionStorage.setItem("mon_achat_produits", JSON.stringify(produitData));
        }
        td5.appendChild(checkPanier);
        const td6 = document.createElement('td');
        const imageEffacer = document.createElement("img");
        imageEffacer.src= "./img/delete-icon.svg";
        imageEffacer.value = achat.id;
        imageEffacer.onclick = function(event){
            const idx = produitData.findIndex(obj => obj.id == event.target.value);
            produitData.splice(idx, 1);
            sessionStorage.setItem("mon_achat_produits", JSON.stringify(produitData));
            tr.parentNode.removeChild(tr);
        }
        td6.appendChild(imageEffacer);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tb_list_achat.appendChild(tr);
    });
}