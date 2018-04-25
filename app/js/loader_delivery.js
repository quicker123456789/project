import Animation from './class_animation.js';
import Statusbar from './class_statusbar.js';
import Form from './class_form.js';

window.onload = () =>{
	let form = new Form(),
		anim = new Animation(document.body),
		progressbar = new Statusbar();

	form.readData('shippingData');

	document.querySelector('.button').onclick = (e) => {		
		e.preventDefault();
	
		anim.loadingAnimation().then(() => window.location = e.target.href);
	};

	document.querySelector('.progress-bar__list').onclick = progressbar.previousStep;

	document.querySelector('.holder-form').onchange = () => form.saveData();
	
};
