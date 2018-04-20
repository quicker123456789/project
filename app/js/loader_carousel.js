import Carousel from './class_carousel.js';

document.querySelector('.counter').innerText = localStorage['counter'] || 0;

window.onload = () =>{	
	let carousel = new Carousel(),
		xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/app_packages.json', true);
	xhr.send();
	xhr.onload = function() {	
		carousel.carouselInit(JSON.parse(this.responseText));	
	};
}