/*
function blockBuilder(parent, object){
	let	currentElem;

	for (let node in object){
		switch(node){
			case "tag": currentElem = document.createElement(object[node]);			
			break;
			case "class": currentElem.className = object[node];
			break;			
			case "children": object[node].forEach(nodeElem => blockBuilder(currentElem, nodeElem));
			break;
			case "html": currentElem.innerText = object[node];
			break;
			case "guid": currentElem.src = imgMap[object[node]];
			break;
			case "ms": currentElem.innerText = new Date(object[node]).toLocaleDateString('ru-RU',{year: 'numeric', month: 'long', day: 'numeric' });
			break;

			default: currentElem.setAttribute(node, object[node]);
			break;
		}
	}
	parent.appendChild(currentElem);
}*/
function catalogInit(array){
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

function appLoad(event){
	let container = document.querySelector(".page-wrapper__right-block"),
		target = event.target;
	if(target.tagName !== "A") return;	

	event.preventDefault();
	highLight(target);

	let xhrApp = new XMLHttpRequest();
	xhrApp.open('GET', target.href, true);
	xhrApp.send();
	xhrApp.onload = () =>{
		console.log(xhrApp.status);	
		container.innerHTML = "";
		//blockBuilder(container, JSON.parse(xhrApp.responseText));
		blockInit(container, JSON.parse(xhrApp.responseText));
	};
}

function highLight(elem){
	let lighted = document.querySelector(".a-link_style_active");	
	if (lighted) lighted.classList.remove("a-link_style_active");	
	elem.classList.add("a-link_style_active");
}

function blockInit(parent, object){
	let tmpApp = document.querySelector(".tmpl-app"),
		tmpAppItem = document.querySelector(".tmpl-app__list-elem"),
		tmpAppInner, tmpAppItemInner,
		imgMap = {
		123: "../assets/images/shot-1.png",
		122: "../assets/images/shot-2.png",
		124: "../assets/images/shot-3.png",
		125: "../assets/images/4.jpg",
		126: "../assets/images/5.jpg",
		127: "../assets/images/6.jpg",
		128: "../assets/images/7.jpg",
		111: "../assets/images/8.jpg",
		112: "../assets/images/9.jpg",
		110: "../assets/images/10.jpg",
		109: "../assets/images/11.jpg",
		100: "../assets/images/12.jpg",
		301: "../assets/images/1.jpg",
		302: "../assets/images/2.jpg"
	};
	tmpAppInner = tmpApp.content.cloneNode(true);
	tmpAppInner.querySelector('.headline__app').innerText = object.title;
	tmpAppInner.querySelector('.price').innerText = object.price;
	tmpAppInner.querySelector('.section__date').innerText = new Date(object.datetime).toLocaleDateString('ru-RU',{year: 'numeric', month: 'long', day: 'numeric' });
	tmpAppInner.querySelector('.application__img').src = imgMap[object.guid];
	tmpAppInner.querySelector('.text_style_app').innerText = object.description;
	tmpAppInner.querySelector('.application__requirements').innerText = object.requirements;

	object.features.forEach(feature => {
		tmpAppItemInner = tmpAppItem.content.cloneNode(true);
		tmpAppItemInner.querySelector('.text_style_paragraph').innerText = feature;

		tmpAppInner.querySelector('.application__list').appendChild(tmpAppItemInner);
	});

	parent.appendChild(tmpAppInner);
}

window.onload = () => {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '../api/app_packages.json', true);
	xhr.send();
	xhr.onload = function() {		
		catalogInit(JSON.parse(this.responseText));
		document.querySelector(".list_style_catalog").addEventListener("click", appLoad, true);	
				
		// нужное приложение при загрузке
		let id = location.search.split('=')[1];
		id = id ? id : 1;
		document.querySelectorAll(".a-link_style_catalog")[id-1].click();
	};		
};