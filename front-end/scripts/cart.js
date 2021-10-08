/*jshint esversion: 9 */
// const items = { ...localStorage };
// console.log(items);

// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// }

// function getCartItems() {
//   let cartItems = { ...localStorage };

//Une fois le dom chargé alors, éxécution du décompte panier
document.addEventListener("DOMContentLoaded", cartToken);

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


function loadCart() {
  // récupération de toutes les clefs LocalStorage du panier
  let num = localStorage.length;
  if (num) {
    dataCart = [];
    for (let i = 0; i < num; i++) {
      let key = localStorage.key(i);
      console.log(key);
      dataCart.push(key);
      console.log(dataCart);
    }
  }
}
loadCart();

function showCart() {
}
function incrementCart() {}
function decrementCart() {}
function clearCart() {}
function errorMessage() {
  console.error("Error");
}
 


