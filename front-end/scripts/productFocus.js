//Event listeners
window.addEventListener("DOMContentLoaded", () => {
  Purchase();
  loadData();
  toast();
  cartToken();
});

// Variables et constantes
const stockCameras = "http://localhost:3000/api/cameras";

//Classe de stockage du produit
class Product {
  constructor(productIndex, idModel, model, lens, price, imageUrl, quantity) {
    this.productIndex = productIndex;
    this.idModel = idModel;
    this.model = model;
    this.lens = lens;
    this.price = price;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
  }
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
    /*
    1. First, it creates a new select element and sets its name attribute to “lens”.
    2. Then, it creates a new option element for each of the options in the array.
    3. Finally, it appends each option element to the select element.
    */
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
    var priceLit = document.getElementById("price").innerText;

    var price = parseInt(priceLit, 10);
    //récupération de la source de l'image
    var imageUrl = document.getElementById("productImage").getAttribute("src");
    var quantity = 1;

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
    //création d'un index

    let productIndex = model + "__" + cameraLens;
    console.log(productIndex);

    //Création de l'objet à exporter dans le locale storage
    const product = new Product(
      productIndex,
      cameraId,
      model,
      cameraLens,
      price,
      imageUrl,
      quantity
    );
    console.log(product);

    //Test présence de l'objet dans le locale storage
    /*
    1. First, it checks if the product is already in the cart. If it is, it adds the quantity to the existing quantity.
    2. If the product is not in the cart, it creates a new object and adds the product to the cart.
    */
    var cartItem = JSON.parse(localStorage.getItem(`"${productIndex}"`));
    if (cartItem !== null) {
      console.log("produit dans le panier");
      console.log(cartItem.quantity + " = donnée de l'objet parse from json");
      cartItem.quantity += quantity;
      localStorage.setItem(`"${productIndex}"`, JSON.stringify(cartItem));
    } else {
      localStorage.setItem(`"${productIndex}"`, JSON.stringify(product));
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
