var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Musicador' });
});

// new session route and render
router.get('/new-session', function(req, res) {
	res.render('new-session', { 
		title: "New Jam Session",
    sessionname: req.cookies.sessionName,
	sessinstrument: req.cookies.instrument});
});

// post request to create new session from form
router.post('/create-session', function(req, res) {
	var db = req.db;
	var instrument = req.body.instrument;
	var username = req.body.username;
	var jamname = req.body.jamname;
	var session = db.get('sessions');

	session.insert({
		"username" : username,
		"jam" : jamname,
		"instrument" : instrument
	}, function(err, doc) {
		if (err) {
			res.send("Error cannot add data to db.");
		} else {
			res.cookie('session', doc._id);
			res.cookie('instrument', instrument);
      		res.cookie('sessionName', jamname);
			res.redirect("new-session");
		}
	})
})

// view that shows list of sessions
router.get('/sessionlist', function(req, res) {
    var db = req.db;
    var collection = db.get('sessions');
    collection.find({},{},function(e,docs){
        res.render('sessionlist', {
            sessionlist : docs
        });
    });
});

module.exports = router;