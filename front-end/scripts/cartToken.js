/*jshint esversion: 9 */
document.addEventListener("DOMContentLoaded", cartToken);
/*
1. The function cartToken() is called when the page loads.
2. The function checks the length of the localStorage object.
3. If the length is 0, the textContent of the element with the id of tokenCount is set to "Panier vide".
4. If the length is not 0, the textContent of the element with the id of tokenCount is set to "Panier (n)".
*/
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
