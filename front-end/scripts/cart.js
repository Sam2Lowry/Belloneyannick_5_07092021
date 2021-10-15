/*jshint esversion: 9 */

//Une fois le dom chargé alors, éxécution du décompte panier

document.addEventListener("DOMContentLoaded", (event) => {
  cartToken();
  getData();

  //event listeners buttons
  // --> bouton rajouter

  document.addEventListener("click", (e) => {
    var element = e.target;
    if (!e.target.matches(".btn-qty, .btn-qty *")) {
      return;
    }
    clickPlusId = element.closest(".glubiTest").id;
    console.log(clickPlusId);
    saveData();
  });

  // --> bouton supprimer

  document.addEventListener("click", (e) => {
    var element = e.target;
    if (!e.target.matches(".btn-supp, .btn-supp *")) {
      return;
    }
    clickMinusId = element.closest(".glubiTest").id;
    console.log(clickMinusId);
    deleteData();
  });
});

// Chargement en mémoire du locale Storage
const Cart = [];
var clickMinusId;
var clickPlusId;
//constante de formatage des valeures numériques de monnaies
const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  currencyDisplay: "symbol",
});

function deleteData() {
  var itemSupp = JSON.stringify(clickMinusId);
  console.log(itemSupp);
  document.getElementById(clickMinusId.toString()).remove();
  localStorage.removeItem(itemSupp);
  //index retrieving of the value
  let indexSupp = Cart.findIndex(
    (x) => x.productIndex === JSON.parse(itemSupp)
  );
  console.log(indexSupp);
  Cart.splice(indexSupp, 1);
  updateCartTotal();
  cartToken();
}

function saveData() {
  var itemSave = JSON.stringify(clickPlusId);
  var formQty = document.getElementById("form_Qty").value;
  console.log(itemSave);
  console.log(formQty);

  //Mise en place de l'index
  const index = Cart.findIndex((x) => x.productIndex === JSON.parse(itemSave));
  console.log(index);

  //mise à jour du localStorage en terme de quantité
  var cartSave = JSON.parse(localStorage.getItem(itemSave));
  console.log(cartSave);
  console.log(cartSave.quantity);
  cartSave.quantity += parseInt(formQty) - cartSave.quantity;
  console.log(cartSave.quantity);
  localStorage.setItem(`${itemSave}`, JSON.stringify(cartSave));
  Cart.splice(index, 1, cartSave);
  document.getElementById("showPriceItem").textContent = `${formatter.format(
    cartSave.price * cartSave.quantity
  )}`;
  updateCartTotal();
}

// double fonction d'appel de donnée de le localStorage et d'injection
function getData() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let dataList = JSON.parse(localStorage.getItem(key));
    console.log(dataList);
    Cart.push(dataList);
    console.log(Cart);
  }
  loadCart();
}

function loadCart() {
  const container = document.getElementById("cartList");
  // récupération de toutes les clefs LocalStorage du panier

  if (Cart !== undefined) {
    console.log(Cart);
    Cart.forEach((item) => {
      const content = `<div
      class="
                    d-flex
                    flex-row
                    justify-content-between
                    align-items-center
                    p-2
                    bg-white
                    mt-4
                    px-3
                    rounded
                    glubiTest
                  "
                  id="${item.model}__${item.lens}"
    >
      <div class="mr-1">
        <img
          class="rounded"
          alt="test"
          src="${item.imageUrl}"
          width="70"
        />
      </div>
      <div class="d-flex flex-column align-items-center product-details">
        <span class="font-weight-bold ">${item.model}</span>
        <div class="d-flex flex-row product-desc">
          <div class="focale mr-1">
            <span class="text-grey">focale:</span>
            <span class="font-weight-bold">${item.lens}</span>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center qty">
      <div class="input-group w-50">
              <button class="input-group-text btn-qty" >
              <i class="bi bi-basket3-fill fa-lg"  ></i>
              </button>
              <input type="number" id="form_Qty" class="form-control" placeholder="0" value="${
                item.quantity
              }" min="1" max="100" aria-label="quantité">
            </div>
      </div>
      <div class="d-flex flex-row">
        <h5 class="text-grey mx-auto price-tag" id="showPriceItem">${formatter.format(
          item.price * item.quantity
        )}</h5>
      </div>
      <div class="d-flex align-items-center  btn-supp" >
        <i class="fa fa-trash mb-1 text-danger " ></i>
      </div>
    </div>`;

      //injection dans le html de celle ci au sein de la section produit
      container.innerHTML += content;
    });
  }
  updateCartTotal();
}

function updateCartTotal() {
  let cartPrices = [];
  Cart.forEach((item) => {
    cartPrices.push(item.quantity * item.price);
  });
  const reducer = (acc, cur) => acc + cur;
  const totalPrice = cartPrices.reduce(reducer, 0);
  console.log(totalPrice);

  //Prix hors boucle
  console.log(totalPrice);
  document.getElementById(
    "totalPrice"
  ).textContent = `Prix total : ${formatter.format(totalPrice)}`;
}

//Fonction de décompte des items dans le localStorage
function cartToken() {
  var cartCounter = 0;
  cartCounter = localStorage.length;
  console.log(cartCounter);
  if (cartCounter === 0) {
    document.getElementById("tokenCount").textContent = "Panier vide";
  } else {
    document.getElementById(
      "tokenCount"
    ).textContent = `Panier (${cartCounter})`;
  }
}
