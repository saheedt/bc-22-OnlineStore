window.addEventListener('load', function(){
	const storeNavBtn = document.getElementById('navBtn');
	const storeCreateStore = document.getElementById("storeCreateStore");
	const storeAddToStore = document.getElementById("storeAddToStore");
	const storeSignOut = document.getElementById("storeSignOut");
	let storeData = [], dataCollected = false;

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
				//console.log(items);

				let directory = items.entry;
				for (let data in directory){
					storeData.push(directory[data]);
				}
				dataCollected = true;

				let options ={
					valueNames:['title', 'price', 'desc', {name: 'image', attr: 'src'} ],
					item: '<li><img id="storeImg" class="image"></li>'
				};
				let storeProductListing = new List('storeProductListing', options);

				for(let count = 0; count < storeData.length; count++){
					//console.log(storeData[count]);
					if(storeData[count] !== undefined){
						storeProductListing.add(storeData[count]);
					}
				}

		/*let doAdd = setInterval(()=>{

			if(dataCollected === true){
			
			if(storeData[index] === undefined){
				clearInterval(doAdd);
				index = 0;
			}
		let options = {
		valueNames:['title', 'price', 'desc', {name: 'image', attr: 'src'} ],
		item: '<li><div id="imageHolder"><img id="pImg" class="image"></div><div id="txtHolder"><p class="title"></p><p class="price">U+020A6</p><p class="desc"></p></div></li>'
		};
		let productListing = new List('productListing', options);
		toAdd = storeData[index];
		productListing.add(toAdd);
		index = index + 1;
	}

},2000);*/





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