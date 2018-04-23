import Animation from './class_animation.js';

window.onload = () =>{
	let anim = new Animation(document.body);

	document.querySelector('.basic-block__buy').onclick = (e) => {
		if(!e.target.classList.contains("button")) return;
		e.preventDefault();
		
		anim.loadingAnimation().then(() => window.location = e.target.href);

	};
};


