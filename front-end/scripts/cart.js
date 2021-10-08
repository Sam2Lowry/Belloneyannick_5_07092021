/*jshint esversion: 9 */
// const items = { ...localStorage };
// console.log(items);

// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// }

// function getCartItems() {
//   let cartItems = { ...localStorage };

// Constructor = idModel, model, lens, price, imageUrl, quantity


//Une fois le dom chargé alors, éxécution du décompte panier
document.addEventListener("DOMContentLoaded", cartToken);
document.addEventListener("DOMContentLoaded", showCart);

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
dataCart = [];
function loadCart() {
  // récupération de toutes les clefs LocalStorage du panier
  let num = localStorage.length;
  if (num) {
    for (let i = 0; i < num; i++) {
      let key = localStorage.key(i);
      console.log(key);
      dataCart.push(key);
      console.log(dataCart);
    }
  }
}


function showCart() {
  loadCart();
  itemList = localStorage.getItem(loadCart());
  const container = document.getElementById("cartList");
  dataCart.forEach((item) => {
    //Construction de l'item
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
  >
    <div class="mr-1">
      <img
        class="rounded"
        alt="test"
        src="https://source.unsplash.com/600x600/?camera"
        width="70"
      />
    </div>
    <div class="d-flex flex-column align-items-center product-details">
      <span class="font-weight-bold">Appareil photo numérique</span>
      <div class="d-flex flex-row product-desc">
        <div class="focale mr-1">
          <span class="text-grey">focale:</span>
          <span class="font-weight-bold">&nbsp;50mm</span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row align-items-center qty">
      <i class="fa fa-minus text-danger"></i>
      <h5 class="text-grey mt-1 mr-1 ml-1 mx-1">2</h5>
      <i class="fa fa-plus text-success"></i>
    </div>
    <div>
      <h5 class="text-grey">€20.00</h5>
    </div>
    <div class="d-flex align-items-center">
      <i class="fa fa-trash mb-1 text-danger"></i>
    </div>
  </div>`;

    //injection dans le html de celle ci au sein de la section produit
    container.innerHTML += content;
  });
}





function incrementCart() {}
function decrementCart() {}
function clearCart() {}
function errorMessage() {
  console.error("Error");
}


