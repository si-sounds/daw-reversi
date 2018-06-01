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

	
		if(turn == "●"){
			changeK(x, y);
		}else{
			changeS(x, y);
		}
	};
}

function changeK(x, y){
	var a = x;
	var b = y;
	var loopCount = 0;

	while(a < 8){
		a++;
		if(disc[a][b].getAttribute("src") == n){
			a = x;
			return;
		}else if(disc[a][b].getAttribute("src") == k){
			if(loopCount == 0){
				a = x;
			}
			return;
		}
		loopCount++;
		console.log(loopCount);
	}
	console.log("hello");
	if(a != x){
		do{
			a--;
			disc[a][b].src = k;
		}while(a == x);
		
		console.log(turnNum + "手目:" + turn + " "+ x + " " + y);
		turn = "○";
		turnNum++;
	}
}

function changeS(x, y){
	disc[x][y].src = s;
}






