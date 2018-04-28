export default class IStatusbar{
	constructor(){
		Array.from(document.querySelectorAll(".progress-bar__level_status_done"))
			 .forEach((step, ind) => step.setAttribute("data-step", ind+1));
	}

	previousStep(e){
		if(!e.target.classList.contains("progress-bar__level_status_done")) return;
		window.location = `../bin/step ${e.target.dataset.step}.html`;
	}
}