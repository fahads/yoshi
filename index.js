var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1337));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//app.get('/', function(request, response) {
//response.send("Welcome to the Music MMO! (C) Northwestern University. Fahad, Mark, and Scott.");
//});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});