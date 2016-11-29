/* globals objJson */

function getAdsByCategory (id) {
  let adsArray = []

  objJson.forEach((el) => {
    if (el.category === id) adsArray.push(el)
  })

  let item = document.getElementById('adsListing')
  item.innerHTML = ''

  adsArray.forEach((el) => {
    if (el.adName.length > 77) el.adName = el.adName.slice(0, 75)

    if (el.newFilePath) {
      item.innerHTML += '<li>'
      item.innerHTML += `  <a href="${el.url}"><span class="adNameThumb">${el.adName}</span></a>`
      item.innerHTML += `  <img src="uploads/thumb_${el.newFilePath}" class="hiddenImage"/>`
      item.innerHTML += `  <span class="adPrice">${el.price}</span><span class="adDate">${el.date}</span>`
      item.innerHTML += '</li>'
    } else {
      item.innerHTML += '<li>'
      item.innerHTML += `  <a href="${el.url}"><span class="adName">${el.adName}</span></a>`
      item.innerHTML += `  <span class="adPrice">${el.price}</span>`
      item.innerHTML += `  <span class="adDate">${el.date}</span>`
      item.innerHTML += '</li>'
    }
  })
}
