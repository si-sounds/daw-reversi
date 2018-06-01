const n = "pic/dummy.png";	//no disc
const k = "pic/kuro.png";	//kuro
const s = "pic/siro.png";	//shiro

var turn = "●"; //黒から
var turnNum = 1;

var disc = [];
for(var i = 1; i < 9; i++) {
	disc[i] = [];
	for (var j = 1; j < 9; j++) {
		disc[i][j] = document.createElement("img");
		disc[i][j].id = "d" + i + j;
		disc[i][j].value = i*10 + j;
		disc[i][j].src = n;
		disc[i][j].onclick = change(disc[i][j].value);
		disc[i][j].style = "top:" + ((i-1)*5+0.2) + "em; left:" + ((j-1)*5+0.2) + "em;";
		document.getElementById("disc").appendChild(disc[i][j]);
	}
}

disc[4][4].src = s;
disc[4][5].src = k;
disc[5][4].src = k;
disc[5][5].src = s;

function change(coordinates){
	return function(){
		var x = (coordinates-coordinates%10)/10;
		var y = coordinates%10;
		if(disc[x][y].getAttribute("src") != n){return;}
		console.log(turnNum + "手目:" + turn + " "+ x + " " + y);


		if(turn == "●"){
			changeK(x, y);
		}else{
			changeS(x, y);
		}

		if(turn == "●"){
			turn = "○";
		}else{
			turn = "●";
		}
		turnNum++;

		/*
		do{
			a = a+1;
			if(a>8){break;}
		}while(disc[a][b].src != disc[x][y].src);

		if(a<9){
			do{
				a = a-1;
				if(turn){
					changeS(a, b);
				}else{
					changeK(a, b);
				}
			}while(a == x);
		}

		if(turn){
			turn = 0;
		}else{
			turn = 1;
		}*/
	};


}

function changeK(x, y){
	disc[x][y].src = k;
}

function changeS(x, y){
	disc[x][y].src = s;
}






