export default class Animation{
	constructor(parent){
		this.parent = parent;
	}

	loadingAnimation(){
		let animContainer = document.createElement('div'),
			circlesContainer = document.createElement('div'),
			circleG;
		for(let i=1; i<9; i++){
			circleG = document.createElement('div');
			circleG.className = "f_circleG";
			circleG.id = `frotateG_0${i}`;
			circlesContainer.appendChild(circleG);
		}
		circlesContainer.className = "floatingCirclesAnimation";
		animContainer.className = "loading-animation__container";
		animContainer.appendChild(circlesContainer);
		this.parent.appendChild(animContainer);

		return new Promise(function (resolve, rejected) {
	       
	        setTimeout ( 
	            function() {
	                resolve();
	            }, 
	            Math.random()*3000
	        )
	    });
	}
}