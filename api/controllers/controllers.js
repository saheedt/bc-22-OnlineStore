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
	const user = firebase.auth().currentUser;
	const storesRef = db.ref("stores");

	if(user != null){
		//res.redirect('editstore.html');
		//.child(user.displayName)
		storesRef.once('value', (snapshot) =>{
			let exists = snapshot.val()
			console.log("stores direct child value is: ", exists);
			console.log("stores direct child exists? :", (exists !== null));
		});
		res.send({"message":"we are signed in to create store"});

	}else{
		res.send({"message": "log in to create store"});
		//res.redirect('/login');
	}

	//db.ref('stores').child(user);
	//res.redirect('/'+user);
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
//export firebase instance

//exports.fireBaseInstance = firebase;
