const n = "pic/dummy.png";	//no disc
const k = "pic/kuro.png";	//kuro
const s = "pic/siro.png";	//shiro

var disc = [];
for(var i = 1; i < 9; i++) {
	disc[i] = [];
	for (var j = 1; j < 9; j++) {
		disc[i][j] = document.createElement("img");
		disc[i][j].id = "d" + i + j;
		disc[i][j].value = i*10 + j;
		disc[i][j].src = n;
		disc[i][j].onclick = "change(this.value)";
		disc[i][j].style = "top:" + ((i-1)*5+0.2) + "em; left:" + ((j-1)*5+0.2) + "em;";
		document.getElementById("disc").appendChild(disc[i][j]);
	}
}

disc[4][4].src = s;
disc[4][5].src = k;
disc[5][4].src = k;
disc[5][5].src = s;

function change(disc){

	console.log(disc);

	/*var a = x;
	var b = y;

	do{
		a = a+1;
		if(a>7){break;}
	}while(disc[1][1].src != disc[1][1].src);
	if(a<8){
		do{
			a = a-1;
			if(true){
				changeK(a, b);
			}else{
				changeS(a, b);
			}
		}while(a == x);
	}*/
}

function changeK(x, y){
	disc[1][1].src = k;
}

function changeS(x, y){
	disc[1][1].src = s;
}






