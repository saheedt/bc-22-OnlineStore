'use strict';

const firebase = require('firebase');
const config = require('../../config.json');

//initialize firebase with project config.
firebase.initializeApp(config);

const db = firebase.database();
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

exports.isLoggedIn = (req, res)=>{
	const user = firebase.auth().currentUser;
	if(user != null){
		res.send({"message":"Logged In"});
		return;
	}
	res.send({"message": "Not Logged In"});
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
		res.send({"message":{"Sign Up Error": error}});
	});
};
exports.signout = (req, res)=>{

	firebase.auth().signOut().then(function() {
  		res.send({"message": "successful Sign Out"});
	}, function(error) {
  		res.send({"message":{"Sign Out Error": error}});
	});
};

//create store api
exports.createStore = (req, res)=>{	
	const user = firebase.auth().currentUser;
	const storesRef = db.ref('stores');
	const initialEntry = {"entry":"items"};

	if(user != null){

		storesRef.once('value').then((snapshot)=>{
			let exists = snapshot.val();
			//stop script here to see return value later.
			if (exists !== user.displayName){
				let storeName = user.displayName;
				storesRef.child(storeName).set(initialEntry);
			}
		}).catch((error)=>{
			res.send({"message":"Error creating new store."})
		});


		storesRef.on('child_added', (snapshot)=>{
			if(snapshot.val() == user.displayName){
				res.send({"message":"new store "+snapshot.val()+" created"});
			}

		});

	}else{
		res.send({"message": "log in to create store"});
		//res.redirect('/login');
	}

};


/*******view controllers*******/

exports.showLanding = (req, res)=>{
	res.redirect('index.html');
};
exports.showLogin = (req, res)=>{
	res.redirect('login.html');
};
exports.showSignUp = (req, res)=>{
	res.redirect('signup.html');
};

/*exports.showCreateStore = (req, res) => {
	let user = firebase.auth().currentUser;
	let test = db.ref("stores");
	console.log('stores ref: ', test);
	console.log('stores ref child:', test.child(user));
};*/

/*exports.showEditStore = (req, res) => {
	
	return;
	// check if user is logged in and show appropriate page.
	if(user != null || user.displayName != null){
		res.redirect('editstore.html');
	}else{
		res.redirect('login.html');
	}
};*/
