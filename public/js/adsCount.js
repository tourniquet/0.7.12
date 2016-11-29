/* globals objJson */

let categories = [
  { category: 'apartaments', text: 'Apartamente' },
  { category: 'houses', text: 'Case şi vile' },
  { category: 'lands', text: 'Terenuri' },
  { category: 'comercial', text: 'Imobil comercial' },
  { category: 'garages', text: 'Garajuri' },
  { category: 'cars', text: 'Automobile' },
  { category: 'buses', text: 'Microbuze' },
  { category: 'phones', text: 'Telefoane' },
  { category: 'notebooks', text: 'Notebookuri' },
  { category: 'desktop', text: 'Compiutere' },
  { category: 'services', text: 'Servicii' },
  { category: 'repairs', text: 'Construcţii şi reparaţii' },
  { category: 'other', text: 'Altele' }
]

function getAllAdsLength () {
  document.getElementById('allAds').innerHTML = `Pagina principală <sup>${objJson.length}</sup>`
}

const calculateAdsCount = function ({ category, text }) {
  let tempArray = []

  objJson.forEach((elem) => {
    if (elem.category === category) tempArray.push(elem)
  })

  document.getElementById(category).innerHTML = `${text} <sup>${tempArray.length}</sup>`
}

// on window load, call calculateAdsCount for every single category
window.addEventListener('load', () => {
  getAllAdsLength()

  categories.forEach((elem) => {
    calculateAdsCount(elem)
  })
}, false)
