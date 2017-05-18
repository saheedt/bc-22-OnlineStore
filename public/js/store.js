window.addEventListener('load', function(){
	const storeNavBtn = document.getElementById('navBtn');
	const storeCreateStore = document.getElementById("storeCreateStore");
	const storeAddToStore = document.getElementById("storeAddToStore");
	const storeSignOut = document.getElementById("storeSignOut");

	//check if a user has a store created
	const hasStore = ()=>{
		fetch(location.origin+"/api/hasstore",{
			method: "POST"
		}).then((feed)=>{
			feed.json().then((has)=>{
				if(has.message == "has store already"){
					storeCreateStore.style.display = "none";
					storeAddToStore.style.display = "block";
				}
				if(has.message == "has no store"){
					storeCreateStore.style.display = "block";
					storeAddToStore.style.display = "none";
				}
			});
		});
	};


	fetch(location.origin+"/api/isLoggedIn", {
  		method: "POST"
	})
	.then((response)=>{
		response.json().then((resp)=>{
			if(resp.message == "Logged In"){
				storeSignOut.style.display = "block";
				hasStore();
			}

			if(resp.message == "Not Logged In"){
				storeSignOut.style.display = "none";
			}
		});
	});

	storeAddToStore.addEventListener('click', (e)=>{
		window.location.pathname = '/addtostore';
	});
	storeNavBtn.addEventListener('click', (e)=>{
		document.getElementById("Dropdown").classList.toggle("show");
	});
	storeCreateStore.addEventListener('click', (e)=>{
		fetch(location.origin+"/createStore", {
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
	storeSignOut.addEventListener('click', (e)=>{
		fetch(location.origin+"/api/signout", {
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

	///api/getsore
	fetch(location.origin+"/api/getsore",{
			method: "POST"
		}).then((response)=>{
			response.json().then((items)=>{
				console.log(items);
			});
		});

	window.onclick = function(event) {
	
  		if (event.target.matches('#navBtn') || event.target.matches('.material-icons')) {
  			return;
    	}
    	let dropdowns = document.getElementsByClassName("dropdown-content");
    	let i;
    	for (i = 0; i < dropdowns.length; i++) {
      	let openDropdown = dropdowns[i];
      	if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      	}
	}
};
});