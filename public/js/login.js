window.addEventListener('load', function(){

	const loginBtn = document.getElementById('loginBtn');
	let form = document.getElementById('loginForm');
	let email = document.getElementById('loginEmailInput');
	let password = document.getElementById('loginPasswordInput');
	let errorDisplay = document.getElementById('loginErrDisplay');
	let formData;

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



	form.addEventListener('submit', (e)=>{
		e.preventDefault();
		formData = {
			"email": email.value,
			"password": password.value
		};

		fetch("http://localhost:3000/api/login", {
  		method: "POST",
  		headers:{'Content-Type':'application/json'},
  		body: JSON.stringify(formData)
		})
		.then((response)=>{
			response.json().then((resp)=>{
				if(resp.uid){
					if(localStorage.getItem('bc-22-onlinestore')){
						localStorage.removeItem('bc-22-onlinestore');
						localStorage.setItem('bc-22-onlinestore', JSON.stringify({"uid":resp.uid, "email": resp.email}));
						window.location.pathname = "/";
					}else{
						localStorage.setItem('bc-22-onlinestore', JSON.stringify({"uid":resp.uid, "email": resp.email}));
						window.location.pathname = "/";
					}
					console.log(localStorage.getItem('bc-22-onlinestore'));
				}else{
					//TODO: Error handling..
				}
			});
		})
		.catch((error)=>{
			console.log(error);
			//TODO: Error handling..
		});
	});
});