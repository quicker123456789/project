export default class Form{
	constructor(){
		this._formData = {};
		this._formInput = document.querySelectorAll('input[type="text"]');

	}

	readData(localStorageForm){
		this._localStorageForm = localStorageForm;
		try{
			this._formData = JSON.parse(localStorage[localStorageForm]);
			this._fillForm();
		}catch(e){
			console.log("form is not filled");
		}
	}

	saveData(){
		Array.from(this._formInput).forEach(field => {
			this._formData[field.className] = field.value;
		});
		localStorage.setItem(this._localStorageForm, JSON.stringify(this._formData));
	}

	_fillForm(){
		Array.from(this._formInput).forEach(field => {
			field.value = this._formData[field.className];
		});
	}
}