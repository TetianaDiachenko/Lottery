/* Checking webp support, adding a class webp or no-webp for HTML */
export function isWebp() {
	//Checking webp support
	function testWebp(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"	
	}
	//Adding a class webp or no-webp for HTML
	testWebp(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});	
}
