let xhr = new XMLHttpRequest();
xhr.open('GET', '../api/catalog_package.json', true);
xhr.send();
xhr.onload = function() {
	let obj = JSON.parse(this.responseText),
		list = document.createElement("ul");
	list.className = "list_style_catalog";

	for(let key in obj) {
		list.appendChild(createCatalogElem(obj[key]));
	}

	document.querySelector(".catalog").appendChild(list);
}

function createCatalogElem(value){	
	let elem = document.createElement("li"),
		aLink = document.createElement("a");
	elem.className = "catalog__element";
	aLink.className = "a-link a-link_style_catalog";
	aLink.innerText = value;
	elem.appendChild(aLink);

	return elem;
}