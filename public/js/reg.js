window.addEventListener('load', function(){

	const regBtn = document.getElementById('regBtn');
	let form = document.getElementById('regForm');
	let email = document.getElementById('signupEmailInput');
	let displayName = document.getElementById('signupDisplayNameInput');
	let password = document.getElementById('signupPasswordInput');
	let xpassword = document.getElementById('xsignupPasswordInput');
	let errorDisplay = document.getElementById('regErrDisplay');
	let formData, xForm, formParams;

	email.addEventListener('blur', (e)=>{
		if(email.value == ''){
			errorDisplay.innerText = "Email field can't be left empty.";
			errorDisplay.style.display = "block";
			setTimeout(()=>{ errorDisplay.style.display = "none"; errorDisplay.innerText =""; }, 5000);
			err = true;
			return;
		}
		if(!/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(email.value)){
			errorDisplay.innerText = "Invalid Email, supply valid email. (e.g name@place.com)";
			errorDisplay.style.display = "block";
			setTimeout(()=>{ errorDisplay.style.display = "none"; errorDisplay.innerText ="";}, 5000);
			err = true;
			return;
		}
	});
	xpassword.addEventListener('keyup', (e)=>{
		if(xpassword.value !== password.value){
			errorDisplay.innerText = "Passwords do not match";
			errorDisplay.style.display = "block";
		}else{
			errorDisplay.style.display = "none";
			errorDisplay.innerText = "";
		}
	});

	form.addEventListener('submit', (e)=>{
		//application/x-www-form-urlencoded
		e.preventDefault();
		formData = {
			"email": email.value,
			"password": password.value,
			"displayname": displayName.value
		};

		fetch("http://localhost:3000/api/signup", {
  		method: "POST",
  		headers:{'Content-Type':'application/json'},
  		body: JSON.stringify(formData)
		})
		.then((response)=>{
			response.json().then((res)=>{
				console.log(res);
			if(res.uid){
				if(localStorage.getItem('bc-22-onlinestore')){
					localStorage.removeItem('bc-22-onlinestore');
					localStorage.setItem('bc-22-onlinestore', JSON.stringify({"uid":res.uid, "email": res.email}));
					window.location.pathname = "/";
				}else{
					localStorage.setItem('bc-22-onlinestore', JSON.stringify({"uid":res.uid, "email": res.email}));
					window.location.pathname = "/";
				}
			}else{
				//TODO: Display error message.
			}
		});
		})
		.catch((error)=>{
			console.log(error);
			//TODO: Display error message
		});
	});
});