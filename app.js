var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var gm = require('gm');
var path = require('path');  
var express = require('express');
var app = express();

// path to views folder 
var htmlPath = path.join(__dirname + '/views/'); 


app.use(express.static('./public'));
app.locals.pretty = true;


app.get('/', function(req, res) {
	res.sendFile(htmlPath + 'index.html');
});


app.get('/newad', function(req, res) {
	res.sendFile(htmlPath + 'newad.html');
});

app.post('/adposted', function(req, res) {
	var form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname + "/public/uploads");
	form.keepExtensions = true;

	form.parse(req, function(err, fields, files) {
		var category = fields.category;
		var adName = fields.adName;
		var adMessage = fields.adMessage;
		var phone = fields.phone;
		var rawPrice = fields.price;
		var rawCurrency = fields.currency;

		// concatenate price and currency in one variable, e. g. 4500 $
		var price = rawPrice + " " + rawCurrency;
		var url = new Date().getTime().toString().slice(5);
		
		// create date, ex.: 30 oct. 2014  
		var monthNames = [ 'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie' ];
		var date = new Date().getDate() + " " + monthNames[new Date().getMonth()] + " " + new Date().getFullYear();

		// process file path
		var oldFilePath = files.file.path;
		var index = oldFilePath.lastIndexOf('/') + 1;
		var tempFilePath = oldFilePath.substr(index);

		// if user not uploading any files, newFilePath is equal with empty string
		var newFilePath = (files.file.size) ? tempFilePath : '';


		var newAd = {
			url : url,
			adName : adName,
			adMessage : adMessage,
			phone : phone,
			price : price,
			date : date,
			category : category,
			newFilePath : newFilePath
		};


		fs.readFile('public/links.txt', {encoding: 'utf8'}, function(err, data) {
			if (err) throw err;

			var adsToArray = JSON.parse(data);
			adsToArray.unshift(newAd);

			fs.writeFile('public/links.txt', JSON.stringify(adsToArray, null, '\t'), function(err) {
				if (err) throw err;
			});
		});

		// generate thumbnails and resize images
		var image = path.join('public/uploads/', newFilePath);

		var resizeImage = function(image) {
			gm(image)
			.size(function(err, size) {
				if (!err) {
					if (size.width > size.height && size.width > 1024)
						gm(image)
						.resize(1024, null)
						.write('public/uploads/' + newFilePath, function(err) { if (err) throw err });
					else if (size.width < size.height && size.height > 800)
						gm(image)
						.resize(null, 800)
						.write('public/uploads' + newFilePath, function(err) { if (err) throw err });
				};
			});
		};

		resizeImage(image);

		var createThumbnail = function(image) {
			gm(image)
			.size(function(err, size) {
				if (!err) {
					if (size.width > size.height)
						gm(image).thumb(160, 120, 'public/uploads/' + 'thumb_' + newFilePath, 100, function (err) { if (err) throw err });
					else if (size.width < size.height)
						gm(image).thumb(120, 160, 'public/uploads/' + 'thumb_' + newFilePath, 100, function (err) { if (err) throw err });
				};
			});
		};

		createThumbnail(image);


		res.sendFile(htmlPath + 'adposted.html');
	});
});


app.get(/\d{8}$/, function(req, res) {
	res.sendFile(htmlPath + 'showad.html');
});


app.use(function(req, res) {
	res.status(404);
	res.sendFile(htmlPath + '404.html');
});


http.createServer(app).listen(3000, function() {
	console.log("App started");
});