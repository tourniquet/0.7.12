const http = require('http')
const fs = require('fs')
const formidable = require('formidable')
const ImageService = require('./public/js/imageProcessing.js')
const path = require('path')
const express = require('express')
const app = express()

const moment = require('moment')
moment.locale('ro')

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

    const date = moment().format('D MMMM YYYY')

    // process file path
    let index = files.file.path.indexOf('public')
    // if user not uploading any files, newFilePath is equal with empty string
    let tempFileName = files.file.size ? files.file.path.substr(index) : ''
    let newFileName = tempFileName.replace('upload_', '')

    var newAd = {
      url: url,
      adName: adName,
      adMessage: adMessage,
      phone: phone,
      price: price,
      date: date,
      category: category,
      newFileName: newFileName
    }

    fs.readFile('public/links.txt', { encoding: 'utf8' }, (err, data) => {
      if (err) throw err

      var adsToArray = JSON.parse(data)
      adsToArray.unshift(newAd)

      fs.writeFile('public/links.txt', JSON.stringify(adsToArray, null, '\t'), (err) => {
        if (err) throw err
      })
    })

    ImageService
      .saveImages(tempFileName, newFileName)
      // .then(thumbnailAll(images, data.id))
      .then(() => {
        console.log('Success!')
      })
      .catch((err) => {
        console.log(err)
      })

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
