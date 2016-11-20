function getAdsByCategory(id) {
    var adsArray = [];

    for (var i = 0; i < objJson.length; i++) {
        if (objJson[i].category == id) {
            adsArray.push(objJson[i]);
        }
    }

    document.getElementById("adsListing").innerHTML = "";
    
    for (var j = 0; j < adsArray.length; j++) {
        if (adsArray[j].adName.length > 77) {
            adsArray[j].adName = adsArray[j].adName.slice(0, 75);
        }
        
        if (adsArray[j].newFilePath) {
             document.getElementById("adsListing").innerHTML += '<li><a href="' + adsArray[j].url + '"><span class="localAdNameThumb">' + adsArray[j].adName + '</span></a><img src="uploads/thumb_' + adsArray[j].newFilePath + '" class="hiddenImage"/><span class="adPrice">' + adsArray[j].price + '</span><span class="adDate">' + adsArray[j].date + '</span></li>';
        } else {
            document.getElementById("adsListing").innerHTML += '<li><a href="' + adsArray[j].url + '"><span class="localAdName">' + adsArray[j].adName + '</span></a><span class="adPrice">' + adsArray[j].price + '</span><span class="adDate">' + adsArray[j].date + '</span></li>';
        }
    }
}