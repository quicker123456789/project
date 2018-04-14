const WIDTH = 358;
let slider = document.querySelector(".main-block__slider"),	
	carousel = document.querySelector(".carousel"),	
	imgMap = {
		123: "assets/images/shot-1.png",
		122: "assets/images/shot-2.png",
		124: "assets/images/shot-3.png",
		125: "assets/lesson2/4.jpg",
		126: "assets/lesson2/5.jpg",
		127: "assets/lesson2/6.jpg",
		128: "assets/lesson2/7.jpg",
		111: "assets/lesson2/8.jpg",
		112: "assets/lesson2/9.jpg",
		110: "assets/lesson2/10.jpg",
		109: "assets/lesson2/11.jpg",
		100: "assets/lesson2/12.jpg"
	},
	circlesList,
	position = 0,	
	lighted;
let xhr = new XMLHttpRequest(), arrayOfObj;
xhr.open('GET', 'api/app_packages.json', true);
xhr.send();
xhr.onload = function() {
	arrayOfObj = JSON.parse(this.responseText)["array"];	
	
	init(arrayOfObj);

	document.querySelector(".arrow__left").onclick = () => {
		position = Math.min(position + WIDTH, 0);
	    slider.style.marginLeft = position + 'px';
	    
		lighted = delLight(lighted);
		if (lighted == circlesList.children[1] || 
			lighted == circlesList.firstElementChild) {
			highLight(circlesList.children[1]);
			return;
		}
		highLight(lighted.previousElementSibling);
		};

	document.querySelector(".arrow__right").onclick = () => {	
		position = Math.max(position - WIDTH, -WIDTH * (arrayOfObj.length-3));	
	    slider.style.marginLeft = position + 'px';

	  	lighted = delLight(lighted);
	  	if (lighted == circlesList.lastElementChild.previousElementSibling ||
	  		lighted == circlesList.lastElementChild) {
			highLight(circlesList.lastElementChild.previousElementSibling);
			return;
		}
		highLight(lighted.nextElementSibling);
	};


	document.querySelector(".carousel").onclick = (event) => {
		let target = event.target, 
			num = target.dataset.ind;
		if(target.tagName !== "LI") return;	

		position = -WIDTH*(num-1);	
	    slider.style.marginLeft = position + 'px';

	    delLight(lighted);	
		highLight(target);
	};

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

/*export*/ function delLight(marker){	
	marker = circlesList.querySelector(".carousel__dot_highlight");		
	marker.classList.remove("carousel__dot_highlight");	

	return marker;
}

/*export*/ function highLight(marker){
	marker.classList.add("carousel__dot_highlight");
}


/*export*/ function init(arrOfObj){
	arrOfObj.forEach(obj => {
		slider.appendChild(createContainer(obj));		
	});
	
	circlesList = createCirclesList();
	carousel.appendChild(circlesList);
	
	lighted = circlesList.children[1];
	highLight(lighted);	
}

//window.onload = () => init(); /*addEventListener("load", init);// */
