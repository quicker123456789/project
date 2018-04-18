export default class Basket{
	constructor(){
		console.log("basket created");
		this._quantity = 0;
		this._goods = {};
	}
	get quantity() {
        return this._quantity;
    }
    set quantity(count) {
        this._quantity = count; 
    }

    add2basket(objId) {
    	this._goods[objId.id] = this._goods[objId.id] + 1 || 1;    	
    	console.log(this._goods);
    }

    goodLoad(){
    	let xhr = new XMLHttpRequest(),
    		container = document.querySelector(".table");

		 for(let key in this._goods){
		 	xhr.open('GET', `../api/apps/package${key}.json`, true);
			xhr.send();
			xhr.onload = () =>{
				Basket.goodInit(container, JSON.parse(xhr.responseText));
			};
		 }
    }

    static goodInit(parent, jsonObj){
    	let tmplRow = document.querySelector(".tmpl-row"),
    		tmplInner,
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
		tmplInner = tmplRow.content.cloneNode(true);
		tmplInner.querySelector('.text_style_td').innerText = jsonObj.title;
		ArrayFrom(tmplInner.querySelectorAll('.text_style_price')).forEach(elem => 
			elem.innerText = `$${jsonObj.price}`);
				
		tmplInner.querySelector('.table__img').src = imgMap[jsonObj.guid];

		parent.appendChild(tmplInner);
    }

}