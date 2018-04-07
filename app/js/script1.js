function task1(){
	var allElem = document.querySelectorAll("*");
	var rand = Math.floor(Math.random() * allElem.length);
	allElem[rand].style.background = "#f00";
};

window.onload = task1;