
// Fonction d'exploration des data URL
function getParameter (parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
} 

// Définition de l'ID du produit recherché par l'utilisateur
let cameraId = getParameter('produit');
console.log(cameraId);

const cameraUrl = stockCameras + "/" + cameraId;
console.log(cameraUrl);

// fonction async de récupération des data
const loadData = async () => {
    try{
        const res = await fetch(cameraUrl)
        const data = await res.json();
        console.log(data);
      
        //définition du prix de l'appareil photo
        let productPrice = data.price / 100 + " "+ "euros"
        console.log(productPrice);
        
        //Injection des données de la promesse        
        document.getElementById("price").textContent = `${productPrice}`;
        document.getElementById("descriptionArea").textContent = `${data.description}`;
        document.getElementById("productName").textContent = `${data.name}`;
        document.getElementById("productImage").src = `${data.imageUrl}`;

        let selectLens = document.getElementById("lensesForm");
      

    }catch(err){
        console.error(err);
    }
};

loadData();

