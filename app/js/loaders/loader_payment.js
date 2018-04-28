import Animation from '../instances/class_animation.js';
import IStatusbar from '../interfaces/class_statusbar.js';
import IForm from '../interfaces/class_form.js';

window.onload = () =>{
	let form = new IForm(),
		anim = new Animation(document.body),
		progressbar = new IStatusbar();

	form.readData('cardData');		

	document.querySelector('.basic-block__buy').onclick = (e) => {
		if(!e.target.classList.contains("button")) return;
		e.preventDefault();

		form.saveData();

		anim.loadingAnimation().then(() => window.location = e.target.href);
	};

	document.querySelector('.progress-bar__list').onclick = progressbar.previousStep;
};
