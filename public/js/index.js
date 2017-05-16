window.addEventListener('load', function(){
	const indexNavBtn = document.getElementById('navBtn');
	const createStore = document.getElementById('createStore');

	indexNavBtn.addEventListener('click', (e)=>{
		document.getElementById("Dropdown").classList.toggle("show");
	});

	createStore.addEventListener('click', (e)=>{




		fetch("http://localhost:3000/createstore", {
  		method: "POST"
  		//body: formData
		})
		.then((response)=>{
			response.json().then((resp)=>{
				/*if(resp.uid){
					if(localStorage.getItem('bc-22-onlinestore')){
						localStorage.removeItem('bc-22-onlinestore');
						localStorage.setItem('bc-22-onlinestore', JSON.stringify({"uid":res.uid, "email": res.email}));
					}
					if(localStorage.getItem('bc-22-onlinestore')){
					window.location.pathname = "/";
					}
				}else{
					//TODO: Error handling..
				}*/
				console.log(resp);
			});
		})
		.catch((error)=>{
			console.log(error);
			//TODO: Error handling..
		});
	});
});