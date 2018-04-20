import Basket from './class_basket.js';

window.onload = () =>{
	let oneBasket = new Basket();
//	console.log(oneBasket);
	oneBasket.productLoad();

	document.querySelector('.table').addEventListener("click", oneBasket.productHandler.bind(oneBasket), true);
	
	/*вставить при завершении покупки*/
	localStorage.removeItem('counter');
	localStorage.removeItem('objIds');
}