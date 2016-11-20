$(document).ready(function() {
	getAllAdsLength();
	calculateAdsCount('apartaments', 'Apartamente');
	calculateAdsCount('houses', 'Case şi vile');
	calculateAdsCount('lands', 'Terenuri');
	calculateAdsCount('comercial', 'Imobil comercial');
	calculateAdsCount('garages', 'Garajuri');
	calculateAdsCount('cars', 'Automobile');
	calculateAdsCount('buses', 'Microbuze');
	calculateAdsCount('phones', 'Telefoane');
	calculateAdsCount('notebooks', 'Notebookuri');
	calculateAdsCount('desktop', 'Compiutere');
	calculateAdsCount('services', 'Servicii');
	calculateAdsCount('repairs', 'Construcţii şi reparaţii')
	calculateAdsCount('other', 'Altele');
});

function getAllAdsLength() {
	$("#allAds").html("Pagina principală <sup>" + objJson.length + "</sup>");
}

var calculateAdsCount = function(thisCategory, text) {
	var tempArray = [];

	for (var i = 0; i < objJson.length; i++) {
		if (objJson[i].category == thisCategory) {
			tempArray.push(objJson[i]);
		}
	}

	var id = '#' + thisCategory;
	$(id).html(text + '<sup>' + tempArray.length + '</sup>');
}