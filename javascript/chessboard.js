/*
* @Author: root
* @Date:   2019-04-25 23:10:27
* @Last Modified by:   root
* @Last Modified time: 2019-08-26 18:27:43
*/
var blackImg = new Image();
var whiteImg = new Image();
blackImg.src = "image/black.png";
whiteImg.src = "image/white.png";
var flag     = 1;
var number     = [],
	flag_up    = [],
	flag_down  = [],
	flag_left  = [],
	flag_right = [];
var ctx, ctx1, canvas, canvas1;
for(var i=0; i<19; i++) {
	number[i]     = [];
	flag_up[i]    = [];
	flag_down[i]  = [];
	flag_left[i]  = [];
	flag_right[i] = [];
	for(var j=0; j<19; j++) {
		number[i][j]     = 0;
		flag_up[i][j]    = 0;
		flag_down[i][j]  = 0;
		flag_left[i][j]  = 0;
		flag_right[i][j] = 0;
	}
}
function show() {
	console.clear();
	for(var i=0; i<19; i++) {
		var s = "";
		for(var j=0; j<19; j++) {
			s = s + number[j][i] +"  ";
		}
		console.log(s+" "+i);
	}
}
$(document).ready(function(){
	canvas  = document.getElementById("box");
	ctx     = canvas.getContext("2d");
	canvas1 = document.getElementById("box1");
	ctx1    = canvas1.getContext("2d");
	for(var i=0; i<19; i++) {	// 绘制围棋棋盘网格
		ctx.moveTo(15+i*30, 15);
		ctx.lineTo(15+i*30, 555);
		ctx.moveTo(15, 15+i*30);
		ctx.lineTo(555, 15+i*30);
		ctx.stroke();
	}
	function piece(position, x, y, r, color) {
		position.beginPath();
		position.arc(15+x*30,15+y*30, r, 0, 2*Math.PI);
		position.fillStyle = color;
		position.fill();
		position.stroke();
	}
	piece(ctx, 3 , 3 , 5, "black"); 	// 绘制棋盘上的8个星位、1个天元
	piece(ctx, 15, 3 , 5, "black");
	piece(ctx, 3 , 15, 5, "black");
	piece(ctx, 15, 15, 5, "black");
	piece(ctx, 9 , 9 , 5, "black");
	piece(ctx, 3 , 9 , 5, "black");
	piece(ctx, 9 , 3 , 5, "black");
	piece(ctx, 15 , 9 , 5, "black");
	piece(ctx, 9 , 15 , 5, "black");

	canvas1.onclick = function(e) {		// 鼠标点击棋盘落子
		var x = Math.floor(e.offsetX/30);
		var y = Math.floor(e.offsetY/30);
		if(number[x][y] == 0) {
			s_Regrets.push(x, y, flag++);
			show();
			if(flag%2!=0){
				piece(ctx1, x, y, 13, "white"); // 刚落子的颜色
				$("#now").css("background-image", "url('image/black.png')"); // 下一个落子颜色
				number[x][y] = 1; // 记录落子位置
				liberty(x, y, -1); // 进入的递归
				$("#white").html(eat_white); // 表明提子数
			} else{
				piece(ctx1, x, y, 13, "black"); // 刚落子的颜色
				$("#now").css("background-image", "url('image/white.png')"); // 下一个落子颜色
				number[x][y] = -1; // 记录落子位置
				liberty(x, y, 1); // 进入的递归
				$("#black").html(eat_black); // 表明提子数
			}
			show();
		}
	}
});
