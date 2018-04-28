import Application from './class_application.js';

export default class Catalog{
	constructor(){
		console.log("catalog created");	
	}

	catalogInit(array){
	let tmpl = document.querySelector(".tmpl"),
		list = document.querySelector(".list_style_catalog"),
		tmplInner,
		pkgLink;

		array.forEach(app => {
			tmplInner = tmpl.content.cloneNode(true);
			pkgLink = tmplInner.querySelector(".a-link");
			pkgLink.href = `../api/apps/package${app.id}.json`;
			pkgLink.innerText = app.title;
			list.appendChild(tmplInner);
		});
	}

	_highLight(link){
		let lighted = document.querySelector(".a-link_style_active");	
		if (lighted) lighted.classList.remove("a-link_style_active");	
		link.classList.add("a-link_style_active");
	}

	appLoad(event){
		let target = event.target;
		if(target.tagName !== "A") return;	
		event.preventDefault();

		this._highLight(target);

		this.appl = new Application(target);	
	}	
	
}