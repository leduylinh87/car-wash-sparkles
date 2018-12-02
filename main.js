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

const hostname = '0.0.0.0';
const port =  process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/',function(req,res)
{
	res.send('Hello World!');
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

var server = app.listen(port, function() {
	var localIp = myip.getLocalIP4();
	var Ip = ip.address();
	console.log(`Start server on ${Ip}`);
});