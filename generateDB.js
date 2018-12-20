
var Datastore = require('nedb')
	, db = new Datastore({ filename: 'CarWash-DB' });
  
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
  
  console.log(err);
});

userDB = new Datastore({ filename: 'CarWash-UserDB' });
userDB.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
  
  console.log(err);
});

packageDB = new Datastore({ filename: 'CarWash-PackageDB' });
packageDB.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
  
  console.log(err);
});

addonDB = new Datastore({ filename: 'CarWash-AddonDB' });
addonDB.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
  
  console.log(err);
});

var user = { "username": "admin",
			"password": "123456",
			"role":"admin"
           };

userDB.insert(user, function (err, newDoc) {   // Callback is optional
	console.log(err);
});
