const WIDTH = 358;
let slider = document.querySelector(".main-block__slider"),	
	carousel = document.querySelector(".carousel"),
//	circlesList = document.querySelector(".carousel__circles"),
	arrayOfObj = [
		{
			imgUrl: "assets/images/shot-1.png",
			description: "стандартный пакет",
			datetime: "08 апреля 2012"
		},
		{
			imgUrl: "assets/images/shot-2.png",
			description: "стандартный пакет",
			datetime: "08 апреля 2012"
		},
		{
			imgUrl: "assets/images/shot-3.png",
			description: "стандартный пакет",
			datetime: "08 апреля 2012"
		},
		{
			imgUrl: "assets/images/4.jpg",
			description: "пакет №4",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/images/5.jpg",
			description: "пакет №5",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/images/6.jpg",
			description: "пакет №6",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/images/7.jpg",
			description: "пакет №7",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/images/8.jpg",
			description: "пакет №8",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/images/9.jpg",
			description: "пакет №9",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/images/10.jpg",
			description: "пакет №10",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/images/11.jpg",
			description: "пакет №11",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/images/12.jpg",
			description: "пакет №12",
			datetime: "12-12-12"
		}
	],
	circlesList,
	len = arrayOfObj.length,
	position = 0,	
	lighted;	


function createContainer(object) {
	let container = document.createElement("div"),
	img = document.createElement("img"),
	headline = document.createElement("div"),
	date = document.createElement("time");

	img.setAttribute("src", object.imgUrl);
	img.className = "main-block__img";
	headline.className = "headline section__headline";
	headline.innerText = object.description;
	date.className = "date section__date";
	date.innerText = object.datetime;

	container.className = "main-block__section section";
	container.appendChild(img);
	container.appendChild(headline);
	container.appendChild(date);

	return container;
}

function createCircle(){
	let circle = document.createElement("li");
	circle.className = "carousel__dot";

	return circle;
}

function createCirclesList(){
	let list = document.createElement("ul");
	list.className = "list carousel__circles clearfix";

	Array.from(slider.children).forEach((child, i) =>{
	//	let dot = createCircle();
		let dot = document.createElement("li");
		dot.className = "carousel__dot";

		dot.setAttribute("data-ind", i);
		list.appendChild(dot);
	});

	return list;
}

function delLight(marker){	
	marker = circlesList.querySelector(".carousel__dot_highlight");		
	marker.classList.remove("carousel__dot_highlight");	

	return marker;
}

function highLight(marker){
	marker.classList.add("carousel__dot_highlight");
}

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
	position = Math.max(position - WIDTH, -WIDTH * (len-3));	
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

function init(){
	arrayOfObj.forEach(obj => {
		slider.appendChild(createContainer(obj));		
	});
	
	circlesList = createCirclesList();

	carousel.appendChild(circlesList);
	/*[].forEach.call(slider.children, (child, i) => {
		let dot = createCircle();
		dot.setAttribute("data-ind", i);
		circlesList.appendChild(dot);
	});*/

	lighted = circlesList.children[1];
	highLight(lighted);	
}

window.onload = () => init(); /*addEventListener("load", init);// */
