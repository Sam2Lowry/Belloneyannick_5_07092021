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
var dataCart;
var Cart = [];
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

function getData() {
  for (let i = 0; i < localStorage.length; i++) {
    let storedCart = localStorage.key(i);
    // console.log(`Item at ${i}: ${storedCart}`);
    // console.log(JSON.parse(localStorage.getItem(storedCart)));
    dataCart = JSON.parse(localStorage.getItem(storedCart));
    console.log(dataCart);
    console.log(dataCart.model);
    console.log(dataCart.price);
   
  }
}



function showCart() {
}
function incrementCart() {}
function decrementCart() {}
function clearCart() {}
function errorMessage() {
  console.error("Error");
}
 
getData();