import Basket from './class_basket.js';

window.onload = () =>{
	let oneBasket = new Basket();
//	console.log(oneBasket);
	oneBasket._productLoad();

	document.querySelector('.table').addEventListener("click", oneBasket.productHandler.bind(oneBasket), true);
}