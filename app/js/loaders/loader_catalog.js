import Catalog from '../instances/class_catalog.js';
import Ajax from '../interfaces/class_ajax.js';
import Basket from '../instances/class_basket.js';

document.querySelector('.counter').innerText = new Basket().quantity;//localStorage['counter'] || 0;

window.onload = () => {
	let mainCatalog = new Catalog();
	Ajax.get('../api/app_packages.json')
		.then(function(response) {		 	
		 	mainCatalog.catalogInit(JSON.parse(response));
		 	document.querySelector(".list_style_catalog").addEventListener("click", mainCatalog.appLoad.bind(mainCatalog), true);
			// нужное приложение при загрузке
	 		let id = location.search.split('=')[1];
			id = id ? id : 1;
			document.querySelectorAll(".a-link_style_catalog")[id-1].click();
		})
		.catch(function(error) {
		  	console.error("Failed!", error);
		});
};