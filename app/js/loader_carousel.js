import Carousel from './class_carousel.js';
import Ajax from './class_ajax.js';

document.querySelector('.counter').innerText = localStorage['counter'] || 0;

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


