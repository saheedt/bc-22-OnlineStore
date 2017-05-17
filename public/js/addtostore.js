window.addEventListener('load', function(){
	let image = document.getElementById("productImageUploader");
	let imgTag = document.getElementById("proImg");
	let addToStoreNavBtn = document.getElementById('navBtn');
	let signOutBtn = document.getElementById('AddTOStoreSignOut');




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
				}
			});
		});


	image.addEventListener("change",(e)=>{
		resizeImageToSpecificWidth(document.getElementsByTagName('input')[3].files[0], 150, function(dat) {
        imgTag.src = dat;
  		});
	});

	addToStoreNavBtn.addEventListener('click', (e)=>{
		document.getElementById("Dropdown").classList.toggle("show");
	});

window.onclick = function(event) {
  if (!event.target.matches('#navBtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

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