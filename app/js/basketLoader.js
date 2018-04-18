import Basket from './class_basket.js';

let oneBasket = new Basket();

export function passBasket(){
	return oneBasket;
}

window.onload = () =>{
	let bb = passBasket();
	console.log(bb);
	bb.goodLoad();
}