const http = require('http')
const fs = require('fs')
const formidable = require('formidable')
const gm = require('gm')
const path = require('path')
const express = require('express')
const app = express()

// path to views folder
const htmlPath = path.join(__dirname + '/views/')

app.use(express.static('./public'))
app.locals.pretty = true

app.get('/', (req, res) => {
  res.sendFile(htmlPath + 'index.html')
})

app.get('/newad', (req, res) => {
  res.sendFile(htmlPath + 'newad.html')
})

app.post('/adposted', (req, res) => {
  let form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname + '/public/uploads')
  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    if (err) console.log(err)

    const category = fields.category
    const adName = fields.adName
    const adMessage = fields.adMessage
    const phone = fields.phone
    const rawPrice = fields.price
    const rawCurrency = fields.currency

    // concatenate price and currency in one variable, e. g. 4500 $
    const price = `${rawPrice} ${rawCurrency}`
    const url = new Date().getTime().toString().slice(5)

    // create date, ex.: 30 oct. 2014
    const monthNames = [ 'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie' ]
    // var date = new Date().getDate() + " " + monthNames[new Date().getMonth()] + " " + new Date().getFullYear()
    const date = `${new Date().getDate()} ${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`

    // process file path
    let oldFilePath = files.file.path
    let index = oldFilePath.lastIndexOf('/') + 1
    let tempFilePath = oldFilePath.substr(index)

    // if user not uploading any files, newFilePath is equal with empty string
    var newFilePath = (files.file.size) ? tempFilePath : ''

    var newAd = {
      url: url,
      adName: adName,
      adMessage: adMessage,
      phone: phone,
      price: price,
      date: date,
      category: category,
      newFilePath: newFilePath
    }

    fs.readFile('public/links.txt', { encoding: 'utf8' }, (err, data) => {
      if (err) throw err

      var adsToArray = JSON.parse(data)
      adsToArray.unshift(newAd)

      fs.writeFile('public/links.txt', JSON.stringify(adsToArray, null, '\t'), (err) => {
        if (err) throw err
      })
    })

    // generate thumbnails and resize images
    var image = path.join('public/uploads/', newFilePath)

    var resizeImage = function (image) {
      gm(image)
        .size((err, size) => {
          if (!err) {
            if (size.width > size.height && size.width > 1024)
              gm(image)
              .resize(1024, null)
              .write('public/uploads/' + newFilePath, (err) => {
                if (err) throw err
              })
            else if (size.width < size.height && size.height > 800)
              gm(image)
              .resize(null, 800)
              .write('public/uploads' + newFilePath, (err) => {
                if (err) throw err
              })
          }
        })
    }

    resizeImage(image)

    var createThumbnail = function (image) {
      gm(image)
        .size((err, size) => {
          if (!err) {
            if (size.width > size.height)
              gm(image).thumb(160, 120, 'public/uploads/' + 'thumb_' + newFilePath, 100, (err) => {
                if (err) throw err
              })
            else if (size.width < size.height)
              gm(image).thumb(120, 160, 'public/uploads/' + 'thumb_' + newFilePath, 100, (err) => {
                if (err) throw err
              })
          }
        })
    }

    createThumbnail(image)

    res.sendFile(htmlPath + 'adposted.html')
  })
})

app.get(/\d{8}$/, (req, res) => {
  res.sendFile(htmlPath + 'showad.html')
})

app.use((req, res) => {
  res.status(404)
  res.sendFile(htmlPath + '404.html')
})

http.createServer(app).listen(3000, () => {
  console.log('App started')
})
