'use strict';

const firebase = require('firebase');
const config = require('../../config.json');

//to hold path to db on store public query
let storePath;

//initialize firebase with project config.
firebase.initializeApp(config);

//database instance
const db = firebase.database();

/**********api controllers******/

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
//api to check auth status
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
//api for sign out
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
	let found = false;

	if(user != null){

		storesRef.once('value').then((snapshot)=>{
			let exists = snapshot.val();
			//stop script here to see return value later.
			for (let inDb in exists){
				if(inDb == user.displayName){
					found = true;
				}
			}
			//console.log("found value is: ", found);
			if(found === true){
				res.send({"message":"store exists"});
				found = false;
			}else{
				let storeName = user.displayName;
				storesRef.child(storeName).set(initialEntry).then(
					function(){
						res.send({"message":"new store created"})
					}, 
					function(){
						res.send({"message":"store creation failed"})
					}
				);
			}
		});

	}else{
		res.send({"message": "log in to create store"});
	}

};

//add items to store.
exports.addItemsToStore = (req, res) => {

	let user = firebase.auth().currentUser;
	let title = req.body.title, price = req.body.price, desc = req.body.desc, image = req.body.image;

	if(user != null){
		let storeName = user.displayName;
		let itemRef = db.ref("stores/"+storeName+"/entry");
		itemRef.once("value")
			.then((snapshot)=>{

				if (snapshot.val() == "items"){
					let newItemref = itemRef.push();
						newItemref.set({
							"title": title,
							"price": price,
							"desc": desc,
							"image": image
						});
				}else{
					itemRef.push({
						"title": title,
						"price": price,
						"desc": desc,
						"image": image
					});
				}

			});

	}else{
		res.send({"message": "log in to add items to store"})
	}

};

//list store items
exports.listCurrentStoreItems = (req, res) => {
	let user = firebase.auth().currentUser;
	if(user != null){
		let storeName = user.displayName;
		firebase.database().ref("stores/"+storeName).once('value')
			.then((snapshot) =>{
  			let items = snapshot.val();
  			res.send(items);
		});
	}else{
		res.redirect('index.html');
	}
	
};

//api to check store availability
exports.hasStore = (req, res)=>{

	const user = firebase.auth().currentUser;

	const storesRef = db.ref('stores');
	let found = false;
	storesRef.once('value').then((snapshot)=>{

		let exists = snapshot.val();

		for(let present in exists){
			if(present == user.displayName){
				found = true;
			}
		}

		if(found == true){
			res.send({"message": "has store already"});
			found = false;
		}else{
			res.send({"message": "has no store"});
		}


	});
};

//api to get store contents from db on public query
exports.getStore = (req, res) =>{
	console.log(storePath);
	firebase.database().ref(storePath).once('value')
		.then((snapshot)=>{
			let entries = snapshot.val();
  			res.send(entries);
		});
};

/*******view controllers*******/

//shows landing page
exports.showLanding = (req, res)=>{
	res.redirect('index.html');
};
//shows login page
exports.showLogin = (req, res)=>{
	res.redirect('login.html');
};
//shows sign up page
exports.showSignUp = (req, res)=>{
	res.redirect('signup.html');
};
//shows page to add sore items
exports.showAddToStore = (req, res) => {
	res.redirect('addtostore.html');
};
//redirects to store on direct url hit.
exports.showStorePage = (req, res) => {
	storePath = req.path;
	res.redirect('/store.html');
};
