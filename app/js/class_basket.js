import Ajax from './class_ajax.js';

export default class Basket{
	constructor(){
		console.log("basket created");
		this._quantity = 0;
		this._goods = {};

		try{
			this._goods = JSON.parse(localStorage['objIds']);
			this._quantity = +localStorage['counter'];
		}catch(e){
			console.log("basket is empty");
		}

		console.log(this._goods);
		this.totalPrice = 0;	

	//	this.productLoad();
	}

	get quantity(){
		return this._quantity;
	}

	_responeHandler(response){
		let container = document.querySelector(".table tbody");
		this._productInit(container, JSON.parse(response));			
		this._totalPriceInsert(this.totalPrice);
	}

    productLoad(){    	
    	let arrayPromises = [];

    	if (!Object.keys(this._goods).length) this._noGoods();
		 Object.keys(this._goods).forEach(key => arrayPromises.push(Ajax.get(`../api/apps/package${key}.json`)));

		 Promise.all(arrayPromises)
		 		.then(responses => responses.forEach(this._responeHandler.bind(this)))
				.catch(function(error) {
				  	console.error("Failed!", error);
				});
    }

    _productInit(parent, jsonObj){
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
		tmplInner.querySelector('[type="checkbox"]').id = jsonObj.id;
		tmplInner.querySelector('label').setAttribute("for", jsonObj.id);
		tmplInner.querySelector('.text_style_td').innerText = jsonObj.title;
		tmplInner.querySelectorAll('.text_style_price')[0].innerText = `$${jsonObj.price}`;
		tmplInner.querySelectorAll('.text_style_price')[1].innerText = `$${(jsonObj.price * amount).toFixed(2)}`;
		tmplInner.querySelector(".vote").innerText = amount;
		tmplInner.querySelector('.table__img').src = imgMap[jsonObj.guid];

		parent.appendChild(tmplInner);	

		this.totalPrice += jsonObj.price * amount;
    }

    _totalPriceInsert(number){
    	document.querySelector(".text_style_total").innerText = `$${Math.trunc(number)}`;
		number = number.toFixed(2);

		let cent = String(number).split('.')[1];		
		document.querySelector(".text_style_cent").innerText = cent;
    }

    _sumPriceInsert(money, parent){    	
    	money = money.toFixed(2);
    	parent.querySelectorAll('.text_style_price')[1].innerText = `$${money}`;
    }

    _noGoods(){
    	let orderButton = document.querySelector(".button");		
		orderButton.onclick = () =>  false;
		orderButton.classList.remove("button_style_blue");
		orderButton.classList.add("button_style_disable");
    }

    _productIncrease(parent, sign, sump, prodp, quantity){ 
    	parent.querySelector(".vote").innerText = quantity += sign;
    	sump += sign*prodp;
		this.totalPrice += sign*prodp;

		this._sumPriceInsert(sump, parent);    		
		this._totalPriceInsert(this.totalPrice);

		this._quantity += sign;
		this._goods[+parent.dataset.id] += sign;
		this._localStorageWriter({'counter': this._quantity, 'objIds': JSON.stringify(this._goods)});
    }

    _deleteProduct(parent, sump){    	
		parent.parentNode.removeChild(parent);
		delete this._goods[+parent.dataset.id];

		this.totalPrice -= sump;
		this._totalPriceInsert(this.totalPrice);

		let prodAmount = +parent.querySelector(".vote").innerText;
		this._quantity -= prodAmount;

		this._localStorageWriter({'counter': this._quantity, 'objIds': JSON.stringify(this._goods)});
    }

    add2cart(prodId){ 	
    	this._goods[prodId] = this._goods[prodId] + 1 || 1;
		this._quantity++;

		this._localStorageWriter({'counter': this._quantity, 'objIds': JSON.stringify(this._goods)});	
    }

    _localStorageWriter(properties){
    	for (let field in properties)
    		localStorage.setItem(field, properties[field]);    	
    }

    productHandler(event){
    	let row = event.target.closest('.table__r'),
    		productAmount = +row.querySelector(".vote").innerText,
    		productPrice = +row.querySelectorAll('.text_style_price')[0].innerText.slice(1),
    		sumPrice = +row.querySelectorAll('.text_style_price')[1].innerText.slice(1);

    	if(event.target.classList.contains("icon__delete")) {
    		this._deleteProduct(row, sumPrice);
    	}

    	if(event.target.classList.contains("rating__sym-ball_left")){
    		if (productAmount == 1) return false;
    		this._productIncrease(row, -1, sumPrice, productPrice, productAmount);			
    	}

    	if(event.target.classList.contains("rating__sym-ball_right")){  
    		this._productIncrease(row, 1, sumPrice, productPrice, productAmount);    	
    	}

    	if (!Object.keys(this._goods).length) this._noGoods();
    }   

}