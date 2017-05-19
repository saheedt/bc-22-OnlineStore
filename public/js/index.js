window.addEventListener('load', function(){
	const indexNavBtn = document.getElementById('navBtn');
	const createStore = document.getElementById('createStore');
	const indexSignOut = document.getElementById('indexSignOut');
	const indexCreateStore = document.getElementById("createStore");
	const indexAddToStore = document.getElementById("addToStore");
	const indexLoginBtn = document.getElementById("navUserBtn");
	let homeOut = [];

	
	const hasStore = ()=>{
		fetch(location.origin+"/api/hasstore",{
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

	indexLoginBtn.addEventListener('click', ()=>{
		window.location.pathname = "/login";
	});

	fetch(location.origin+"/api/getAll",{
			method: "POST"
		}).then((response)=>{
			response.json().then((store)=>{
				console.log(store);
				for(let name in store){
					for(let key in store[name].entry){
						//console.log(typeof store[name].entry[key]);
						if(typeof store[name].entry[key] == "object"){
							homeOut.push(store[name].entry[key]);
						}
					}
				}

				let options ={
					valueNames:['title', 'price', 'desc', {name: 'image', attr: 'src'} ],
					item: '<li><img id="storeImg" class="image"><br><div class="details"><p class="title"></p><p class="price">₦</p><p class="desc"></p></div></li>'
				};
				let indexProductListing = new List('indexProductListing', options);

				for(let count = 0; count < homeOut.length; count++){
					//console.log(storeData[count]);
					if(homeOut[count] !== undefined){
						indexProductListing.add(homeOut[count]);
					}
				}				
			});
		});

	// check if user is logged in and handle signout button
	// accordingly.
	fetch(location.origin+"/api/isLoggedIn", {
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

	indexSignOut.addEventListener('click', (e)=>{
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
//});