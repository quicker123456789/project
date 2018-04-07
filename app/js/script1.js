function task1(){
	let allElem = document.querySelectorAll("*");
	let rand = Math.floor(Math.random() * allElem.length);
	allElem[rand].style.background = "#f00";
};

const allElem = document.querySelectorAll("*");
let rand;
let randElem, changed=[], poped;

function task2(){
	rand =  Math.floor(Math.random() * allElem.length);
	randElem = allElem[rand];
	randElem.style.backgroundColor = "rgb("+Math.floor(Math.random() * (255+1))+","+Math.floor(Math.random() * (255+1))+","+Math.floor(Math.random() * (255+1))+")";
	changed.push(randElem);
}

function task3(){
	poped = changed.shift();
	poped.style.backgroundColor = "";
}



window.onload = function(){
	let intervalId = setInterval(task2, 1000);	
	setInterval(task3, 1500);
};

