var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1337));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
<<<<<<< HEAD
    response.send("Welcome to the Music MMO! By: Fahad, Mark, and Scott.");
=======
    response.send("Welcome to the Music MMO! (C) Northwestern University. Fahad, Mark, and Scott.");
>>>>>>> 9025598bb5b799a3437e5a04cc6f0975c2414f41
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});