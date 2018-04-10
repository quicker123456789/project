function createContainer(object) {
	let container = document.createElement("div"),
	img = document.createElement("img"),
	headline = document.createElement("div"),
	date = document.createElement("time");

	img.setAttribute("src", object.imgUrl);
	img.className = "main-block__img";
	headline.className = "headline section__headline";
	headline.innerText = object.description;
	date.className = "date section__date";
	date.innerText = object.datetime;

	container.className = "main-block__section section";
	container.appendChild(img);
	container.appendChild(headline);
	container.appendChild(date);

	return container;
}

let randomDigit = (limit) => Math.floor(Math.random() * limit);

window.onload = () => {	
	let mainBlock = document.querySelector(".main-block__slider"),
	arrayOfObj = [
		{
			imgUrl: "assets/lesson2/1.jpg",
			description: "пакет №1",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/2.jpg",
			description: "пакет №2",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/3.jpg",
			description: "пакет №3",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/4.jpg",
			description: "пакет №4",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/5.jpg",
			description: "пакет №5",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/6.jpg",
			description: "пакет №6",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/7.jpg",
			description: "пакет №7",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/8.jpg",
			description: "пакет №8",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/9.jpg",
			description: "пакет №9",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/10.jpg",
			description: "пакет №10",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/11.jpg",
			description: "пакет №11",
			datetime: "12-12-12"
		},
		{
			imgUrl: "assets/lesson2/12.jpg",
			description: "пакет №12",
			datetime: "12-12-12"
		}
	];
	
	for (var i = 0; i < 3; i++){
		let block = createContainer(arrayOfObj[randomDigit(12)]);
		mainBlock.appendChild(block);
	}
};