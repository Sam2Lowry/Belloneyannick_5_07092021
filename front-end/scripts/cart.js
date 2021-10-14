/*jshint esversion: 9 */

//Une fois le dom chargé alors, éxécution du décompte panier

document.addEventListener("DOMContentLoaded", (event) => {
  cartToken();
  getData();

  //event listerners buttons

  // --> bouton rajouter
  document.addEventListener("click", (e) => {
    if (!e.target.matches(".btn-qty, .btn-qty *")) {
      
      return;
    }
    console.log(e.target.id);
    console.log("It works too!");
  });

  // --> bouton supprimer
  document.addEventListener("click", (e) => {
    if (!e.target.matches(".btn-supp, .btn-supp *")) {
      return;
    }
    console.log(e.target.id);
    console.log("it works");
  });


});


// Chargement en mémoire du locale Storage
const Cart = [];
//constante de formatage des valeures numériques de monnaies
const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  currencyDisplay: "symbol",
});

/*
function deleteData() {
  var itemSupp = JSON.stringify(
    document.getElementById("anchorSupp").parentElement.id
  );
  console.log(itemSupp);
  localStorage.removeItem(itemSupp);
  document
    .getElementById(document.getElementById("anchorSupp").parentElement.id)
    .remove();

  //index retrieving of the value
  let indexSupp = Cart.findIndex((x) => x.productIndex === JSON.parse(itemSupp));
  console.log(indexSupp);
  Cart.splice(indexSupp, 1);
  updateCartTotal();
}

function saveData() {
  var itemSave = JSON.stringify(
    document.getElementById("anchorSupp").parentElement.id
  );
  var formQty = document.getElementById("form_Qty").value;
  console.log(itemSave);
  console.log(formQty);
  const index = Cart.findIndex((x) => x.productIndex === JSON.parse(itemSave));
  console.log(index);

//mise à jour du localStorage en terme de quantité
var cartSave = JSON.parse(localStorage.getItem(itemSave));
console.log(cartSave);
console.log(cartSave.quantity);
cartSave.quantity += (parseInt(formQty) - cartSave.quantity);
console.log(cartSave.quantity);
localStorage.setItem(`${itemSave}`, JSON.stringify(cartSave));
//mise à jour du Cart en terme de quantité
let indexSave = Cart.findIndex((x) => x.productIndex === JSON.parse(itemSave));
console.log(indexSave);


}
*/

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
              <button class="input-group-text btn-qty" id="${
                item.model
              }__${item.lens}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="${item.model}__${item.lens}" class="bi bi-basket2-fill" viewBox="0 0 16 16">
  <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z"></path>
</svg>
              </button>
              <input type="number" id="form_Qty" class="form-control" placeholder="0" value="${
                item.quantity
              }" min="1" max="100" aria-label="quantité">
            </div>
      </div>
      <div class="d-flex flex-row">
        <h5 class="text-grey mx-auto price-tag">${formatter.format(
          item.price * item.quantity
        )}</h5>
      </div>
      <div class="d-flex align-items-center  btn-supp" id="${item.model}__${item.lens}">
        <i class="fa fa-trash mb-1 text-danger " id="${item.model}__${item.lens}"></i>
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
