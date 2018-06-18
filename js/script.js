const n = "pic/dummy.png";	//no disc
const k = "pic/kuro.png";	//kuro
const s = "pic/siro.png";	//shiro

var turn = k;

var disc = [];
for(var i = 1; i < 9; i++) {
	disc[i] = [];
	for (var j = 1; j < 9; j++) {
		disc[i][j] = document.createElement("img");
		disc[i][j].id = "d" + i + j;
		disc[i][j].src = n;
		disc[i][j].addEventListener("click", change(i,j));
		disc[i][j].style = "top:" + ((i-1)*5+0.2) + "em; left:" + ((j-1)*5+0.2) + "em;";
		document.getElementById("disc").appendChild(disc[i][j]);
	}
}

disc[4][4].src = s;
disc[4][5].src = k;
disc[5][4].src = k;
disc[5][5].src = s;



function change(x, y){
	return function(){
		console.log(x,y);
		var a = x;
		var b = y;
		do{
			a = a+1;
			if(a>8){break;}
		}while(disc[a][b].src != disc[x][y].src);
		if(a<8){
			do{
				a = a-1;
				if(turn == k){
					changeK(a, b);
				}else{
					changeS(a, b);
				}
			}while(a == x);
		}
	}

}

function changeK(x, y){
	disc[x][y].src = k;
}

function changeS(x, y){
	disc[x][y].src = s;
}
