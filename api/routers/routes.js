'use strict';

module.exports = (app)=>{
	
	const controller = require('../controllers/controllers.js');

	app.route('/login').post(controller.login);
	app.route('/logout').post(controller.signup);

}