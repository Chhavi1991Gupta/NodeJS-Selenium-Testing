var express = require('express');
var app = express();
var path    = require("path");
var bodyParser  = require("body-parser");
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/my_database_name';

app.use(express.static(__dirname + '/images'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/rayban.html'));
});

app.post('/userdataform', 	
	function (req, res) {
		console.log(req.body);

	// Use connect method to connect to the Server
		MongoClient.connect(url, function (err, db) {
  			if (err) {
    			console.log('Unable to connect to the mongoDB server. Error:', err);
  			} 
  			else {
    //HURRAY!! We are connected. :)
    			console.log('Connection established to', url);

    // do some work here with the database.
    			var collection = db.collection('users')
    			collection.insert(req.body, 
    				function (err, result) {
      					if (err) {
        					console.log(err);
      					} else {
        					console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      					}
      					db.close();
      					res.sendFile(path.join(__dirname+'/saved.html'));
      				});
    //Close connection
    			
  			}
		});

	
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


