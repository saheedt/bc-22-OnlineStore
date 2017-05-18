window.addEventListener('load', function(){
	const indexNavBtn = document.getElementById('navBtn');
	const createStore = document.getElementById('createStore');
	const indexSignOut = document.getElementById('indexSignOut');
	const indexCreateStore = document.getElementById("createStore");
	const indexAddToStore = document.getElementById("addToStore");

	
	const hasStore = ()=>{
		fetch("http://localhost:3000/api/hasstore",{
			method: "POST"
		}).then((feed)=>{
			feed.json().then((has)=>{
				if(has.message == "has store already"){
					indexCreateStore.style.display = "none";
					indexAddToStore.style.display = "block";
				}
				if(has.message == "has no store"){
					indexCreateStore.style.display = "block";
					indexAddToStore.style.display = "none";
				}
			});
		});
	};

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
					hasStore();
				}

				if(resp.message == "Not Logged In"){
					indexSignOut.style.display = "none";
				}
			});
		});

	addToStore.addEventListener('click', (e)=>{
		window.location.pathname = '/addtostore';
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
				}else if(resp.message == "new store created"){
					window.location.pathname = "/addtostore";
				}else if(resp.message == "store creation failed"){
					//TODO: error display.
					console.log(resp.message);
				}else if(resp.message == "store exists"){
					//TODO: error display.
					console.log(resp.message);
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

window.onclick = function(event) {
	
  if (event.target.matches('#navBtn') || event.target.matches('.material-icons')) {
  	return;
    }
    	var dropdowns = document.getElementsByClassName("dropdown-content");
    	var i;
    	for (i = 0; i < dropdowns.length; i++) {
      	var openDropdown = dropdowns[i];
      	if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      	}
	}
};
	});
//});