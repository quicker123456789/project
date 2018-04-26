import Carousel from './class_carousel.js';
import Ajax from './class_ajax.js';
import Basket from './class_basket.js';

document.querySelector('.counter').innerText = new Basket().quantity;//localStorage['counter'] || 0;

window.onload = () =>{	
	let carousel = new Carousel();

	Ajax.get('api/app_packages.json')
		.then(function(response) {
		 	carousel.carouselInit(JSON.parse(response));

		 	document.querySelector(".arrow__left").onclick = carousel.move.bind(carousel);
		 	document.querySelector(".arrow__right").onclick = carousel.move.bind(carousel);
		 	carousel.circlesList.onclick = carousel.circlesHandler.bind(carousel);
		})
		.catch(function(error) {
		  	console.error("Failed!", error);
		});
}


