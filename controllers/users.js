var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');

var apiKeyGoogle = process.env.apiKeyGoogle || require('../config/env').key;


var db = require('../models');

function api_index(req, res) {
	res.json({
		message: "Welcome to Memory Lane!",
		documentation_url: "",
		base_url: "",
		endpoints: [
		{method: "GET", path: "/api", description: "You are here"},
		{method: "GET", path: "/api/user", description: "Lists all guests who have been here while also having done that"},
		{method: "POST", path: "/api/user", description: "We did not want these new users to be out on the streets, so we directed them here"},
		{method: "GET", path: "/api/user/:id", description: "If you want to find one user, now you know where to go"},
		{method: "GET", path: "/api/story", description: "If you're looking for a great story, look no further"},
		{method: "POST", path: "/api/story", description: "These new stories were homeless until they followed this path"},
		{method: "GET", path: "/api/story/:id", description: "Some stories like attention and some do not; this path, however, leaves them no choice"}
		]
	})
}

//Controllers for signing up and loggin in/out
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
	res.render('secret.ejs', { secretMessage: "Hey" });
	res.send( {secretMessage: "Hey" });

	var secretStrategy = passport.authenticate('local-secret', {
		successRedirect: '/secret',
		failureRedirect: '/',
		failureFlash: true
	});
	return secretStrategy(req, res);
};

//Controllers that allow users to be indexed, shown, created, updated, and deleted
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
	db.User.findById(req.params.id, function(err, user) {
		if (err) return "user show error: " + err;
		res.json(user);
	})
};

function user_update(req, res) {
	db.User.findById(req.params.id, function(err, user) {
		if (err) return "user update error: " + err;
		if (req.params.id == user._id) {
			user.local.email = req.body.email;
			user.local.password = req.body.password;
			user.local.username = req.body.username;
			user.save();
		}
		res.json(user);
	})
};

function user_delete(req, res) {
	db.User.remove({'_id' : req.params.id}, function(err, user) {
		if (err) return "user delete error: " + err;
		res.json(user);
	})
};

//Controllers that allow stories to be indexed, shown, created, updated, and deleted
function story_index(req, res) {
	db.Story.find({}, function(err, story) {
		if (err) return "story index error: " + err;
		res.json(story);
	});
};

function story_create(req, res) {
	var user = req.user._id;
	db.User.findById(user, function(err, user) {
		db.Story.create(req.body, function(err, story) {
		if (err) return "story create error: " + err;
		user.stories.push(story);
		user.save();
		res.json(story);
		})	
	});
};

function story_show(req, res) {
	db.Story.findById(req.params.id, function(err, story) {
		if (err) return "story show error: " + err;
		res.json(story);
	})
};

function story_update(req, res) {
	db.Story.findById(req.params.id, function(err, story) {
		if (err) return "story update error: " + err;
		if (req.params.id == story._id) {
			story.street = req.body.street;
			story.city = req.body.city;
			story.monthStart = req.body.monthStart;
			story.yearStart = req.body.yearStart;
			story.monthEnd = req.body.monthEnd;
			story.yearEnd = req.body.yearEnd;
			story.storyBody = req.body.storyBody;
			story.save();
		}
		res.json(story);
	})
};

function story_delete(req, res) {
	db.Story.remove({'_id' : req.params.id}, function(err, story) {
		if (err) return "story delete error: " + err;
		res.json(story);
	})
};

//Controller that takes the API key variable and builds the url for the initial map
function get_map(req, res) {
	res.json('https://maps.googleapis.com/maps/api/js?key=' + apiKeyGoogle + '&libraries=places&callback=initAutocomplete')
}

function test(req, res) {
	res.render('test.ejs', { message: req.flash('loginMessage') });
};

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
	test: test
}