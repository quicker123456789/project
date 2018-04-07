const allElem = document.querySelectorAll("*");
let rand;
let randElem, changed=[], poped;

function task1(){
	rand =  Math.floor(Math.random() * allElem.length);
	allElem[rand].style.background = "#f00";
};


function task2(){
	rand =  Math.floor(Math.random() * allElem.length);
	randElem = allElem[rand];
	let r = Math.floor(Math.random() * (255+1));
	let g = Math.floor(Math.random() * (255+1));
	let b = Math.floor(Math.random() * (255+1));


	randElem.style.backgroundColor = "rgb("+ r + "," + g + "," + b + ")";
	changed.push(randElem);
}

function task3(){
//	poped = changed.shift();
	changed.shift().style.backgroundColor = "";
}



window.onload = function(){
	setInterval(task2, 1000);
	setInterval(task3, 1500);
};

