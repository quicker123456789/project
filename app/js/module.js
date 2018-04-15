const WIDTH = 358;
let slider = document.querySelector(".main-block__slider"),	
	carousel = document.querySelector(".carousel"),	
	imgMap = {
		123: "assets/images/shot-1.png",
		122: "assets/images/shot-2.png",
		124: "assets/images/shot-3.png",
		125: "assets/images/4.jpg",
		126: "assets/images/5.jpg",
		127: "assets/images/6.jpg",
		128: "assets/images/7.jpg",
		111: "assets/images/8.jpg",
		112: "assets/images/9.jpg",
		110: "assets/images/10.jpg",
		109: "assets/images/11.jpg",
		100: "assets/images/12.jpg"
	},
	circlesList,
	position = 0,	
	lighted,
	xhr = new XMLHttpRequest(), arrayOfObj;

xhr.open('GET', 'api/app_packages.json', true);
xhr.send();
xhr.onload = function() {
	arrayOfObj = JSON.parse(this.responseText)["array"];	
	
	init(arrayOfObj);

	document.querySelector(".arrow__left").onclick = move;
	document.querySelector(".arrow__right").onclick = move;

	document.querySelector(".carousel").onclick = (event) => {
		let target = event.target, 
			num = target.dataset.ind;
		if(target.tagName !== "LI") return;	

		position = -WIDTH*(num-1);	
	    slider.style.marginLeft = position + 'px';
	    
		lighted = highLight(target);
	};
};
xhr.onerror = function(){
	console.log(xhr.status);
	console.log(xhr.statusText);
};

function move(event){ 
	if (event.currentTarget.classList.contains("arrow__right")){
		position = Math.max(position - WIDTH, -WIDTH * (arrayOfObj.length-3));

		(lighted == circlesList.lastElementChild.previousElementSibling ||
	  		lighted == circlesList.lastElementChild) ? 
		highLight(circlesList.lastElementChild.previousElementSibling) :
		lighted = highLight(lighted.nextElementSibling);

	} else {
		position = Math.min(position + WIDTH, 0);

		(lighted == circlesList.children[1] || 
			lighted == circlesList.firstElementChild) ?
		highLight(circlesList.children[1]) :
		lighted = highLight(lighted.previousElementSibling);
	}
	
	slider.style.marginLeft = position + 'px';
}

/*export*/ function createContainer(object) {
	let container = document.createElement("div"),
	img = document.createElement("img"),
	headline = document.createElement("div"),
	date = document.createElement("time");

	img.setAttribute("src", imgMap[object.guid]);
	img.className = "main-block__img";
	headline.className = "headline section__headline";
	headline.innerText = object.description;
	date.className = "date section__date";
	date.innerText = new Date(object.datetime).toLocaleDateString('ru-RU',{year: 'numeric', month: 'long', day: 'numeric' });

	container.className = "main-block__section section";
	container.appendChild(img);
	container.appendChild(headline);
	container.appendChild(date);

	return container;
}

/*export*/ function createCircle(){
	let circle = document.createElement("li");
	circle.className = "carousel__dot";

	return circle;
}

/*export*/ function createCirclesList(){
	let list = document.createElement("ul");
	list.className = "list carousel__circles clearfix";

	Array.from(slider.children).forEach((child, i) =>{
		let dot = document.createElement("li");
		dot.className = "carousel__dot";

		dot.setAttribute("data-ind", i);
		list.appendChild(dot);
	});

	return list;
}

/*export*/ function highLight(marker){
	let marked = circlesList.querySelector(".carousel__dot_highlight");		
	if (marked) marked.classList.remove("carousel__dot_highlight");	

	marker.classList.add("carousel__dot_highlight");

	return marker;
}


/*export*/ function init(arrOfObj){
	arrOfObj.forEach(obj => {
		slider.appendChild(createContainer(obj));		
	});
	
	circlesList = createCirclesList();
	carousel.appendChild(circlesList);

	lighted = highLight(circlesList.children[1]);	
}

//window.onload = () => init(); /*addEventListener("load", init);// */
