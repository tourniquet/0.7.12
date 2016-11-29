/* globals */

const sharp = require('sharp')
const fs = require('fs')

module.exports = {
  saveImages (images, newImage) {
    let promises = []
    // images.forEach((el) => {
    //   console.log(el)
    //   // let newFile = `${sails.config.appPath}/uploads/${newImage}_${index}.jpg`
    //   // `${sails.config.appPath}/uploads/${newImage}_${index}.jpg`
    //   // let newFile = path.join(__dirname + '/public/uploads')
    //   // promises.push(this.toJpeg(url, newFile))
    // })
    promises.push(this.toJpeg(images, newImage))
    return Promise.all(promises)
  },
  toJpeg (file, newFile) {
    return new Promise((resolve, reject) => {
      if (!file.length) return

      let image = sharp(file)
      image
        .metadata()
        .then((metadata) => {
          let args = metadata.width >= metadata.height ? [1024, null] : [null, 1024]
          image
            .resize.apply(image, args)
            .toFile(newFile, (err) => {
              if (err) return reject(err)
              // remove original file after resize
              fs.unlink(file)
              resolve(newFile)
            })
        })
    })
  },
  thumbnail (file, newFile) {
    return new Promise((resolve, reject) => {
      if (!file.length) {
        return
      }

      let image = sharp(Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64'))
      image
        .resize(200, 200)
        .toFile(newFile, (err) => {
          if (err) {
            return reject(err)
          }
          resolve(newFile)
        })
    })
  },
  thumbnailAll (images, newImage) {
    let promises = []
    images.forEach(({url}, index) => {
      let newFile = `${sails.config.appPath}/uploads/thumb_${newImage}_${index}.jpg`
      promises.push(this.thumbnail(url, newFile))
    })
    return Promise.all(promises)
  }
}
