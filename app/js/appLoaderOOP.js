import Catalog from './class_catalog.js';
//import Application from './class_application.js';

window.onload = () => {
	let mainCatalog = new Catalog(),		
		xhr = new XMLHttpRequest();
	xhr.open('GET', '../api/app_packages.json', true);
	xhr.send();
	xhr.onload = function() {		
		mainCatalog.catalogInit(JSON.parse(this.responseText));
		document.querySelector(".list_style_catalog").addEventListener("click", mainCatalog.appLoad, true);	

		// нужное приложение при загрузке
		let id = location.search.split('=')[1];
		id = id ? id : 1;
		document.querySelectorAll(".a-link_style_catalog")[id-1].click();
	};

};