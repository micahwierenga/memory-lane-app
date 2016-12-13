var passport = require('passport');
var bodyParser = require('body-parser');
var passport = require('passport');

var apiKeyGoogle = require('../config/env');


var db = require('../models');

function api_index(req, res) {
	res.json({
		message: "Welcome to Memory Lane!",
		documentation_url: "",
		base_url: "",
		endpoints: [
		{method: "GET", path: "/api", description: "Describes available endpoints"},
		{method: "GET", path: "/api/user", description: "Describes available endpoints"},
		{method: "POST", path: "/api/user", description: "Describes available endpoints"},
		{method: "GET", path: "/api/user/:id", description: "Describes available endpoints"},
		{method: "GET", path: "/api/user/:id", description: "Describes available endpoints"},
		{method: "Delete", path: "/api/user/:id", description: "Describes available endpoints"},
		{method: "GET", path: "/api/stories", description: "Describes available endpoints"},
		{method: "POST", path: "/api/stories", description: "Describes available endpoints"},
		{method: "GET", path: "/api/stories/:id", description: "Describes available endpoints"},
		{method: "GET", path: "/api/stories/:id", description: "Describes available endpoints"},
		{method: "Delete", path: "/api/stories/:id", description: "Describes available endpoints"}
		]
	})
}

function getSignup(req, res) {
	res.render('signup.ejs', { message: req.flash('signupMessage') });
};

function postSignup(req, res) {
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});
	return signupStrategy(req, res);
};

function getLogin(req, res) {
	res.render('login.ejs', { message: req.flash('loginMessage') });
};

function postLogin(req, res) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});
	return loginStrategy(req, res);
};

function getLogout(req, res) {
	req.logout();
	res.redirect('/');
};

function secret(req, res) {
	res.send( {secretMessage: "Hey" });

	// var secretStrategy = passport.authenticate('local-secret', {
	// 	successRedirect: '/secret',
	// 	failureRedirect: '/',
	// 	failureFlash: true
	// });
	// return secretStrategy(req, res);
};

function user_index(req, res) {
	db.User.find({}, function(err, users) {
		if (err) return "user index error: " + err;
		res.json(users);
	});
};

function user_create(req, res) {
	db.User.create(req.body, function(err, user) {
		if (err) return "user create error: " + err;
		res.json(user);
	});
};

function user_show(req, res) {
	db.User.findOne(req.params.id, function(err, user) {
		if (err) return "user show error: " + err;
		if (req.params.id == user.local._id) {
			res.json(user);
		}
	})
};

function user_update(req, res) {
	db.User.find(req.params.id, function(err, user) {
		if (err) return "user update error: " + err;
		if (req.params.id == user.local._id) {
			req.body.email = user.local.email;
			req.body.password = user.local.password;
			req.body.username = user.local.username;
		}
	})
};

function user_delete(req, res) {
	db.User.remove(req.params.id, function(err, user) {
		if (err) return "user delete error: " + err;
		res.json(user);
	})
};

function story_index(req, res) {
	db.Story.find({}, function(err, story) {
		if (err) return "story index error: " + err;
		res.json(story);
	});
};

function story_create(req, res) {
	db.Story.create(req.body, function(err, story) {
		if (err) return "story create error: " + err;
		res.json(story);
	});
};

function story_show(req, res) {
	db.Story.findOne(req.params.id, function(err, story) {
		if (err) return "story show error: " + err;
		if (req.params.id == story._id) {
			res.json(story);
		}
	})
};

function story_update(req, res) {
	db.Story.find(req.params.id, function(err, story) {
		if (err) return "story update error: " + err;
		if (req.params.id == story._id) {
			req.body.monthStart = story.monthStart;
			req.body.monthEnd = story.monthEnd;
			req.body.yearStart = story.yearStart;
			req.body.yearEnd = story.yearEnd;
			req.body.storyBody = story.storyBody;
		}
	})
};

function story_delete(req, res) {
	db.Story.remove(req.params.id, function(err, story) {
		if (err) return "story delete error: " + err;
		res.json(story);
	})
};

function get_map(req, res) {
	res.json('https://www.google.com/maps/embed/v1/place?key=' + apiKeyGoogle.key + '&q=Platte+St,+Denver,+CO+80202');
}

function search_map(req, res) {
	var street = req.body;
	var cityZip = req.query.cityZip;
	console.log(street);
	console.log(cityZip);
	res.json('https://www.google.com/maps/embed/v1/place?key=' + apiKeyGoogle.key + '&q=' + street + ',' + cityZip);
}

module.exports = {
	getLogin: getLogin,
	postLogin: postLogin,
	getSignup: getSignup,
	postSignup: postSignup,
	getLogout: getLogout,
	secret: secret,
	api_index: api_index,
	user_index: user_index,
	user_show: user_show,
	user_create: user_create,
	user_update: user_update,
	user_delete: user_delete,
	story_index: story_index,
	story_show: story_show,
	story_create: story_create,
	story_update: story_update,
	story_delete: story_delete,
	get_map: get_map,
	search_map: search_map
}