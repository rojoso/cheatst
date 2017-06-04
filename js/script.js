
//赢法数组
var over=false;
var wins = [];

//赢法统计数组
var myWin = [];
var computerWin = [];

for(var i=0;i<15;i++){
	wins[i] = [];
	for(var j=0;j<15;j++){
		wins[i][j] = [];
	}
}

var count = 0;


//所有横向的法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}


//所有纵向的赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}


//所有斜向的赢法
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i+k][count] = true;
		}
		count++;
	}
}


//所有反斜向的赢法

for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

//初始化赢法统计数组

for(var i=0;i<count;i++){

	myWin[i]=0;
	computerWin[i] = 0;
}


var chess=document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle='#4e4747';

var logo = new Image();

logo.src='./image/logo.png';
logo.onload=function(){

	context.drawImage(logo,0,0,450,450);
	drawChessBoard();
	
}


var drawChessBoard=function(){

for(i=0;i<15;i++){
	context.moveTo(15+i*30,15);
    context.lineTo(15+i*30,435);
    context.moveTo(15,15+i*30);
    context.lineTo(435,15+i*30);
}
context.stroke();	
}


var oneStep=function(i,j,me){
	
    context.beginPath();

	context.arc(15+i*30,15+j*30,13,0,2 * Math.PI);
    var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
    if(me){
    gradient.addColorStop(0,'#0a0a0a');
    gradient.addColorStop(1,'#636766');
    }
    else{
    	gradient.addColorStop(0,'#d1d1d1');
        gradient.addColorStop(1,'#f9f9f9');
    }
	context.fillStyle=gradient;
	context.fill();

	context.closePath();
}

//实现落子的效果

var chessBoard=[];

var tog = true;

for(var i=0;i<15;i++){
    chessBoard[i]=[];
    for(var j=0;j<15;j++){
    	chessBoard[i][j]=0;
    }
}


//下棋的过程
chess.onclick=function(e){

	if(over){
		return;
	}

	if(!tog){
		return;
	}
	var x=e.offsetX;
	var y=e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
    
    if(chessBoard[i][j]==0){
    oneStep(i,j,tog);
    chessBoard[i][j]=1;

    //我方的判断输赢
    for(var k=0;k<count;k++){
    	if(wins[i][j][k]){
    		myWin[k]++;
    		computerWin[k]=6;
    		if(myWin[k]==5){
    			alert('你赢了 ！恭喜~~');
    			over=true;
    		}
    	}
    }

    if(!over){
    	tog=!tog;
    	computerAI();
    }

   }
}

var computerAI=function(){
	var myScore=[];
	var computerScore=[];

	var max = 0;
	var u=0;
	var v=0;
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j] = 0;
		}
	}

	//完成初始化
	//开始进行评分
    for(var i=0;i<15;i++){
    	for(var j=0;j<15;j++){
    		if(chessBoard[i][j]==0){
    			for(var k=0;k<count;k++){
    				if(wins[i][j][k]){
    					if(myWin[k]==1){
    						myScore[i][j]+=200;
    					}else if(myWin[k]==2){
                            myScore[i][j]+=400; 
    					}else if(myWin[k]==3){
    						myScore[i][j]+=2000;
    					}else if(myWin[k]==4){
    						myScore[i][j]+=10000;
    					}

    					//电脑自身的情况
    					if(computerWin[k]==1){
    						computerScore[i][j]+=220;
    					}else if(computerWin[k]==2){
                            computerScore[i][j]+=420; 
    					}else if(computerWin[k]==3){
    						computerScore[i][j]+=2200;
    					}else if(computerWin[k]==4){
    						computerScore[i][j]+=20000;
    					}
    				}
    			}
                if(myScore[i][j]>max){
                	max=myScore[i][j];
                	u=i;
                	v=j;
                }else if(myScore[i][j]==max){
                	if(computerScore[i][j]>computerScore[u][v]){
                		u=i;v=j;
                	}
                }

                if(computerScore[i][j]>max){
                	max=computerScore[i][j];
                	u=i;
                	v=j;
                }else if(computerScore[i][j]==max){
                	if(myScore[i][j]>myScore[u][v]){
                		u=i;v=j;
                	}
                }

    		}
    	}
    }
    oneStep(u,v,false);
    chessBoard[u][v]=2;
        //计算机的判断输赢
    for(var k=0;k<count;k++){
    	if(wins[u][v][k]){
    		computerWin[k]++;
    		myWin[k]=6;
    		if(computerWin[k]==5){
    			alert('计算机赢了 ！沮丧 --');
    			over=true;
    		}
    	}
    }

    if(!over){
    	tog=!tog;
    }


}









