const n = 0;	//no disc
const k = 1;	//kuro
const s = 2;	//shiro

var disc = [];
for(i=0; i<8; i++){
	disc[i] = [];
	for(j=0; j<8; j++){
		disc[i][j] = n;
	}
}
disc[4][4] = s;
disc[4][5] = k;
disc[5][4] = k;
disc[5][5] = s;

