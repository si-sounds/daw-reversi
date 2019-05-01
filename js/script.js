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
			//change2(y, x, s, 0);
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
	var tmp = 0;
	if(check(y, x, t, cpu) > 0){
		tmp = y*10 + x;
		$("#d"+tmp).fadeOut(0);
		disc[y][x].src = t;		
		$("#d"+tmp).fadeIn(300);

		document.getElementById("log").appendChild(document.createTextNode(turnNum + "手目:" + turn + " "+ x + " " + y));
		document.getElementById("log").appendChild(document.createElement("br"));

		if(turn == "●"){
			turn = "○";
			document.getElementById("turn").innerHTML = "CPU思考中...";
			sleep(1.5).done(function(){

				if(CPU(1,s) == 0){
					if(CPU(0,k) == 0){
						result();
						return;
					}
					document.getElementById("turn").innerHTML = "置ける場所がありません。パスします";
				}
				document.getElementById("turn").innerHTML = "あなたの番";
				console.log(CPU(0));
				if(CPU(0,k) == 0){
					if(CPU(0,s) == 0){
						result();
						return;
					}
					document.getElementById("turn").innerHTML = "置ける場所がありません。パスします";
					sleep(3).done(function(){
						document.getElementById("turn").innerHTML = "CPU思考中...";
						sleep(1.5).done(function(){
							CPU(1,s);
						});
					});
				}	
				
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

function In(y, x, t, tmp){
	return function(){
		disc[y][x].src = t;
		$("#d"+tmp).fadeIn(400);
	};
}

function checkR(y, x, t, cpu){
	var a = x;
	var b = y;
	var c = 0;
	var tmp = 0;

	while(a < 8){
		a++;
		if(disc[b][a].getAttribute("src") == n){
			a = x;
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			a--;
			while(a != x){
				if(cpu == 0){
					tmp = y*10 + a;
					$("#d"+tmp).fadeOut(400, In(y, a, t, tmp));
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
					tmp = y*10 + a;
					$("#d"+tmp).fadeOut(400, In(y, a, t, tmp));
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
					tmp = b*10 + x;
					$("#d"+tmp).fadeOut(400, In(b, x, t, tmp));
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
					tmp = b*10 + x;
					$("#d"+tmp).fadeOut(400, In(b, x, t, tmp));
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
					tmp = b*10 + a;
					$("#d"+tmp).fadeOut(400, In(b, a, t, tmp));
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
					tmp = b*10 + a;
					$("#d"+tmp).fadeOut(400, In(b, a, t, tmp));
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
					tmp = b*10 + a;
					$("#d"+tmp).fadeOut(400, In(b, a, t, tmp));				
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
					tmp = b*10 + a;
					$("#d"+tmp).fadeOut(400, In(b, a, t, tmp));
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

	if(y > 1 && disc[y-1][x].getAttribute("src") == n){
		count++;
	}
	if(y > 1 && x < 8 && disc[y-1][x+1].getAttribute("src") == n){
		count++;
	}
	if(x < 8 && disc[y][x+1].getAttribute("src") == n){
		count++;
	}
	if(y < 8 && x < 8 && disc[y+1][x+1].getAttribute("src") == n){
		count++;
	}
	if(y < 8 && disc[y+1][x].getAttribute("src") == n){
		count++;
	}
	if(y < 8 && x > 1 && disc[y+1][x-1].getAttribute("src") == n){
		count++;
	}
	if(x > 1 && disc[y][x-1].getAttribute("src") == n){
		count++;
	}
	if(y > 1 && x > 1 && disc[y-1][x-1].getAttribute("src") == n){
		count++;
	}
	return count;
}

function CPU(mode, t){
	var tmp = 1000;
	var ans = 0;
	for(var i = 1; i < 9; i++){
		for(var j = 1; j < 9; j++){
			if(disc[i][j].getAttribute("src") != n){

			}else if(tmp > check(i,j,t,1) && check(i,j,t,1) > 0){
				tmp = check(i,j,t,1);
				ans = i*10 + j;
			}
		}
	}
	if(mode == 1){
		if(ans != 0){
			changeCPU(ans);
		}
	}
	return ans;
}

function sleep(sec){
	var objDef = new $.Deferred;
	setTimeout(function(){
		objDef.resolve(sec);
	}, sec*1000);
	return objDef.promise();
}

function result(){
	var countK = 0;
	var countS = 0;
	for(var i = 1; i < 9; i++){
		for(var j = 1; j < 9; j++){
			if(disc[i][j].getAttribute("src") == k){
				countK++;
			}else if(disc[i][j].getAttribute("src") == s){
				countS++;
			}
		}
	}
	if(countK > countS){
		document.getElementById("turn").innerHTML = "あなたの勝ち！";
	}else if(countS > countK){
		document.getElementById("turn").innerHTML = "あなたの負け！";
	}else{
		document.getElementById("turn").innerHTML = "引き分け！";
	}

	document.getElementById("log").appendChild(document.createTextNode("●" + countK + " : ○" + countS));

}