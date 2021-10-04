//décompte des items dans le localStorage

//Une fois le dom chargé alors, éxécution du décompte panier
document.addEventListener("DOMContentLoaded", cartToken);

//Fonction de décompte des items dans le localStorage
function cartToken() {
  var cartCounter = 0;
  cartCounter = localStorage.length;
  
  if (cartCounter === 0) {
    document.getElementById(
      "tokenCount"
    ).textContent = "Panier vide";
  } else {
    document.getElementById(
      "tokenCount"
    ).textContent = `Panier (${cartCounter})`;
  }
}


