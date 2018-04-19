export default class Basket{
	constructor(){
		console.log("basket created");
		this._quantity = +localStorage['counter'];		
		this._goods = JSON.parse(localStorage['objIds']);
		console.log(this._goods);
		this.totalPrice = 0;	
	}

    goodLoad(){
    	let container = document.querySelector(".table tbody");

		 for(let key in this._goods){
		 	let xhr = new XMLHttpRequest();
		 	xhr.open('GET', `../api/apps/package${key}.json`, true);
			xhr.send();				
			xhr.onload = () =>{
				this.goodInit(container, JSON.parse(xhr.responseText));	
				document.querySelector(".text_style_total").innerText = `$${Math.trunc(this.totalPrice)}`;
				let cent = String(this.totalPrice).split('.')[1];
				cent = cent.length == 1 ? `${cent}0` : cent;
				document.querySelector(".text_style_cent").innerText = cent;
			};
		 }		
    }

    goodInit(parent, jsonObj){
    	let tmplRow = document.querySelector(".tmpl-row"),
    		amount = this._goods[jsonObj.id],
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
		Array.from(tmplInner.querySelectorAll('.text_style_price'))[0].innerText = jsonObj.price;
		Array.from(tmplInner.querySelectorAll('.text_style_price'))[1].innerText = `$${jsonObj.price * amount}`;
		tmplInner.querySelector(".vote").innerText = amount;
		tmplInner.querySelector('.table__img').src = imgMap[jsonObj.guid];

		parent.appendChild(tmplInner);	

		this.totalPrice += jsonObj.price * amount;
    }

}