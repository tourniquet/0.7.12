/* globals objJson */

function showSelectedAd () {
  let getUrl = window.location.href

  objJson.forEach((el) => {
    if (getUrl.split('/')[3] === el.url) {
      document.getElementById('adName').innerHTML = el.adName
      document.getElementById('date').innerHTML = el.date
      document.getElementById('ad-Message').innerHTML = el.adMessage
      document.getElementById('newFilePath').innerHTML = el.newFilePath ? `<a href="uploads/${el.newFilePath}" data-lightbox="${el.adName}"><img src="uploads/thumb_${el.newFilePath}"></a>` : ''
      document.getElementById('price').innerHTML = `<span style="color:gray">preţ: </span>${el.price}`
      document.getElementById('phone').innerHTML = `<span style="color:gray">contacte: </span>${el.phone}`
    }
  })
}

window.onload = showSelectedAd
