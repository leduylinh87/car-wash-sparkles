const http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var myip = require('quick-local-ip');
var Datastore = require('nedb')
var ip = require("ip");

userDB = new Datastore('CarWash-UserDB');
userDB.loadDatabase(function (err) {
	if(err != null){
		console.log(err);
	}
});

orderDB = new Datastore('CarWash-DB');
orderDB.loadDatabase(function (err) {
	if(err != null){
		console.log(err);
	}
});

packageDB = new Datastore('CarWash-PackageDB');
packageDB.loadDatabase(function (err) {
	if(err != null){
		console.log(err);
	}
});

addonDB = new Datastore({ filename: 'CarWash-AddonDB' });
addonDB.loadDatabase(function (err) {    // Callback is optional
	if(err != null){
		console.log(err);
	}
});

const hostname = '0.0.0.0';
const port =  process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/',function(req,res)
{
	res.send('Sparkles Car Wash!');
});

app.post('/Login', function(req,res)
{	
	console.log(req.body);
	userDB.find(req.body, function (err, docs) {
		if(docs.length > 0){
			var response = {
				"status":true,
				"data":docs[0]
			};
			res.send(response);
		}
		else {
			var response = {
				"status":false
			};
			res.send(response);
		}
		console.log(docs);
	});
});

app.post('/createOrder', function(req,res)
{
	orderDB.insert(req.body, function (err, newDocs) {
		if(err == null){
			console.log(newDocs);
			
			var response = {
				"status":true,
				"data":newDocs
			};
			res.send(response);
		}
		else {
			console.log(err);
			
			var response = {
				"status":false
			};
			res.send(response);
		}
	});

});

app.post('/createPackage', function(req,res)
{
	packageDB.insert(req.body, function (err, newDocs) {
		if(err == null){
			console.log(newDocs);
			
			var response = {
				"status":true,
				"data":newDocs
			};
			res.send(response);
		}
		else {
			console.log(err);
			
			var response = {
				"status":false
			};
			res.send(response);
		}
	});

});

app.post('/createAddon', function(req,res)
{
	addonDB.insert(req.body, function (err, newDocs) {
		if(err == null){
			console.log(newDocs);
			
			var response = {
				"status":true,
				"data":newDocs
			};
			res.send(response);
		}
		else {
			console.log(err);
			
			var response = {
				"status":false
			};
			res.send(response);
		}
	});

});

app.post('/getOrderList', function(req,res)
{	
	orderDB.find({}, function (err, newDocs) {
		if(err == null){
			console.log(newDocs);
			
			var response = {
				"status":true,
				"data":newDocs
			};
			res.send(response);
		}
		else {
			console.log(err);
			
			var response = {
				"status":false
			};
			res.send(response);
		}
	});
});

app.post('/getPackages', function(req,res)
{
	packageDB.find({}, function (err, newDocs) {
		if(err == null){
			console.log(newDocs);
			
			var response = {
				"status":true,
				"data":newDocs
			};
			res.send(response);
		}
		else {
			console.log(err);
			
			var response = {
				"status":false
			};
			res.send(response);
		}
	});

});

app.post('/getAddon', function(req,res)
{
	addonDB.find({}, function (err, newDocs) {
		if(err == null){
			console.log(newDocs);
			
			var response = {
				"status":true,
				"data":newDocs
			};
			res.send(response);
		}
		else {
			console.log(err);
			
			var response = {
				"status":false
			};
			res.send(response);
		}
	});

});

var server = app.listen(port, function() {
	var localIp = myip.getLocalIP4();
	var Ip = ip.address();
	console.log(`Start server on ${Ip}`);
});