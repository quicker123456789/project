import Carousel from './class_carousel.js';
import Ajax from './class_ajax.js';
import Basket from './class_basket.js';

document.querySelector('.counter').innerText = new Basket().quantity;//localStorage['counter'] || 0;

window.onload = () =>{	
	let carousel = new Carousel();
	Ajax.get('api/app_packages.json')
		.then(function(response) {
		 	carousel.carouselInit(JSON.parse(response));
		})
		.catch(function(error) {
		  	console.error("Failed!", error);
		});
}


