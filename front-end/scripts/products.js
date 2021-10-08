/*jshint esversion: 9 */
// lien de l'api pour les caméras
const stockCameras = "http://localhost:3000/api/cameras";

// tags de l'api pour les caméras
// lenses, _id, name, price, description, imageUrl
// Constante intersectionnelles : cartItems, cart, queryID on links

// Fonction mathématique pour les avis
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
let star = '<i class="bi bi-star-fill text-dark mx-1"></i>';

//Promesse d'obtention des data depuis l'api
fetch(stockCameras).then((response) =>
  response.json().then((data) => {
    console.log(data);
    
    // Définition du container des "cards" des produits
    const container = document.getElementById("productsStack");
    data.forEach((item) => {

    //Construction de la carte
      const content = `
      <div class="col-md-6 col-lg-3">
      <div class="card bg-light">
      <div class="card-body text-center">
      <img
      src="${item.imageUrl}"
      class="rounded mb-3 img-fluid"
      alt=""
      />
      <h3 class="card-title mb-3">${item.name}</h3>
      <p class="card-text">${item.description}</p>
      ${star.repeat(getRandomInt(1,6))}
      <div>
      <a href="cameras.html?produit=${item._id}" class="btn-light mt-3">Voir le produit</a>
      
      </div>
      </div>
      </div>
      </div>
            `;

    //injection dans le html de celle ci au sein de la section produit
      container.innerHTML += content;

    });
  })
  .catch(err => alert(err))
);

