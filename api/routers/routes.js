'use strict';

const controller = require('../controllers/controllers.js');

module.exports = (app)=>{

	//view routes
	app.get('/', controller.showLanding);
	app.get('/login', controller.showLogin);
	app.get('/signup', controller.showSignUp);
	app.post('/createstore', controller.createStore);
	app.get('/addtostore', controller.showAddToStore);
	app.get('/stores/:name', controller.showStorePage);

	//api routes
	app.route('/api/login').post(controller.login);
	app.route('/api/signup').post(controller.signup);
	app.route('/api/signout').post(controller.signout);
	app.route('/api/isLoggedIn').post(controller.isLoggedIn);
	app.route('/api/addtostore').post(controller.addItemsToStore);
	app.route('/api/hasstore').post(controller.hasStore);
	app.route('/api/getstoreitems').post(controller.listCurrentStoreItems);
	app.route('/api/getsore').post(controller.getStore);
	app.route('/api/getAll').post(controller.getAllProducts);
	app.route('/api/genstorelink').post(controller.genStoreLink);
}