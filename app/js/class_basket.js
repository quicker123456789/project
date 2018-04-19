export default class Basket{
	constructor(){
		console.log("basket created");
		this._quantity = +localStorage['counter'];

		let ids = localStorage['objIds'];
		this._goods = ids ? JSON.parse(ids) : {};

		console.log(this._goods);
		this.totalPrice = 0;	
	}

    productLoad(){
    	let container = document.querySelector(".table tbody");
    	if (!Object.keys(this._goods).length) this.noGoods();
		for(let key in this._goods){
			let xhr = new XMLHttpRequest();
		 	xhr.open('GET', `../api/apps/package${key}.json`, true);
			xhr.send();				
			xhr.onload = () =>{
				this.productInit(container, JSON.parse(xhr.responseText));	
				this.totalPriceInsert(this.totalPrice);
			};
		 }		
    }

    productInit(parent, jsonObj){
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
		tmplInner.querySelector('.table__r').setAttribute("data-id", jsonObj.id);
		tmplInner.querySelector('.text_style_td').innerText = jsonObj.title;
		tmplInner.querySelectorAll('.text_style_price')[0].innerText = jsonObj.price;
		tmplInner.querySelectorAll('.text_style_price')[1].innerText = `$${jsonObj.price * amount}`;
		tmplInner.querySelector(".vote").innerText = amount;
		tmplInner.querySelector('.table__img').src = imgMap[jsonObj.guid];

		parent.appendChild(tmplInner);	

		this.totalPrice += jsonObj.price * amount;
    }

    totalPriceInsert(number){
    	document.querySelector(".text_style_total").innerText = `$${Math.trunc(number)}`;
		number = number.toFixed(2);

		let cent = String(number).split('.')[1];
		if (cent) cent = cent.length == 1 ? `${cent}0` : Math.floor(cent);
		else cent = '00';
		document.querySelector(".text_style_cent").innerText = cent;
    }

    noGoods(){
    	let orderButton = document.querySelector(".button");		
		orderButton.onclick = ()=>{return false};
		orderButton.classList.remove("button_style_blue");
		orderButton.classList.add("button_style_white");		
    }

    addProduct(){
    	
    }

    removeProduct(e){
    	if(!e.target.classList.contains("icon__delete")) return;    	
    	let row = e.target.closest('.table__r');
    	row.parentNode.removeChild(row);

    	delete this._goods[+row.dataset.id];
    	let productPrice = +row.querySelectorAll('.text_style_price')[1].innerText.slice(1);    	
    	this.totalPrice -= productPrice;    	
    	this.totalPriceInsert(this.totalPrice);

    	if (!Object.keys(this._goods).length) this.noGoods();
    }

}