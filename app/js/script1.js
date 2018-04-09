const allElem = document.querySelectorAll("*");
let rand, randElem, changed=[];

function randColor(){
	return Math.floor(Math.random() * (256));
}

function task1(){
	rand =  Math.floor(Math.random() * allElem.length);
	allElem[rand].style.background = "#f00";
};


function highlight(){
	rand =  Math.floor(Math.random() * allElem.length);
	randElem = allElem[rand];
	let r = randColor(), g = randColor(), b = randColor();
	
	randElem.style.backgroundColor = ["rgb(", r, g, b, ")"].join("+");
	changed.push(randElem);
}

function reHighlight(){
	changed.shift().style.backgroundColor = "";
}



window.onload = function(){
	setInterval(highlight, 1000);
	setInterval(reHighlight, 1500);
};

