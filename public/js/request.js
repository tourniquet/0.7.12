/* globals XMLHttpRequest */

let request = new XMLHttpRequest()
request.open('GET', 'links.txt', false)
request.send()

let getData = request.responseText
let objJson = JSON.parse(getData)
