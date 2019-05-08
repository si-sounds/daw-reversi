const n = "pic/dummy.png";	//no disc
const k = "pic/kuro.png";	//kuro
const s = "pic/siro.png";	//shiro

var turn = k; //黒から
var turnNum = 0;
var click = 1;

var cpu;
var player;

var level;

var disc = [];
for(var i = 1; i < 9; i++) {
	disc[i] = [];
	for (var j = 1; j < 9; j++) {
		disc[i][j] = document.createElement("img");
		disc[i][j].id = "d" + i + j;
		disc[i][j].value = i*10 + j;
		disc[i][j].src = n;

		disc[i][j].onclick = change(disc[i][j].value);
		placement(i,j,orientCheck());
	}
}

disc[4][4].src = s;
disc[4][5].src = k;
disc[5][4].src = k;
disc[5][5].src = s;




$("#senkou").fadeOut(0);
$("#koukou").fadeOut(0);
$("#cant").fadeOut(0);

function reset(){
for(var i = 1; i < 9; i++) {
	for (var j = 1; j < 9; j++) {
		disc[i][j].src = n;
	}
}
	disc[4][4].src = s;
	disc[4][5].src = k;
	disc[5][4].src = k;
	disc[5][5].src = s;

	turn = k;
	turnNum = 0;
	click = 1;
	document.getElementById("level").innerHTML = "";
	document.getElementById("turn").innerHTML = "";
	document.getElementById("log").innerHTML = "";
	$("#senkou").fadeOut();
	$("#koukou").fadeOut();
	$("#select").fadeIn();
	$("#l1").fadeIn();
	$("#l2").fadeIn();
	$("#l3").fadeIn();
}

function selectLevel(input){
	var showLevel;
	level = input;
	$("#l1").fadeOut();
	$("#l2").fadeOut();
	$("#l3").fadeOut();
	$("#senkou").fadeIn();
	$("#koukou").fadeIn();
	//console.log("[selected](level) "+level);
	switch(level){
		case 1:
			showLevel = "初級";
			break;
		case 2:
			showLevel = "中級";
			break;
		case 3:
		showLevel = "上級";
		break;
	}
	document.getElementById("level").appendChild(document.createTextNode("レベル："+showLevel));
}

function selectTurn(input){

	if(input == 0){
		cpu = s;
		player = k;
		click = 0;
		turnNum = 1;
		document.getElementById("turn").innerHTML = "あなたの番";
	}else{
		cpu = k;
		player = s;
		turnControl();
	}
	$("#senkou").fadeOut();
	$("#koukou").fadeOut();
	$("#select").fadeOut();
	//console.log("[selected](turn) cpu:"+cpu+"  player:"+player);
}

function placement(i,j,orient){
	if(orient == 1){
		disc[i][j].style = "top:" + ((i-1)*11.2+3.7) + "vh; left:" + ((j-1)*11.2+3.7) + "vh;";
	}else{
		disc[i][j].style = "top:" + ((i-1)*12+2.5) + "vw; left:" + ((j-1)*12+2.5) + "vw;";
	}
	document.getElementById("disc").appendChild(disc[i][j]);
}

function change(coordinates){
	return function(){
		var y = (coordinates-coordinates%10)/10;
		var x = coordinates%10;

		if(disc[y][x].getAttribute("src") != n){return;}

		if(click == 1){
			return;
		}
	
		if(turn == player){
			change2(y, x, player, 0);
		}
	};
}

function change2(y, x, t, cpu){
	var id = 0;
	if(check(y, x, t, cpu) > 0){
		click = 1;
		id = y*10 + x;
		$("#d"+id).fadeOut(0);
		disc[y][x].src = t;		
		$("#d"+id).fadeIn(300);
		if(turn == k){
			document.getElementById("log").appendChild(document.createTextNode(turnNum + "手目: ● "+ x + " " + y));
		}else{
			document.getElementById("log").appendChild(document.createTextNode(turnNum + "手目: ○ "+ x + " " + y));
		}
		document.getElementById("log").appendChild(document.createElement("br"));
		
		var logScroll = $("#log").get(0).scrollHeight;
		$("#log").animate({scrollTop:logScroll});

		sleep(1).done(function(){
			if(turn == k){
				turn = s;
			}else{
				turn = k;
			}
			click = 0;
			turnControl();
		});
	}
}

