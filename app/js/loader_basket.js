import Basket from './class_basket.js';

window.onload = () =>{
	let oneBasket = new Basket();
//	console.log(oneBasket);
	oneBasket.productLoad();

	document.querySelector('.table').addEventListener("click", oneBasket.removeProduct.bind(oneBasket), true);
	document.querySelector('.table').addEventListener("click", oneBasket.addProduct.bind(oneBasket), true);
	
	
	localStorage.removeItem('counter');
	localStorage.removeItem('objIds');
}