//import Application from './class_application.js';
import Basket from './class_basket.js';

export default class Catalog{
	constructor(){
		console.log("catalog created");

		let ids = localStorage['objIds'];
		this.goods = ids ? JSON.parse(ids) : {};

		localStorage.removeItem('counter');
	}

	catalogInit(array){
	let tmpl = document.querySelector(".tmpl"),
		list = document.querySelector(".list_style_catalog"),
		tmplInner,
		pkgLink;

		array.forEach(app=>{
			tmplInner = tmpl.content.cloneNode(true);
			pkgLink = tmplInner.querySelector(".a-link");
			pkgLink.href = `../api/apps/package${app.id}.json`;
			pkgLink.innerText = app.title;
			list.appendChild(tmplInner);
		});
	}

	highLight(link){
		let lighted = document.querySelector(".a-link_style_active");	
		if (lighted) lighted.classList.remove("a-link_style_active");	
		link.classList.add("a-link_style_active");
	}

	appLoad(event){
		let container = document.querySelector(".page-wrapper__right-block"),
			target = event.target;
		//	app = new Application();
		if(target.tagName !== "A") return;	
		event.preventDefault();

		this.highLight(target);

		let xhrApp = new XMLHttpRequest();
		xhrApp.open('GET', target.href, true);
		xhrApp.send();
		xhrApp.onload = () =>{
			console.log(xhrApp.status);	
			container.innerHTML = "";		
			this.blockInit(container, JSON.parse(xhrApp.responseText)); 

			document.querySelector(".button").onclick = this.add2basket.bind(this);
		};		
	}

	blockInit(parent, object){ 
		this.objApp = object;
		let tmpApp = document.querySelector(".tmpl-app"),
			tmpAppItem = document.querySelector(".tmpl-app__list-elem"),
			tmpAppInner, tmpAppItemInner,
			imgMap = {
				123: "../assets/images/shot-1.png",
				122: "../assets/images/shot-2.png",
				124: "../assets/images/shot-3.png",
				125: "../assets/images/4.jpg",
				126: "../assets/images/5.jpg",
				127: "../assets/images/6.jpg",
				128: "../assets/images/7.jpg",
				111: "../assets/images/8.jpg",
				112: "../assets/images/9.jpg",
				110: "../assets/images/10.jpg",
				109: "../assets/images/11.jpg",
				100: "../assets/images/12.jpg",
				301: "../assets/images/1.jpg",
				302: "../assets/images/2.jpg"
			};
		tmpAppInner = tmpApp.content.cloneNode(true);
		tmpAppInner.querySelector('.headline__app').innerText = object.title;
		tmpAppInner.querySelector('.price').innerText = object.price;
		tmpAppInner.querySelector('.section__date').innerText = new Date(object.datetime).toLocaleDateString('ru-RU',{year: 'numeric', month: 'long', day: 'numeric' });
		tmpAppInner.querySelector('.application__img').src = imgMap[object.guid];
		tmpAppInner.querySelector('.text_style_app').innerText = object.description;
		tmpAppInner.querySelector('.application__requirements').innerText = object.requirements;		
	//	tmpAppInner.querySelector('.button').href = `#${object.id}`;

		object.features.forEach(feature => {
			tmpAppItemInner = tmpAppItem.content.cloneNode(true);
			tmpAppItemInner.querySelector('.text_style_paragraph').innerText = feature;

			tmpAppInner.querySelector('.application__list').appendChild(tmpAppItemInner);
		});

		parent.appendChild(tmpAppInner);
	}

	add2basket(event){
		event.preventDefault();
	//	console.log(event.target.href);
		let cnt = +document.querySelector('.counter').innerText;
		localStorage.setItem('counter', ++cnt);
		document.querySelector('.counter').innerText = localStorage['counter'];
		
		this.goods[this.objApp.id] = this.goods[this.objApp.id] + 1 || 1;
		console.log(this.goods);
		localStorage.setItem('objIds', JSON.stringify(this.goods));	
	}
	
}