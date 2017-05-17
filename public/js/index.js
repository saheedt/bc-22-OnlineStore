window.addEventListener('load', function(){
	const indexNavBtn = document.getElementById('navBtn');
	const createStore = document.getElementById('createStore');
	const indexSignOut = document.getElementById('indexSignOut');

	// check if user is logged in and handle signout button
	// accordingly.
	fetch("http://localhost:3000/api/isLoggedIn", {
  		method: "POST"
  		//body: formData
		})
		.then((response)=>{
			response.json().then((resp)=>{
				if(resp.message == "Logged In"){
					indexSignOut.style.display = "block";
				}

				if(resp.message == "Not Logged In"){
					indexSignOut.style.display = "none";
				}
			});
		})
		.catch((error)=>{
			//TODO: Error handling..
		});

	indexNavBtn.addEventListener('click', (e)=>{
		document.getElementById("Dropdown").classList.toggle("show");
	});

	createStore.addEventListener('click', (e)=>{
		fetch("http://localhost:3000/createStore", {
  		method: "POST"
  		//body: formData
		})
		.then((response)=>{
			response.json().then((resp)=>{
				if(resp.message == "log in to create store"){
					window.location.pathname = "/login";
				}else{
					console.log(resp);
					//TODO: Handle error.
				}
			});
		})
		.catch((error)=>{
			console.log(error);
			//TODO: Error handling..
		});
	});

	indexSignOut.addEventListener('click', (e)=>{
		fetch("http://localhost:3000/api/signout", {
  		method: "POST"
  		//body: formData
		})
		.then((response)=>{
			response.json().then((resp)=>{
				if(resp.message == "successful Sign Out"){
					indexSignOut.style.display = "none";
					window.location.pathname = "/";
				}else{
					console.log(resp);
					//TODO: Handle error.
				}
			});
		})
		.catch((error)=>{
			console.log(error);
			//TODO: Error handling..
		});
	});
	});
//});