var express = require('express');
var router = express.Router();

/* GET home page and show list of sessions */
router.get('/', function(req, res, next) {
  var db = req.db;
    var collection = db.get('sessions');
    collection.find({},{},function(e,docs){
        res.render('index', {
            title: 'Musicador',
            sessionList : docs
        });
    });
});

router.post('/join-session', function(req, res) {
  var db = req.db, 
    sessionId = req.body.joinSessionId, sessionpw = req.body.existingJamPW, stageName = req.body.username, instrument = req.body.instrument;
  var activeSessions = db.get('activesessions');
  var sessions = db.get('sessions');
  function testPass(doc) {
    if (doc['password'] === sessionpw) {
      //add user and instrument to active session
      var queryString = '\"' + sessionId + '\"';
      activeSessions.update({sessionid: queryString}, {$push: {users: [stageName, instrument]}}, function(err) {
        if (err) {console.log("The error is: " + err);}
      });
      res.cookie('session', sessionId);
      res.cookie('instrument', instrument);
      res.cookie('sessionName', doc['jam']);
      res.redirect("new-session");
    } else {
      console.log("invalid password");
    }
  }
  sessions.findById(sessionId, function (err, docs) {
    testPass(docs);
  });
});

// new session route and render
router.get('/new-session', function(req, res) {
  var db = req.db
  var sessionId = req.cookies.session;
  var queryString = '\"' + sessionId + '\"';
  var activeSessions = db.get('activesessions');

  function renderPage(userdoc) {
    console.log(userdoc);
    res.render('new-session', {
      title: "Jam Session",
      sessionname: req.cookies.sessionName,
      sessinstrument: req.cookies.instrument,
      sessusers: userdoc
    });
  }  
  activeSessions.find({sessionid: queryString}, function (err, docs) {
    renderPage(docs['0']['users']);
  });
});

// post request to create new session from form
router.post('/create-session', function(req, res) {
	var db = req.db;
	var instrument = req.body.instrument;
	var username = req.body.username;
	var jamname = req.body.jamname;
  var password = req.body.jampassword;
	var session = db.get('sessions');
  var activeSessions = db.get('activesessions');

  function createActiveSession(id){
    activeSessions.insert({
      "sessionid" : id,
      "users" : [[username, instrument]]
    });
  }

  var data = {
    "username" : username,
    "jam" : jamname,
    "instrument" : instrument,
    "password" : password
  };

	session.insert(data, function(err, doc) {
		if (err) {
			res.send("Error cannot add data to db.");
		} else {
      console.log(JSON.stringify(doc._id));
      createActiveSession(JSON.stringify(doc._id));
			res.cookie('session', doc._id);
			res.cookie('instrument', instrument);
      res.cookie('sessionName', jamname);
			res.redirect("new-session");
		}
	});
});

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