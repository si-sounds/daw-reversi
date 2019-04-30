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

		disc[i][j].addEventListener("click", change(i,j));

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
		var y = (coordinates-coordinates%10)/10;
		var x = coordinates%10;

		if(disc[y][x].getAttribute("src") != n){return;}

	
		if(turn == "●"){
			change2(y, x, k);
		}else{
			change2(y, x, s);
		}
	};
}

function change2(y, x, t){
	if(check(y, x, t) > 0){
		disc[y][x].src = t;

		document.getElementById("log").appendChild(document.createTextNode(turnNum + "手目:" + turn + " "+ x + " " + y));
		document.getElementById("log").appendChild(document.createElement("br"));

		if(turn == "●"){
			turn = "○";
		}else{
			turn = "●";
		}
		turnNum++;
	}
}

function check(y, x, t){
	var sum = 0;
	sum = checkU(y, x, t) + checkD(y, x, t) + checkL(y, x, t) + checkR(y, x, t) + checkRD(y, x, t) + checkRU(y, x, t) + checkLD(y, x, t) + checkLU(y, x, t);

	return sum;
}

function checkR(y, x, t){
	var a = x;
	var b = y;
	var flag = 0;

	while(a < 8){
		a++;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			return flag;
		}else if(disc[b][a].getAttribute("src") == t){
			a--;
			while(a != x){
				disc[y][a].src = t;
				flag = 1;
				a--;
			}
			return flag;
		}
	}
	return flag;
}

function checkL(y, x, t){
	var a = x;
	var b = y;
	var flag = 0;

	while(a > 1){
		a--;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			return flag;
		}else if(disc[b][a].getAttribute("src") == t){
			a++;
			while(a != x){
				disc[y][a].src = t;
				flag = 1;
				a++;
			}
			return flag;
		}
	}
	return flag;
}

function checkU(y, x, t){
	var a = x;
	var b = y;
	var flag = 0;

	while(b < 8){
		b++;
		if(disc[b][a].getAttribute("src") == n){
			b = x;
			return flag;
		}else if(disc[b][a].getAttribute("src") == t){
			b--;
			while(b != y){
				disc[b][x].src = t;
				flag = 1;
				b--;
			}
			return flag;
		}
	}
	return flag;
}

function checkD(y, x, t){
	var a = x;
	var b = y;
	var flag = 0;

	while(b > 1){
		b--;
		if(disc[b][a].getAttribute("src") == n){
			b = x;
			return flag;
		}else if(disc[b][a].getAttribute("src") == t){
			b++;
			while(b != y){
				disc[b][x].src = t;
				flag = 1;
				b++;
			}
			return flag;
		}
	}
	return flag;
}

function checkRD(y, x, t){
	var a = x;
	var b = y;
	var flag = 0;

	while(a < 8 && b < 8){
		a++;
		b++;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			b = x;
			return flag;
		}else if(disc[b][a].getAttribute("src") == t){
			a--;
			b--;
			while(a != x){
				disc[b][a].src = t;
				flag = 1;
				a--;
				b--;
			}
			return flag;
		}
	}
	return flag;
}

function checkRU(y, x, t){
	var a = x;
	var b = y;
	var flag = 0;

	while(a < 8 && b > 1){
		a++;
		b--;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			b = x;
			return flag;
		}else if(disc[b][a].getAttribute("src") == t){
			a--;
			b++;
			while(a != x){
				disc[b][a].src = t;
				flag = 1;
				a--;
				b++;
			}
			return flag;
		}
	}
	return flag;
}

function checkLD(y, x, t){
	var a = x;
	var b = y;
	var flag = 0;

	while(a > 1 && b < 8){
		a--;
		b++;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			b = x;
			return flag;
		}else if(disc[b][a].getAttribute("src") == t){
			a++;
			b--;
			while(a != x){
				disc[b][a].src = t;
				flag = 1;
				a++;
				b--;
			}
			return flag;
		}
	}
	return flag;
}

function checkLU(y, x, t){
	var a = x;
	var b = y;
	var flag = 0;

	while(a > 1 && b > 1){
		a--;
		b--;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			b = x;
			return flag;
		}else if(disc[b][a].getAttribute("src") == t){
			a++;
			b++;
			while(a != x){
				disc[b][a].src = t;
				flag = 1;
				a++;
				b++;
			}
			return flag;
		}
	}
	return flag;
}