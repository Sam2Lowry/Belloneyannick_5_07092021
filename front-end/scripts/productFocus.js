// Variables et constantes
const stockCameras = "http://localhost:3000/api/cameras";

eventListeners();

//Classe de stockage du produit
class Product {
  constructor(idModel, model, lens, price, imageUrl) {
    this.idModel = idModel;
    this.model = model;
    this.lens = lens;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}

//Event listeners
function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    Purchase();
    loadData();
    toast();
    cartToken();
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

    //Injection des données de la promesse dans le cadre de produit de la page
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

//Fonction de décompte des items dans le localStorage
function cartToken() {
  var cartCounter = 0;
  cartCounter = localStorage.length;

  if (cartCounter === 0) {
    document.getElementById("tokenCount").textContent = "Panier vide";
  } else {
    document.getElementById(
      "tokenCount"
    ).textContent = `Panier (${cartCounter})`;
  }
}

function Purchase() {
  //Event listener du bouton "commander"
  document.getElementById("purchaseBtn").addEventListener("click", function () {
    //récupération du modèle et de la focale
    var model = document.getElementById("productName").innerText;
    var cameraLens = document.getElementById("lensesForm").value;

    //récupération du prix et transformation en chiffres
    var price = document.getElementById("price").innerText;
    var price = parseInt(price, 10);
    //récupération de la source de l'image
    var imageUrl = document.getElementById("productImage").getAttribute("src");

    //button var
    const button = document.getElementById("purchaseBtn");

    //button styling
    button.classList.remove("btn-warning");
    button.classList.add("btn-success");
    button.textContent = "Produit rajouté au panier";
    button.disabled = true;
    setTimeout(() => {
      button.classList.remove("btn-success");
      button.classList.add("btn-warning"); //
      button.textContent = "Commander";
      button.disabled = false;
    }, 1500);

    //Création de l'objet à exporter dans le locale storage
    const product = new Product(cameraId, model, cameraLens, price, imageUrl);
    console.log(product);

    //création d'un index
    let d = new Date();
    let productIndex = `prod${d.getTime()}`;
    console.log(productIndex);

    //Test présence de l'objet dans le locale storage
    if (localStorage.getItem(`"${productIndex}cart"`) !== null) {
      console.log("produit dans le panier");
    } else {
      localStorage.setItem(`"${productIndex}cart"`, JSON.stringify(product));
      console.log("produit rajouté dans le panier");
    }
    //mise à jour du token panier
    cartToken();
  });
}

//Toast de confirmation de commande
function toast() {
  var toastTrigger = document.getElementById("purchaseBtn");
  var toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    toastTrigger.addEventListener("click", function () {
      var toast = new bootstrap.Toast(toastLiveExample);
      let model = document.getElementById("productName").innerText;
      document.getElementById(
        "toastName"
      ).textContent = `${model} rajouté au panier`;
      toast.show();
    });
  }
}
