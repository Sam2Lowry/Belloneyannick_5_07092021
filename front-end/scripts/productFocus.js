
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

// Fonction de chargement des data de l'appareil photo
const loadData = async () => {
    try{
        const res = await fetch(cameraUrl)
        const data = await res.json();
        console.log(data);
    }catch(err){
        console.error(err);
    }
};
// execution de la fonction de chargement des data de l'appareil photo
loadData();
