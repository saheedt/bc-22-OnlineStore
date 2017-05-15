'use strict';

const firebase = require('firebase');
const config = require('../../config.json');

//initialize firebase with project config.
firebase.initializeApp(config);

//export login control
exports.login = (req, res)=>{
	//extract email and password from request body.
	const email = req.body.email;
	const password = req.body.password;

	//call to firebase sdk signIn method
	firebase.auth().signInWithEmailAndPassword(email, password).then((cred)=>{
		res.send(cred);
	}).catch((error)=>{
		res.send(error);
};

exports.signup = (req, res)=>{
	//extract email and password from request body.
	const email = req.body.email;
	const password = req.body.password;

	//call to firebase sdk createUser method.
	firebase.auth().createUserWithEmailAndPassword(email, password).then((createCred)=>{
		res.send(createCred);
	}).catch((error)=>{
		res.send(error);
	})
}

