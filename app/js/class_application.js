import Basket from './class_basket.js';
import Ajax from './class_ajax.js';

export default class Application{
	constructor(target){
		console.log("app created");
		
		this.cart = new Basket();
		this._init(target);
	}

	_init(target){
		let container = document.querySelector(".page-wrapper__right-block");		
		Ajax.get(target.href)
			.then(this._responeHandler.bind(this))
			.catch(function(error) {
			  	console.error("Failed!", error);
			});
	}

	_responeHandler(response){
		let container = document.querySelector(".page-wrapper__right-block");
		container.innerHTML = "";
		this._blockInit(container, JSON.parse(response));		 	
		document.querySelector(".button").onclick = this._add2basketHandler.bind(this);
	}

	_blockInit(parent, object){ 
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
	
		object.features.forEach(feature => {
			tmpAppItemInner = tmpAppItem.content.cloneNode(true);
			tmpAppItemInner.querySelector('.text_style_paragraph').innerText = feature;

			tmpAppInner.querySelector('.application__list').appendChild(tmpAppItemInner);
		});

		parent.appendChild(tmpAppInner);
	}

	_add2basketHandler(event){
		event.preventDefault();

		this.cart.add2cart(this.objApp.id);
		document.querySelector('.counter').innerText = this.cart.quantity;		
		console.log(this.cart._goods);
	}
} 