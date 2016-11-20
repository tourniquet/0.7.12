/* globals objJson */

window.onload = showSelectedAd

function showSelectedAd () {
  var getUrl = window.location.href

  for (var i = 0; i < objJson.length; i++) {
    if (getUrl.split('/')[3] === objJson[i].url) {
      document.getElementById('adName').innerHTML = objJson[i].adName
      document.getElementById('date').innerHTML = objJson[i].date
      document.getElementById('ad-Message').innerHTML = objJson[i].adMessage
      document.getElementById('newFilePath').innerHTML = (objJson[i].newFilePath) ? '<a href="uploads/' + objJson[i].newFilePath + '" data-lightbox="' + objJson[i].adName + '"><img src="uploads/thumb_' + objJson[i].newFilePath + '" /></a>' : ''
      document.getElementById('price').innerHTML = '<span style="color:gray">preţ: </span>' + objJson[i].price
      document.getElementById('phone').innerHTML = '<span style="color:gray">contacte: </span>' + objJson[i].phone
    }
  }
}
