function task1(){
	let allElem = document.querySelectorAll("*");
	let rand = Math.floor(Math.random() * allElem.length);
	allElem[rand].style.background = "#f00";
};

function task2(){
	let randColors = Math.floor(Math.random() * (255+1));	

	let allElem = document.querySelectorAll("*");
	let rand = Math.floor(Math.random() * allElem.length);
	allElem[rand].style.backgroundColor = "rgb("+Math.floor(Math.random() * (255+1))+","+Math.floor(Math.random() * (255+1))+","+Math.floor(Math.random() * (255+1))+")";
}



window.onload = function(){
	setInterval(task2, 2000);
};

