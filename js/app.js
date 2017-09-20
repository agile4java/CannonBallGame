
//constans, pre-defined variables

var boardX = 800;
var boardY = 800;
var gaps = 100;
var xLimits = [];
var yLimits = [];
var r = 10;
var xMin = 200;
var numOfObstacles = 3;
var goalPadding = 50;
var yMin = 0;
var goalSize = 100;
//variables
var vectorX;
var vectorY;
var x;
var y;
var myTimer;
var xGoal= [];
var yGoal = [];
var xMax = (boardX - xMin);
var yStart;
var yMax = boardY;
var yEnd;
var yPixels = (boardY - yStart);
var xCannon;
var yCannon;
var cannonAngle;
var power;




function startNewGame(){
    //clear board
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, boardX, boardY);
    //initialize arrays and variables
    while(xLimits.length > 0){
        xLimits.pop();
    }
    while(yLimits > 0){
        yLimits.pop();
    }
    while(xGoal > 0){
        xGoal.pop();
    }
    while(yGoal > 0){
        yGoal.pop();
    }
    yStart = 0;
    xCannon = 0;
    yCannon = 0;
    cannonAngle = 0;
    cannonSpeed = 1;

    createObstacles();
    createGoal();
    drawCannon();


}



function createObstacles(){
    for(i = 0; i < numOfObstacles; i++){
        var xStart = getRandomNum(xMin, xMax);
        var xEnd = xStart + 50;

        xLimits[xLimits.length] = xStart;
        xLimits[xLimits.length] = xEnd;

        yEnd = Math.floor(((i+1)/(numOfObstacles))*(getRandomNum(yStart, yMax)));
        if(i == (numOfObstacles - 1)){
            yEnd = boardY;
        }

        yLimits[yLimits.length] = yStart;
        yLimits[yLimits.length] = yEnd;
        
        //draw obstacle
        console.log("function creatObstacle, loop number = " + i + " xStart = " +
        xStart + " xEnd = " + xEnd + " yStart = " + yStart + " yEnd = " + yEnd);
        drawObstacle(xStart, xEnd, yStart, yEnd);
        yStart = Math.floor(yEnd + (gaps/(numOfObstacles-1)));

        console.log("End of loop " + i + " yStart = " + yStart + " yEnd = " + yEnd );
    }


}

function drawObstacle(xStart, xEnd, yStart, yEnd){
    var width = xEnd - xStart;
    var height = yEnd - yStart;
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1025bc";
    ctx.fillRect(xStart, yStart, width, height);
    

}

function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGoal(){
        var xCenter;
        var yCenter;
        xCenter = (getRandomNum((boardX - xMin + goalPadding), (boardX - goalPadding)));
        yCenter = (getRandomNum(goalPadding, (boardY - goalPadding)));

        var canvas = document.getElementById("board");
        var ctx = canvas.getContext("2d");
        var grd = ctx.createRadialGradient(xCenter, yCenter, (goalSize/5), xCenter, yCenter, (goalSize/2));
        grd.addColorStop(0, "#b72e16");
        grd.addColorStop(1, "#ede20e");
        ctx.fillStyle = grd;
        ctx.fillRect((xCenter - (goalSize/2)), (yCenter - (goalSize/2)), goalSize, goalSize);
        xGoal[0] = (xCenter - (goalSize/2));
        xGoal[1] = (xCenter + (goalSize/2));
        yGoal[0] = (yCenter - (goalSize/2));
        yGoal[1] = (yCenter + (goalSize/2));
        
}

function drawCannon(){

    xCannon = goalPadding;
    yCannon = (Math.floor(getRandomNum(goalPadding, (boardY - goalPadding))));
    yCannon -= 50;
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0f0f0f";
    ctx.fillRect(xCannon, yCannon, 100, 50);

}

function clearCannon(){
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(xCannon, yCannon);

    ctx.rotate(cannonAngle*Math.PI/180);
    ctx.translate((-1*xCannon), (-1*yCannon));
    ctx.clearRect((xCannon-1), (yCannon-1), 102, 52);
    ctx.restore();

}

function  moveCannon(angle) {
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(xCannon, yCannon);
    angle = -1*angle;
    ctx.rotate(angle*Math.PI/180);
    ctx.translate((-1*xCannon), (-1*yCannon));
    ctx.fillStyle = "#0f0f0f";
    ctx.fillRect(xCannon, yCannon, 100, 50);
    ctx.restore();
    cannonAngle = angle;

}

function updateSpeed(speed){
    document.querySelector("#power").value = speed;
    cannonSpeed = speed;
}

function updateAngle(angle){
    document.querySelector("#angleDisplay").value = angle;
    clearCannon();
    moveCannon(angle);
}

function fireCannon(){
    runAnimation();
}

function runAnimation() {
    x = xCannon + 95;
    y = yCannon + 25;
    vectorY = Math.ceil((power/10)*(Math.tan(cannonAngle)));
    vectorX = Math.abs(Math.ceil((power/10)*(1/Math.tan(cannonAngle))));
    myTimer = setInterval(moveBall, 100);
}

function moveBall() {

        //clear previous ball
        var clearX = x;
        var clearY = y;
        clearBall(clearX, clearY);

        //check if ball hit wall or obstacle
       //var collision = check4Collision(x, y);
       // if(collision){

        //}
        //move center of ball to new coordinates
        x += vectorX;
        y += vectorY;
        drawBall(x, y);

}

function clearBall(clearX, clearY){
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(clearX, clearY, (r * 2), (r * 2));
}

function drawBall(x, y){
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.fillStyle = "#FF0000";
    ctx.fill();

}