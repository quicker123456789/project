export default class Carousel{
	constructor(){
		console.log("Carousel built");
		this.WIDTH = 360;
		this.slider = document.querySelector(".main-block__slider");
		this.circlesList = document.querySelector('.carousel__circles');
		this.position = 0;		
	}

	carouselInit(arrOfObj){
		arrOfObj.forEach(obj => {
			this.createContainer(this.slider, obj);
		});

		this.createCirclesList();
		this.lighted = this.highLight(this.circlesList.children[1]);

		document.querySelector(".arrow__left").onclick = this.move.bind(this);
		document.querySelector(".arrow__right").onclick = this.move.bind(this);

		this.circlesList.onclick = (event) => {
			let target = event.target, 
				num = target.dataset.ind;
			if(target.tagName !== "LI") return;	

			this.position = -this.WIDTH*(num-1);	
		    this.slider.style.marginLeft = this.position + 'px';
		    
			this.lighted = this.highLight(target);
		};
	}

	highLight(marker){
		let marked = document.querySelector(".carousel__dot_highlight");		
		if (marked) marked.classList.remove("carousel__dot_highlight");	
		marker.classList.add("carousel__dot_highlight");

		return marker;
	}

	createCirclesList(){
		Array.from(this.slider.children).forEach((child, i) =>{
			let dot = document.createElement("li");
			dot.className = "carousel__dot";

			dot.setAttribute("data-ind", i);
			this.circlesList.appendChild(dot);
		});	
	}

	createContainer(parent, object) {
		let container = document.createElement("div"),
		img = document.createElement("img"),
		headline = document.createElement("div"),
		link = document.createElement("a"),
		date = document.createElement("time"),
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
			100: "assets/images/12.jpg",
			301: "assets/images/1.jpg",
			302: "assets/images/2.jpg"
		};

		img.setAttribute("src", imgMap[object.guid]);
		img.className = "main-block__img";	
		link.className = "a-link headline";
		link.innerText = object.title;
		link.href = `catalog/main catalog.html?id=${object.id}`;
		headline.className = "headline section__headline";
		headline.appendChild(link);
		date.className = "date section__date";
		date.innerText = new Date(object.datetime).toLocaleDateString('ru-RU',{year: 'numeric', month: 'long', day: 'numeric' });

		container.className = "main-block__section section";
		container.appendChild(img);
		container.appendChild(headline);
		container.appendChild(date);

		parent.appendChild(container);
	}

	lt(first, second, deflt, lite){	
		(lite == first || lite == second)? this.highLight(second) : lite = this.highLight(deflt);
		
		return lite;
	}

	move(event){ 
		let first = this.circlesList.firstElementChild,
			second = this.circlesList.children[1],
			prev = this.circlesList.lastElementChild.previousElementSibling,
			last = this.circlesList.lastElementChild;

		if (event.currentTarget.classList.contains("arrow__right")){
			this.position = Math.max(this.position - this.WIDTH, -this.WIDTH * (this.slider.children.length-3));

			this.lighted = this.lt(last, prev, this.lighted.nextElementSibling, this.lighted);		

		} else {
			this.position = Math.min(this.position + this.WIDTH, 0);

			this.lighted = this.lt(first, second ,this.lighted.previousElementSibling, this.lighted);		
		}
		
		this.slider.style.marginLeft = this.position + 'px';
	}

}