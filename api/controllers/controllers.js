'use strict';

const firebase = require('firebase');
const config = require('../../config.json');
let userDetails = {};

//initialize firebase with project config.
firebase.initializeApp(config);

const checkDisplayName = ()=>{
	let user;
	user = firebase.auth().currentUser;
	console.log(user);
	let displayName = user.user.displayName;
	return displayName;
};



//export login control

//api controllers
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

exports.signup = (req, res)=>{
	//extract email and password from request body.
	const email = req.body.email;
	const password = req.body.password;
	const displayname = req.body.displayname;
	console.log(displayname);
	//userDetails.displayName = displayname;

	//call to firebase sdk createUser method.
	firebase.auth().createUserWithEmailAndPassword(email, password).then((createCred)=>{
		let user = firebase.auth().currentUser;
		let uid = createCred.uid;
		let uemail = createCred.email;

		userDetails.displayName = displayname;
		userDetails.uid = uid;
		userDetails.email = uemail;
		console.log('displayName from userDetails:', userDetails.displayName);
		console.log('displayName from request:', displayname);
		user.updateProfile({
  			displayName: displayname
		}).then(function() {
  			// Update successful.
  			console.log('displayName updated.')
		}, function(error) {
  			// An error happened.
		});
		res.send(createCred);
	}).catch((error)=>{
		res.send(error);
	});
};


//view controllers

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
	console.log('from memory: ',userDetails.displayName);
	let user = firebase.auth().currentUser
	if(user != null){
		console.log('from firebase.auth().currentUser: ', user.displayName);
	}else{
		console.log('still has issue with user');
	}
	
	return;
	if(checkDisplayName() == '' || checkDisplayName() === null || checkDisplayName() === '' || checkDisplayName() == undefined){
		res.send({"message": "No display name set"});
		return;
	}
	res.redirect('createstore.html');

};

exports.isAuthenticated = (req, res)=>{
	let user = firebase.auth().currentUser;
	if(user){

	};
};

