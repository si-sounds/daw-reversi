function callScript() {
	hobj = new XMLHttpRequest();
	hobj.open("get","script.js");
	hobj.send(null);
	hobj.onreadystatechange = function(){
		var str = document.createElement("script");
		if((hobj.readyState == 4) && (hobj.status == 200)){
			str.innerHTML = hobj.responseText;
			document.head.appendChild(str);
		}	
	}
}