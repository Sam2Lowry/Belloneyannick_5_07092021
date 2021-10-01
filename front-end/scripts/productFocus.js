// Variables et constantes
const stockCameras = "http://localhost:3000/api/cameras";


eventListeners();

//Classe de stockage du produit
class Product {
  constructor(id, lens, price) {
    this.id = id;
    this.lens = lens;
    this.price = price;
  }
}

//All event listeners
function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    Purchase();
  });
}

// Fonction d'exploration des data URL
function getParameter(parameterName) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(parameterName);
}

// Définition de l'ID du produit recherché par l'utilisateur
const cameraId = getParameter("produit");
console.log(cameraId);

const cameraUrl = stockCameras + "/" + cameraId;
console.log(cameraUrl);

// fonction async de récupération des data
const loadData = async () => {
  try {
    const res = await fetch(cameraUrl);
    const data = await res.json();

    console.log(data);

    //définition du prix de l'appareil photo
    let productPrice = data.price / 100 + " " + "euros";
    console.log(productPrice);

    //Injection des données de la promesse
    document.getElementById("price").textContent = `${productPrice}`;
    document.getElementById(
      "descriptionArea"
    ).textContent = `${data.description}`;
    document.getElementById("productName").textContent = `${data.name}`;
    document.getElementById("productImage").src = `${data.imageUrl}`;

    //définition des options dynamiques de focales pour les appareils photos
    let selectLens = document.getElementById("lensesForm");
    let options = data.lenses;
    console.log(options);

    //Boucle for au sein de l'Array des Lenses
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      console.log(opt);
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      selectLens.appendChild(el);
    }
  } catch (err) {
    console.error(err);
  }
};

function Purchase() {

  document.getElementById("purchaseBtn").addEventListener("click", function () {

    var cameraLens = document.getElementById("lensesForm").value;
    var model = document.getElementById("productName").innerText;

    //récupération du prix et transformation en chiffres
    var price = document.getElementById("price").innerText;
    var price = parseInt(price, 10);
    const product = new Product(model, cameraLens, price);
    console.log(product);

    localStorage.setItem("cart", JSON.stringify(product));



    
    //button styling
    const button = document.getElementById("purchaseBtn");
    button.textContent = "Et hop!";
    button.disabled = true;
    setTimeout(() => {
      button.textContent = "Commander";
      button.disabled = false;
    }, 1500); 
    

  });
}

loadData();
