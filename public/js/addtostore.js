window.addEventListener('load', function(){
	let image = document.getElementById("productImageUploader");
	let imgTag = document.getElementById("proImg");
	let addToStoreNavBtn = document.getElementById('navBtn');
	let signOutBtn = document.getElementById('AddTOStoreSignOut');
	let addItemsToStoreBtn = document.getElementById("AddItemToStoreBtn");
	let home = document.getElementById("navHome");

	let productTitle = document.getElementById("productTitle");
	let productPrice = document.getElementById("productPrice");
	let productDesc = document.getElementById("productDesc");
	let productImage, storeData = [], dataCollected = false;



	fetch("http://localhost:3000/api/isLoggedIn", {
  		method: "POST"
  		//body: formData
		})
		.then((response)=>{
			response.json().then((resp)=>{
				if(resp.message == "Logged In"){
					signOutBtn.style.display = "block";
				}

				if(resp.message == "Not Logged In"){
					signOutBtn.style.display = "none";
					window.location.pathname = "/login";
				}
			});
		});


	image.addEventListener("change",(e)=>{
		resizeImageToSpecificWidth(document.getElementsByTagName('input')[3].files[0], 150, function(dat) {
        imgTag.src = dat;
        productImage = dat;
  		});
	});
	home.addEventListener("click",(e)=>{
		window.location.pathname = "/";
	});

	addToStoreNavBtn.addEventListener('click', (e)=>{
		document.getElementById("Dropdown").classList.toggle("show");
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


addItemsToStoreBtn.addEventListener("click",()=>{

	let storeData = {
		"title": productTitle.value,
		"price": productPrice.value,
		"desc": productDesc.value,
		"image": productImage
	}

	fetch("http://localhost:3000/api/addtostore", {
  		method: "POST",
  		headers:{'Content-Type':'application/json'},
  		body: JSON.stringify(storeData)
		})
		.then((response)=>{
			response.json().then((resp)=>{
				if(resp.message == "log in to add items to store"){
					window._cameFrom = "/addtostore";
					window.location.pathname = "/login";
				}
			});
		})
		.catch((error)=>{
			console.log(error);
			//TODO: Error handling..
	});
});

fetch("http://localhost:3000/api/getstoreitems", {
  		method: "POST",
  		headers:{'Content-Type':'application/json'},
		})
		.then((response)=>{
			response.json().then((storeItems)=>{
				let temp = [], directory = storeItems.entry;
				for (let data in directory){
					storeData.push(directory[data]);
				}
				dataCollected = true;

			});
		})
		.catch((error)=>{
			console.log(error);
			//TODO: Error handling..
	});

//do listing
let index = 0, toAdd;
let doAdd = setInterval(()=>{

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

},2000);

/*function doTpl(){
	let options = {
		valueNames:['title', 'price', 'desc', {name: 'image', attr: 'src'} ],
		item: '<li><div id="imageHolder"><img class="image"></div><div id="txtHolder"><p class="title"></p><p class="price"></p><p class="desc"></p></div></li>'
	};
	let productListing = new List('productListing', options);

	for( let i = 0; i <= storeData.length; i++ ){
		productListing.add(storeData[i]);
	}
};*/

});


function resizeImageToSpecificWidth(file, max, cb) {
  let data;
    let reader = new FileReader();
    reader.onload = function(event) {
      let img = new Image();
      img.onload = function() {
        if (img.width > max) {
          let oc = document.createElement('canvas'), octx = oc.getContext('2d');
          oc.width = img.width;
          oc.height = img.height;
          octx.drawImage(img, 0, 0);
          if( img.width > img.height) {
            oc.height = (img.height / img.width) * max;
            oc.width = max;
          } else {
            oc.width = (img.width / img.height) * max;
            oc.height = max;
          }
          octx.drawImage(oc, 0, 0, oc.width, oc.height);          
          octx.drawImage(img, 0, 0, oc.width, oc.height);
          data = oc.toDataURL();
        } else {
          data = oc.toDataURL();
        }
        cb(data);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}