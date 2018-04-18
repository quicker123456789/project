import Application from './class_application.js';

export default class Catalog{
	constructor(){
		console.log("catalog created");		
	//	this.app = new Application();
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

	static highLight(link){
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

		Catalog.highLight(target);

		let xhrApp = new XMLHttpRequest();
		xhrApp.open('GET', target.href, true);
		xhrApp.send();
		xhrApp.onload = () =>{
			console.log(xhrApp.status);	
			container.innerHTML = "";		
			Application.blockInit(container, JSON.parse(xhrApp.responseText)); 

			document.querySelector(".button").onclick = Application.binHandler;
		};		
	}
	
}