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
	// 判断所落棋子左方是否非越界且存在异色棋子;
	if( !Transboundary(x-1, y) && number[x-1][y]==color )
		if(liberty2(x-1, y, color, flag_left) == true)
			reset_flag(flag_left);
	// 判断所落棋子右方是否非越界且存在异色棋子;
	if( !Transboundary(x+1, y) && number[x+1][y]==color )
		if(liberty2(x+1, y, color, flag_right) == true)
			reset_flag(flag_right);
	// 判断所落棋子上方是否非越界且存在异色棋子;
	if( !Transboundary(x, y-1) && number[x][y-1]==color )
		if(liberty2(x, y-1, color, flag_up) == true)
			reset_flag(flag_up);
	// 判断所落棋子下方是否非越界且存在异色棋子;
	if( !Transboundary(x, y+1) && number[x][y+1]==color )
		if(liberty2(x, y+1, color, flag_down) == true)
			reset_flag(flag_down);
	// 提子
	eat(color, flag_up, flag_down, flag_left, flag_right);
}
function liberty2(x, y, color, array_flag) {
	array_flag[x][y] = color;
	// 判断该棋子 ‘左、右、上、下’ 是否存在活气，若存在返回true;
	if( (!Transboundary(x-1, y  ) && number[x-1][y  ]==0) ||
		(!Transboundary(x+1, y  ) && number[x+1][y  ]==0) ||
		(!Transboundary(x  , y-1) && number[x  ][y-1]==0) ||
		(!Transboundary(x  , y+1) && number[x  ][y+1]==0) ){
		return true;
	}
	// 判断 ‘左、右、上、下’ 是否存在同色棋子，若存在则进行递归;
	if( !Transboundary(x-1, y) && number[x-1][y]==color && array_flag[x-1][y]!=color )
		return liberty2(x-1, y, color, array_flag);
	if( !Transboundary(x+1, y) && number[x+1][y]==color && array_flag[x+1][y]!=color )
		return liberty2(x+1, y, color, array_flag);
	if( !Transboundary(x, y-1) && number[x][y-1]==color && array_flag[x][y-1]!=color )
		return liberty2(x, y-1, color, array_flag);
	if( !Transboundary(x, y+1) && number[x][y+1]==color && array_flag[x][y+1]!=color )
		return liberty2(x, y+1, color, array_flag);
}
// 递归条件判断是否越界
function Transboundary(x, y) {
	if(x<0 || x>18 || y<0 || y>18)
		return true;
	else 
		return false;
}
// 提子效果，将递归所记录下的可吃棋子记录下来，之后一并提子;
function eat(color, flag_up, flag_down, flag_left, flag_right) {
	for(var i=0; i<19; i++) {
		for(var j=0; j<19; j++) {
			if( flag_up[j][i]    == color || 
				flag_down[j][i]  == color || 
				flag_left[j][i]  == color || 
				flag_right[j][i] == color ) {

				ctx1.beginPath();
				ctx1.clearRect(j*30, i*30, 30, 30);
				number[j][i] = 0;
				if(color == -1) eat_white++;
				else eat_black++;
			}
			flag_up[j][i]    = 0;
			flag_down[j][i]  = 0;
			flag_left[j][i]  = 0;
			flag_right[j][i] = 0;
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
