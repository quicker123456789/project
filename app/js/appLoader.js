let xhr = new XMLHttpRequest(),
	guidMap = {
		899: "../assets/images/shot.png"
	};
xhr.open('GET', '../api/catalog_package.json', true);
xhr.send();
xhr.onload = function() {
	let obj = JSON.parse(this.responseText);
	catalogInit(obj);

	document.querySelector(".list_style_catalog").addEventListener("click", appLoad, true);
};

function catalogInit(object){
	let tmpl = document.querySelector(".tmpl"),
		list = document.createElement("ul"),
		tmplInner,
		pcgLink;

	list.className = "list_style_catalog";

	for(let key in object) {
		tmplInner = tmpl.content.cloneNode(true);
		pkgLink = tmplInner.querySelector(".a-link");
		pkgLink.href = `../api/apps/${key}`;
		pkgLink.innerText = object[key];
		list.appendChild(tmplInner);
	}

	document.querySelector(".catalog").appendChild(list);
}

function appLoad(event){
	let target = event.target;
	if(target.tagName !== "A") return;	

	event.preventDefault();
	highLight(target);

	let xhrApp = new XMLHttpRequest();
	xhrApp.open('GET', target.href, true);
	xhrApp.send();
	xhrApp.onload = () =>{
		console.log(xhrApp.status);		
		blockBuilder(JSON.parse(xhrApp.responseText));
	};
}

function highLight(elem){
	let lighted = elem.parentElement.parentElement.querySelector(".a-link_style_active");	
	if (lighted) lighted.classList.remove("a-link_style_active");	
	elem.classList.add("a-link_style_active");
}

function blockBuilder(object){
	let container = document.querySelector("page-wrapper__right-block");

	container.appendChild(object);
}