function turnControl(){
	if(turn == cpu){
		if(checkAll(cpu) == 0){
			if(checkAll(player) == 0){
				document.getElementById("turn").innerHTML = "勝敗判定中...";
				sleep(0.5).done(function(){
					result();				
				});
				return;
			}
			$("#select").fadeIn();
			document.getElementById("turn").innerHTML = "CPU思考中...";
			$("#cant").fadeIn();
			document.getElementById("cant").innerHTML = "CPU:置ける場所がありません。<br>パスします";
			sleep(3.5).done(function(){
				$("#select").fadeOut();
				$("#cant").fadeOut();
				turn = player;
				turnNum--;
				turnControl();
			});
		}else{
			document.getElementById("turn").innerHTML = "CPU思考中...";
			sleep(0.5).done(function(){
				CPU(cpu);
			});
		}
	}else{
		if(checkAll(player) == 0){
			if(checkAll(cpu) == 0){
				document.getElementById("turn").innerHTML = "勝敗判定中...";
				sleep(0.5).done(function(){
					result();				
				});
				return;
			}
			$("#select").fadeIn();
			document.getElementById("turn").innerHTML = "あなたの番";
			$("#cant").fadeIn();
			document.getElementById("cant").innerHTML = "あなた:置ける場所がありません。<br>パスします";
			sleep(3.5).done(function(){
				$("#select").fadeOut();
				$("#cant").fadeOut();
				turn = cpu;
				turnNum--;
				turnControl();
			});
		}else{
			document.getElementById("turn").innerHTML = "あなたの番";
		}
	}
	turnNum++;
}

function check(y, x, t, cpu){
	var score = 100;
	var tmp = 0;
	tmp = checkU(y, x, t, cpu) + checkD(y, x, t, cpu) + checkL(y, x, t, cpu) + checkR(y, x, t, cpu) + checkRD(y, x, t, cpu) + checkRU(y, x, t, cpu) + checkLD(y, x, t, cpu) + checkLU(y, x, t, cpu);
	score -= tmp;
	if(score == 100){
		score = 0;
		return score;
	}

	if(level < 3){
		return score;
	}

	if(x==1 && y==1 || x==1 && y==8 || x==8 && y==1 || x==8 && y==8){
		score += 15;
	}
	if(x==1 && y==2 || x ==2 && y==1 || x==2 && y==2){
		if(disc[1][1].getAttribute("src") == n){
			score -= 10;
		}
	}
	if(x==7 && y==1 || x==8 && y==2 || x==7 && y==2){
		if(disc[1][8].getAttribute("src") == n){
			score -= 10;
		}
	}
	if(x==1 && y==7 || x==2 && y==8 || x==2 && y==7){
		if(disc[8][1].getAttribute("src") == n){
			score -= 10;
		}		
	}
	if(x==7 && y==8 || x==8 && y==7 || x==7 && y==7){
		if(disc[8][8].getAttribute("src") == n){
			score -= 10;
		}
	}

	return score;
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
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			a--;
			while(a != x){
				if(cpu == 0){
					tmp = b*10 + a;
					$("#d"+tmp).fadeOut(400, In(b, a, t, tmp));
				}
				c += BoardCheck(b, a);
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
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			a++;
			while(a != x){
				if(cpu == 0){
					tmp = b*10 + a;
					$("#d"+tmp).fadeOut(400, In(b, a, t, tmp));
				}
				c += BoardCheck(b, a);
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
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			b--;
			while(b != y){
				if(cpu == 0){
					tmp = b*10 + a;
					$("#d"+tmp).fadeOut(400, In(b, a, t, tmp));
				}
				c += BoardCheck(b, a);
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
			return 0;
		}else if(disc[b][a].getAttribute("src") == t){
			b++;
			while(b != y){
				if(cpu == 0){
					tmp = b*10 + a;
					$("#d"+tmp).fadeOut(400, In(b, a, t, tmp));
				}
				c += BoardCheck(b, a);
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

function CPU(t){
	var tmp = 0;
	var y = 0;
	var x = 0;
	var random;

	switch(level){
		case 1:
			for(var i = 1; i < 9; i++){
				for(var j = 1; j < 9; j++){
					if(disc[i][j].getAttribute("src") != n){

					}else if(tmp < check(i,j,t,1)){
						random = Math.floor(Math.random()*10);
						if(tmp != 0 && random < 4){

						}else{
							tmp = check(i,j,t,1);
							y = i;
							x = j;							
						}
						//console.log(random);
					}
				}
			}
		break;
		case 2:
		case 3:
			for(var i = 1; i < 9; i++){
				for(var j = 1; j < 9; j++){
					if(disc[i][j].getAttribute("src") != n){

					}else if(tmp < check(i,j,t,1)){
						tmp = check(i,j,t,1);
						y = i;
						x = j;
					}
				}
			}
		break;
	}


	change2(y, x, t, 0);
	//console.log(tmp);
	return;
}

function checkAll(t){
	for(var i = 1; i < 9; i++){
		for(var j = 1; j < 9; j++){
			if(disc[i][j].getAttribute("src") != n){

			}else if(0 < check(i,j,t,1)){
				return 1;
			}
		}
	}
	return 0;
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
	var p, c;
	if(player == k){
		p = countK;
		c = countS;
	}else{
		p = countS;
		c = countK;
	}
	if(p > c){
		document.getElementById("turn").innerHTML = "●" + countK + " : ○" + countS + " あなたの勝ち！";
	}else if(c > p){
		document.getElementById("turn").innerHTML = "●" + countK + " : ○" + countS + " あなたの負け！";
	}else{
		document.getElementById("turn").innerHTML = "●" + countK + " : ○" + countS + " 引き分け！";
	}
}

function orientCheck(){
    if(window.innerHeight > window.innerWidth) {
		return 0;	        
    }else{
    	return 1;
    }
}