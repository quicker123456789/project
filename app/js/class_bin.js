export default class Bin{
	constructor(){
		console.log("bin created");
		this._quantity = 0;
	}
	get quantity() {
        return this._quantity;
    }
    set quantity(count) {
        this._quantity = count; 
    }
}