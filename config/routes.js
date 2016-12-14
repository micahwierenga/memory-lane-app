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

router.route('/')
	.get(staticsController.home);

router.route('/signup')
	.get(usersController.getSignup)
	.post(usersController.postSignup)

router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin)

router.route('/logout')
	.get(usersController.getLogout)

router.route('/secret')
	.get(authenticatedUser, usersController.secret)

router.route('/api')
	.get(usersController.api_index);

router.route('/api/user')
	.get(usersController.user_index)
	.post(usersController.user_create)

router.route('/api/user/:id')
	.get(usersController.user_show)
	.put(usersController.user_update)
	.delete(usersController.user_delete)

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

router.route('/api/map')
	.get(usersController.get_map)

// router.route('/api/searchMap')
// 	.get(usersController.search_map)
// 	.post(usersController.search_map)

router.route('/test')
	.get(usersController.test)


// app.get('/api', api_index);

// app.get('/api/user', user_index);

// app.post('api/user', user_create);

// app.get('api/user/:id', user_show);

// app.put('api/user/:id', user_update);

// app.delete('api/user/:id', user_delete);

// app.get('/api/story', story_index);

// app.post('api/story', story_create);

// app.get('api/story/:id', story_show);

// app.put('api/story/:id', story_update);

// app.delete('api/story/:id', story_delete);

module.exports = router;