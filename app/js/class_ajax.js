export default class Ajax{
	constructor(){}

	static get(url){
		return new Promise(function(resolve, reject) {		   
		    let xhr = new XMLHttpRequest();
		    xhr.open('GET', url);

		    xhr.onload = function() {		      
		      if (xhr.status == 200) resolve(xhr.responseText);
		      
		      else reject(Error(xhr.statusText));
		    };
		    
		    xhr.onerror = function() {
		      reject(Error("Network Error"));
		    };
		    
		    xhr.send();
		});
	}
}


/*
get('story.json').then(function(response) {
  console.log("Success!", response);
}, function(error) {
  console.error("Failed!", error);
});
*/