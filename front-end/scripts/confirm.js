var commandId = sessionStorage.getItem('purchaseId');
var commandPrice = sessionStorage.getItem('purchasePrice');
const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "symbol",
  });
document.addEventListener("DOMContentLoaded", commandThanks);
function commandThanks() {
    if (sessionStorage.getItem('purchaseId') !== null) {

        document.getElementById('commandId').textContent = `N° ${commandId}`;
        document.getElementById('commandPrice').textContent = `Prix total : ${formatter.format(commandPrice)}`;
    } else {
        document.getElementById('heroThanks').textContent = "Vous n'avez pas de commande validée en cours";
    }
}
