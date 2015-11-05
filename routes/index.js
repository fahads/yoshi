var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Musicador' });
});

router.get('/new-session', function(req, res) {
	res.render('new-session', { title: "New Jam Session "});
});

router.post('/create-session', function(req, res) {
	var db = req.db;
	var instrument = req.body.instrument;
	var username = req.body.username;
	var jamName = req.body.jam-name;
	var session = db.get('sessions');

	session.insert({
		"username" : username,
		"jam" : jamName,
		"instrument" : instrument
	}, function(err, doc) {
		if (err) {
			res.send("Error cannot add data to db.");
		} else {
			res.redirect("new-session");
		}
	})
})

module.exports = router;
