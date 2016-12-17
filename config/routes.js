var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

function authenticatedUser(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
}

//Route for home
router.route('/')
	.get(staticsController.home);

//Routes for signing up and logging in/out
router.route('/signup')
	.get(usersController.getSignup)
	.post(usersController.postSignup)

router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin)

router.route('/logout')
	.get(usersController.getLogout)

// router.route('/secret')
// 	.get(authenticatedUser, usersController.secret)

//Route for showing all endpoints
router.route('/api')
	.get(usersController.api_index);

//Routes for indexing, showing, creating, updating, and deleting users
router.route('/api/user')
	.get(usersController.user_index)
	.post(usersController.user_create)

router.route('/api/user/:id')
	.get(usersController.user_show)
	.put(usersController.user_update)
	.delete(usersController.user_delete)

//Routes for indexing, showing, creating, updating, and deleting stories
router.route('/api/story')
	.get(usersController.story_index)
	.post(usersController.story_create)
	// .post(authenticatedUser, usersController.story_create)

router.route('/api/story/:id')
	.get(usersController.story_show)
	.put(usersController.story_update)
	// .put(authenticatedUser, usersController.story_update)
	.delete(usersController.story_delete)
	// .delete(authenticatedUser, usersController.story_delete)

//Route for retrieving inital map
router.route('/api/map')
	.get(usersController.get_map)

router.route('/test')
	.get(usersController.test)

module.exports = router;