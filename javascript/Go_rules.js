/*
* @Author: root
* @Date:   2019-04-25 23:45:08
* @Last Modified by:   root
* @Last Modified time: 2019-08-26 18:52:22
*/

// 围棋规则实现
var eat_white = 0, eat_black = 0;
var now_x = 0, now_y = 0;
function liberty(x, y, color) {
	if( !Transboundary(x-1, y) && number[x-1][y]==color ) {
		if(!liberty2(x-1, y, color))
			eatChess(color, flag_arr);
		reset_flag(flag_arr);
	}
	if( !Transboundary(x+1, y) && number[x+1][y]==color ) {
		if(!liberty2(x+1, y, color))
			eatChess(color, flag_arr);
		reset_flag(flag_arr);
	}
	if( !Transboundary(x, y-1) && number[x][y-1]==color ) {
		if(!liberty2(x, y-1, color))
			eatChess(color, flag_arr);
		reset_flag(flag_arr);
	}
	if( !Transboundary(x, y+1) && number[x][y+1]==color ) {
		if(!liberty2(x, y+1, color))
			eatChess(color, flag_arr);
		reset_flag(flag_arr);
	}
	reset_flag(flag_arr);
}
function liberty2(x, y, color) {
	var queX = [], queY = [];
	var direction = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	queX.push(x);
	queY.push(y);
	while(queX.length>0 && queY.length>0) {
		var i = queX.shift();
		var j = queY.shift();
		if(Viable(i, j))
			return true;
		flag_arr[i][j] = color;
		for(let k=0; k<direction.length; k++) {
			if( !Transboundary(i+direction[k][0], j+direction[k][1]) && 
				number[i+direction[k][0]][j+direction[k][1]]==color  && 
				flag_arr[i+direction[k][0]][j+direction[k][1]]!=color) {

				queX.push(i+direction[k][0]);
				queY.push(j+direction[k][1]);
				flag_arr[i+direction[k][0]][j+direction[k][1]] = color;
			}
		}
	}
	console.log(false);
	//return false;
}
// 递归条件判断是否越界
function Transboundary(x, y) {
	if(x<0 || x>18 || y<0 || y>18)
		return true;
	else 
		return false;
}
function Viable(x, y) {
	if( (!Transboundary(x-1, y) && number[x-1][y] == 0) ||
		(!Transboundary(x+1, y) && number[x+1][y] == 0) ||
		(!Transboundary(x, y-1) && number[x][y-1] == 0) ||
		(!Transboundary(x, y+1) && number[x][y+1] == 0) )
		return true;
	return false;
}
// 提子效果，将递归所记录下的可吃棋子记录下来，之后一并提子;
function eatChess(color, flag_arr) {
	for(var i=0; i<19; i++) {
		for(var j=0; j<19; j++) {
			if(flag_arr[j][i] == color) {
				ctx1.beginPath();
				ctx1.clearRect(j*30, i*30, 30, 30);
				number[j][i] = 0;
				if(color == -1) eat_white++;
				else eat_black++;
			}
			flag_arr[j][i] = 0;
		}
	}
}
function reset_flag(array_flag) {
	for(var i=0; i<19; i++) {
		for(var j=0; j<19; j++) {
			array_flag[j][i] = 0;
		}
	}
}
