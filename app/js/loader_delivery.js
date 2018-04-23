import Animation from './class_animation.js';

window.onload = () =>{
	let anim = new Animation(document.body);

	document.querySelector('.button').onclick = (e) => {		
		e.preventDefault();
		
		anim.loadingAnimation().then(() => window.location = e.target.href);
	};
};
