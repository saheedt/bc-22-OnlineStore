'use strict';

const controller = require('../controllers/controllers.js');

module.exports = (app)=>{

	//view routes
	app.get('/', controller.showLanding);
	app.get('/login', controller.showLogin);
	app.get('/signup', controller.showSignUp);
	app.post('/createstore', controller.showCreateStore);

	//api routes
	app.route('/api/login').post(controller.login);
	app.route('/api/signup').post(controller.signup);
	//app.route('/api/logout').post(controller.signup);
}