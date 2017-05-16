'use strict';

const firebase = require('firebase');
const config = require('../../config.json');

//initialize firebase with project config.
firebase.initializeApp(config);

//export login control

//api controllers

//login api
exports.login = (req, res)=>{
	//extract email and password from request body.
	const email = req.body.email;
	const password = req.body.password;

	//call to firebase sdk signIn method
	firebase.auth().signInWithEmailAndPassword(email, password).then((cred)=>{
		res.send(cred);
	}).catch((error)=>{
		res.send(error);
	});
};


//signup api
exports.signup = (req, res)=>{
	//extract email and password from request body.
	const email = req.body.email;
	const password = req.body.password;
	const displayname = req.body.displayname;

	//call to firebase sdk createUser method.
	firebase.auth().createUserWithEmailAndPassword(email, password).then((createCred)=>{
		let user = firebase.auth().currentUser;

		user.updateProfile({
  			displayName: displayname
		}).then(function() {
  			// Update successful.
		}, function(error) {
  			// An error happened.
		});
		res.send(createCred);
	}).catch((error)=>{
		res.send(error);
	});
};

//create store api
exports.createStore = (req, res)=>{
	const db = firebase.database();
	let user = firebase.auth().currentUser.displayName
	db.ref('stores').child(user).child("store");

};


/*******view controllers*******/

exports.showLanding = (req, res)=>{
	res.render('index.html');
};
exports.showLogin = (req, res)=>{
	res.redirect('login.html');
};
exports.showSignUp = (req, res)=>{
	res.redirect('signup.html');
};

exports.showCreateStore = (req, res) => {
	let user = firebase.auth().currentUser;

	// check if user is logged in and show appropriate page.
	if(user != null || user.displayName != null){
		res.redirect('createstore.html');	
	}else{
		res.redirect('login.html');
	}
};

exports.isAuthenticated = (req, res)=>{
	let user = firebase.auth().currentUser;
	if(user){

	};
};

