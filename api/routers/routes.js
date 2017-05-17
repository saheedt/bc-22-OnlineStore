'use strict';

const controller = require('../controllers/controllers.js');
/*const isAuthenticated = (req, res, next) => {
	let user = controller.fireBaseInstance.auth().currentUser;

	// check if user is logged in and show appropriate page.
	if(user != null || user.displayName != null){
		return next();	
	}
	res.redirect('login.html');
};*/

module.exports = (app)=>{

	//view routes
	app.get('/', controller.showLanding);
	app.get('/login', controller.showLogin);
	app.get('/signup', controller.showSignUp);
	app.post('/createstore', controller.createStore);
	app.get('/addtostore', controller.showAddTStore);
	/*app.get('/store/:storeName', controller.getStore)
	app.get('/store/')*/

	//api routes
	app.route('/api/login').post(controller.login);
	app.route('/api/signup').post(controller.signup);
	app.route('/api/signout').post(controller.signout);
	app.route('/api/isLoggedIn').post(controller.isLoggedIn);
	app.route('/api/addtostore', controller.addItemsToStore);
	//app.route('/api/logout').post(controller.signup);
}