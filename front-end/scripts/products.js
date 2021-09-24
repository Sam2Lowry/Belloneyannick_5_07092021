// lien de l'api pour les caméras
const stockCameras = "http://localhost:3000/api/cameras";

// tags de l'api pour les caméras
// lenses, _id, name, price, description, imageUrl
// Constante intersectionnelles : cartItems, cart, queryID on links

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
        class="rounded-circle mb-3 img-fluid"
        alt=""
      />
      <h3 class="card-title mb-3">${item.name}</h3>
      <p class="card-text">${item.description}</p>
      <a href="#"><i class="bi bi-star-fill text-dark mx-1"></i></a>
      <a href="#"><i class="bi bi-star-fill text-dark mx-1"></i></a>
      <a href="#"><i class="bi bi-star-fill text-dark mx-1"></i></a>
      <a href="#"><i class="bi bi-star-fill text-dark mx-1"></i></a>
      <a href="#"><i class="bi bi-star-half text-dark mx-1"></i></a>
      <div>
        <button class="btn-dark mt-3">Voir le produit</button>
        </div>
        </div>
        </div>
        </div>
            `;

      container.innerHTML += content;
    });
  })
);
