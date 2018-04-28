import Animation from '../instances/class_animation.js';
import IStatusbar from '../interfaces/class_statusbar.js';
import IForm from '../interfaces/class_form.js';

window.onload = () =>{
	let form = new IForm(),
		anim = new Animation(document.body),
		progressbar = new IStatusbar();

	form.readData('shippingData');

	document.querySelector('.button').onclick = (e) => {		
		e.preventDefault();
	
		anim.loadingAnimation().then(() => window.location = e.target.href);
	};

	document.querySelector('.progress-bar__list').onclick = progressbar.previousStep;

	document.querySelector('.holder-form').onchange = () => form.saveData();
	
};
