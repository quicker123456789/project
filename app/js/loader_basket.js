import Basket from './class_basket.js';

window.onload = () =>{
	let oneBasket = new Basket();
//	console.log(oneBasket);
	oneBasket.goodLoad();

	localStorage.removeItem('counter');
	localStorage.removeItem('objIds');
}