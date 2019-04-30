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
		var y = (coordinates-coordinates%10)/10;
		var x = coordinates%10;

		if(disc[y][x].getAttribute("src") != n){return;}

	
		if(turn == "●"){
			change2(y, x, k, 0);
		}else{
			change2(y, x, s, 0);
		}
	};
}

function changeCPU(coordinates){
	var y = (coordinates-coordinates%10)/10;
	var x = coordinates%10;

	if(disc[y][x].getAttribute("src") != n){return;}


	if(turn == "●"){
		change2(y, x, k, 0);
	}else{
		change2(y, x, s, 0);
	}
}

function change2(y, x, t, cpu){
	if(check(y, x, t, cpu) > 0){
		disc[y][x].src = t;

		document.getElementById("log").appendChild(document.createTextNode(turnNum + "手目:" + turn + " "+ x + " " + y));
		document.getElementById("log").appendChild(document.createElement("br"));

		if(turn == "●"){
			turn = "○";
			document.getElementById("turn").innerHTML = "CPU思考中...";
			sleep(1.5).done(function(){
				CPU();
				document.getElementById("turn").innerHTML = "あなたの番";
			});
		}else{
			turn = "●";
		}
		turnNum++;
	}
}

function check(y, x, t, cpu){
	var sum = 0;
	sum = checkU(y, x, t, cpu) + checkD(y, x, t, cpu) + checkL(y, x, t, cpu) + checkR(y, x, t, cpu) + checkRD(y, x, t, cpu) + checkRU(y, x, t, cpu) + checkLD(y, x, t, cpu) + checkLU(y, x, t, cpu);

	return sum;
}

function checkR(y, x, t, cpu){
	var a = x;
	var b = y;
	var c = 0;

	while(a < 8){
		a++;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			a--;
			while(a != x){
				if(cpu == 0){
					disc[y][a].src = t;					
				}
				c += BoardCheck(y, a);
				a--;
			}
			return c;
		}
	}
	return 0;
}

function checkL(y, x, t, cpu){
	var a = x;
	var b = y;
	var c = 0;

	while(a > 1){
		a--;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			a++;
			while(a != x){
				if(cpu == 0){
					disc[y][a].src = t;
				}
				c += BoardCheck(y, a);
				a++;
			}
			return c;
		}
	}
	return 0;
}

function checkU(y, x, t, cpu){
	var a = x;
	var b = y;
	var c = 0;

	while(b < 8){
		b++;
		if(disc[b][a].getAttribute("src") == n){
			b = y;
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			b--;
			while(b != y){
				if(cpu == 0){
					disc[b][x].src = t;
				}
				c += BoardCheck(b, x);
				b--;
			}
			return c;
		}
	}
	return 0;
}

function checkD(y, x, t, cpu){
	var a = x;
	var b = y;
	var c = 0;

	while(b > 1){
		b--;
		if(disc[b][a].getAttribute("src") == n){
			b = y;
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			b++;
			while(b != y){
				if(cpu == 0){
					disc[b][x].src = t;
				}
				c += BoardCheck(b, x);
				b++;
			}
			return c;
		}
	}
	return 0;
}

function checkRD(y, x, t, cpu){
	var a = x;
	var b = y;
	var c = 0;

	while(a < 8 && b < 8){
		a++;
		b++;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			b = y;
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			a--;
			b--;
			while(a != x){
				if(cpu == 0){
					disc[b][a].src = t;
				}
				c += BoardCheck(b, a);
				a--;
				b--;
			}
			return c;
		}
	}
	return 0;
}

function checkRU(y, x, t, cpu){
	var a = x;
	var b = y;
	var c = 0;

	while(a < 8 && b > 1){
		a++;
		b--;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			b = y;
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			a--;
			b++;
			while(a != x){
				if(cpu == 0){
					disc[b][a].src = t;
				}
				c += BoardCheck(b, a);
				a--;
				b++;
			}
			return c;
		}
	}
	return 0;
}

function checkLD(y, x, t, cpu){
	var a = x;
	var b = y;
	var c = 0;

	while(a > 1 && b < 8){
		a--;
		b++;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			b = y;
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			a++;
			b--;
			while(a != x){
				if(cpu == 0){
					disc[b][a].src = t;					
				}
				c += BoardCheck(b, a);
				a++;
				b--;
			}
			return c;
		}
	}
	return 0;
}

function checkLU(y, x, t, cpu){
	var a = x;
	var b = y;
	var c = 0;

	while(a > 1 && b > 1){
		a--;
		b--;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			b = y;
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			a++;
			b++;
			while(a != x){
				if(cpu == 0){
					disc[b][a].src = t;
				}
				c += BoardCheck(b, a);
				a++;
				b++;
			}
			return c;
		}
	}
	return 0;
}

function BoardCheck(y, x){
	var count = 0;

	if(disc[y-1][x].getAttribute("src") == n && y > 1){
		count++;
	}
	if(disc[y-1][x+1].getAttribute("src") == n && y > 1 && x < 8){
		count++;
	}
	if(disc[y][x+1].getAttribute("src") == n && x < 8){
		count++;
	}
	if(disc[y+1][x+1].getAttribute("src") == n && y < 8 && x < 8){
		count++;
	}
	if(disc[y+1][x].getAttribute("src") == n && y < 8){
		count++;
	}
	if(disc[y+1][x-1].getAttribute("src") == n && y < 8 && x > 1){
		count++;
	}
	if(disc[y][x-1].getAttribute("src") == n && x > 1){
		count++;
	}
	if(disc[y-1][x-1].getAttribute("src") == n && y > 1 && x > 1){
		count++;
	}
	return count;
}

function CPU(){
	var tmp = 1000;
	var ans = 0;
	for(var i = 1; i < 9; i++){
		for(var j = 1; j < 9; j++){
			if(disc[i][j].getAttribute("src") != n){

			}else if(tmp > check(i,j,s,1) && check(i,j,s,1) > 0){
				tmp = check(i,j,s,1);
				ans = i*10 + j;
			}
		}
	}
	console.log(tmp,ans);
	changeCPU(ans);
	return;
}

function sleep(sec){
	var objDef = new $.Deferred;
	setTimeout(function(){
		objDef.resolve(sec);
	}, sec*1000);
	return objDef.promise();
}