//using object oriented javascript// a simple frogger type game written in JavaScript (without jQuery or any other JavaScript library) and rendered on HTML5
// storing a reference to the <canvas> element to the canvas variable
var canvas = document.getElementById('canvas');
//ctx variable to store the 2D rendering context — the actual tool we can use to paint on the Canvas
var ctx = canvas.getContext('2d');

var frog = new Image(); frog.src = "images/frogger.png";
var sx = 0;
var sy = 0;
var swidth = 40;
var sheight = 40;
var x = 50;
var y = 444;
var width = 30;
var height = 30;

//Pressed buttons can be defined and initialized with boolean variables
//The default values are false because at the beginning the control buttons are not pressed.
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
//Four variables for storing information on whether the up, down, left or right control button is pressed.
var up = true;
var down = true;
var right = true;
var left = true;
//eight cars total for game
var car = new Image(); car.src = "images/froggercars.png";
var carX1 = 100;
var carSX1 = 0;
// these variables are used to create a collision detection between frog and car
var carY1 = 400;
var carWidth = 60;
var carHeight = 35;

var carX2 = 500;
var carSX2 = 60;
var carY2 = 400;
var carX3 = 460;
var carSX3 = 120;
var carY3 = 355;
var carX4 = 400;
var carSX4 = 180;
var carY4 = 310;
var carX5 = 360;
var carSX5 = 0;
var carY5 = 265;
var carX6 = 60;
var carSX6 = 120;
var carY6 = 355;
var carX7 = 100;
var carSX7 = 180;
var carY7 = 310;
var carX8 = 160;
var carSX8 = 0;
var carY8 = 265;
//the logWidth and logHeight will not vary, assigning descriptive names to these values will help in setting up our collision test between frog and log
var logX1 = 300;
var logY1 = 180;
var logWidth = 120;
var logHeight = 30;
var logX2 = 40;
var logY2 = 180;
var logX3 = 100;
var logY3 = 136;
var logX4 = 400;
var logY4 = 136;
var logX5 = 480;
var logY5 = 92;
var logX6 = 60;
var logY6 = 92;
var logX7 = 120;
var logY7 = 48;
var logX8 = 500;
var logY8 = 48;

var padWidth = 30;
var padHeight = 30;
var padX1 = 20;
var padY1 = 4;
var padX2 = 120;
var padY2 = 4;
var padX3 = 220;
var padY3 = 4;
var padX4 = 320;
var padY4 = 4;
var padX5 = 420;
var padY5 = 4;
var padX6 = 520;
var padY6 = 4;

var pad1 = false;
var pad2 = false;
var pad3 = false;
var pad4 = false;
var pad5 = false;
var pad6 = false;

var lives = 3;
var play = true;
var time = 280;

//code to handle the paddle movement when the buttons are pressed
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("click", onMouseClick, false);

//When we press a key down, this information is stored in a variable. The relevant variable in each case is set to true. When the key is released, the variable is set back to false.

//function for when keys are pressed
function keyDownHandler(e)
{
  if(e.keyCode === 39) {rightPressed = true;}
  if(e.keyCode === 37) {leftPressed = true;}
  if(e.keyCode === 38) {upPressed = true;}
  if(e.keyCode === 40) {downPressed = true;}
}
//function for when the keys stop being pressed
function keyUpHandler(e)
{
  if(e.keyCode === 39) {rightPressed = false;}
  if(e.keyCode === 37) {leftPressed = false;}
  if(e.keyCode === 38) {upPressed = false;}
  if(e.keyCode === 40) {downPressed = false;}
}

function onMouseClick(e) {
		pad1 =false;
		pad2 = false;
		pad3 = false;
		pad4 = false;
		pad5 = false;
		pad6 = false;
    play = true;
		lives = 3;
		time = 280;
}


function drawBackground(){
// drawing two strips for grass
ctx.fillStyle = "lime";
ctx.fillRect(0, 440, 570, 45);
ctx.fillRect(0, 220, 570, 45);

//add a dashed horizontal line to represent a lane boundary for the cars
ctx.beginPath();
ctx.moveTo(0,395);
ctx.lineTo (570,395);
ctx.strokeStyle = "white";
ctx.setLineDash([5]);
ctx.strokeWidth = 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0,350);
ctx.lineTo (570,350);
ctx.strokeStyle = "white";
ctx.setLineDash([0]);
ctx.strokeWidth = 4;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0,305);
ctx.lineTo (570,305);
ctx.strokeStyle = "white";
ctx.setLineDash([5]);
ctx.strokeWidth = 2;
ctx.stroke();

//drawing water
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 570, 220);
}
// use the drawImage() method to draw an image to represent our frog.
// initialize all the variables for our drawImage method
function drawFrog(){
	ctx.drawImage(frog, sx, sy, swidth, sheight, x, y, width, height);
}
//frog movement
//want our frog to face right if he is moving to the right and left if he is moving to the left
function moveFrog(){
  //This code will restrict up movement
	if (upPressed===true && up===true && y > 20) {
	y = y - 44;
	up = false;
	sx=0;
	}
if (upPressed===false) {
	up = true;
	}
//This code will restrict down movement off canvas
if (downPressed===true && down===true && y + height < canvas.height - 80) {
	y = y + 44;
	down = false;
	sx=0;
	}
if (downPressed===false) {
	down = true;
	}
//This code will restrict right movement off canvas
if (rightPressed===true && right===true && x + width < canvas.width-20) {
	x = x + 44;
	right = false;
	sx=40;
	}
if (rightPressed===false) {
	right = true;
	}
//This code will restrict left movement off canvas
if (leftPressed===true && left===true && x > 20) {
	x = x - 44;
	left = false;
	sx=80;
	}
if (leftPressed===false) {
	left = true;
	}
}
//use the drawImage() method to draw an image to represent our car
//we need to initialize all the variables for our drawImage method
function drawCars(){
//eight cars total
// create arrays for the variables that will need to be specified for each separate car
	var carsSX = [carSX1, carSX2, carSX3, carSX4, carSX5, carSX6, carSX7, carSX8];
	var carsX = [carX1, carX2, carX3, carX4, carX5, carX6, carX7, carX8];
	var carsY = [carY1, carY2, carY3, carY4, carY5, carY6, carY7, carY8];
//We want to make the car move across the canvas in a continuous loop, so we will need to vary the x position of the car.
	for (i = 0; i < carsX.length; i++){
		ctx.drawImage(car, carsSX[i], 0, 60, 35, carsX[i], carsY[i], carWidth, carHeight);
	}
}
//Math.random generates a number between 0 and 1 and Math.floor rounds down to the nearest whole number, so our code should generate a random integer of 0, 1, 2, or 3
function moveCars(){

 if (carX1 < canvas.width + 100) {
	 carX1 = carX1 + 5;
	 }
	 else {
		 carX1 = -100;
		 carSX1 = (Math.floor(Math.random() * 4)) * 60;
		 }

 if (carX2 < canvas.width + 100) {
	 carX2 = carX2 + 5;
	 }
	 else {
		 carX2 = -100;
		 carSX2 = (Math.floor(Math.random() * 4)) * 60;
		 }

 if (carX3 > -100) {
	 carX3 = carX3 - 5;
	 }
	 else {
		 carX3 = canvas.width + 100;
		 carSX3 = (Math.floor(Math.random() * 4)) * 60;
		 }

 if (carX6 > -100) {
	 carX6 = carX6 - 5;
	 }
	 else {
		 carX6 = canvas.width + 100;
		 carSX6 = (Math.floor(Math.random() * 4)) * 60;
		 }

 if (carX4 < canvas.width + 100) {
	 carX4 = carX4 + 5;
	 }
	 else {
		 carX4 = -100;
		 carSX4 = (Math.floor(Math.random() * 4)) * 60;
		 }

 if (carX7 < canvas.width + 100) {
	 carX7 = carX7 + 5;
	 }
	 else {
		 carX7 = -100;
		 carSX7 = (Math.floor(Math.random() * 4)) * 60;
		 }

 if (carX5 > -100) {
	 carX5 = carX5 - 5;
	 }
	 else {
		 carX5 = canvas.width + 100;
		 carSX5 = (Math.floor(Math.random() * 4)) * 60;
		 }

 if (carX8 > -100) {
	 carX8 = carX8 - 5;
	 }
	 else {
		 carX8 = canvas.width + 100;
		 carSX8 = (Math.floor(Math.random() * 4)) * 60;
		 }
}

//function that will check to see if the frog and the car are overlapping
//overlapping (colliding) we will simply reset the y position of the frog to near the bottom of the canvas
function runOver (){

	var carsX = [carX1, carX2, carX3, carX4, carX5, carX6, carX7, carX8];
	var carsY = [carY1, carY2, carY3, carY4, carY5, carY6, carY7, carY8];
 //for loop that will check for x and y values
	for (i = 0; i < carsX.length; i++){
		if (carsX[i] <= x + width &&
		carsX[i] + carWidth >= x &&
		carsY[i] + carHeight >= y &&
		carsY[i] <= y + height) {
			y= 444;
			lives = lives - 1;
		}
	}
}

function drawLogs(){
//Use JavaScript’s fillStyle and fillRect methods to create a rectangle
//rectangles that the frog will be able to float on to get across the water to reach the top of the canvas
	ctx.fillStyle = "brown";
	var logsX = [logX1, logX2, logX3, logX4, logX5, logX6, logX7, logX8];
	var logsY = [logY1, logY2, logY3, logY4, logY5, logY6, logY7, logY8];
// draw logs by simply adding new variables for the x and y positions of the rectangle.
	for (i = 0; i < logsX.length; i++){
	ctx.fillRect(logsX[i], logsY[i], logWidth, logHeight);
	}
}
// function to create a left to right 2 pixels per frame scrolling animation.
function moveLogs(){
 if (logX1 < canvas.width + 100) {
	 logX1 = logX1 + 2;
	 }
	 else {
		 logX1 = -100;
		 }

 if (logX2 < canvas.width + 100) {
	 logX2 = logX2 + 2;
	 }
	 else {
		 logX2 = -100;
		 }

 if (logX3 > 0-logWidth ) {
	 logX3 = logX3 - 2;
	 }
	 else {
		 logX3 = canvas.width + 100;
		 }

 if (logX4 > 0-logWidth ) {
	 logX4 = logX4 - 2;
	 }
	 else {
		 logX4 = canvas.width + 100;
		 }

 if (logX5 < canvas.width + 100) {
	 logX5 = logX5 + 3;
	 }
	 else {
		 logX5 = -100;
		 }

 if (logX6 < canvas.width + 100) {
	 logX6 = logX6 + 3;
	 }
	 else {
		 logX6 = -100;
		 }

 if (logX7 > 0-logWidth ) {
	 logX7 = logX7 - 2;
	 }
	 else {
		 logX7 = canvas.width + 100;
		 }

 if (logX8 > 0-logWidth ) {
	 logX8 = logX8 - 2;
	 }
	 else {
		 logX8 = canvas.width + 100;
		 }
}
//function to check if any part of the log rectangle is “overlapping” the frog’s space,only checking for y less than 220 because that is where the “water” begins.
//If you preview in browser, the frog should be able to float on the log and return to the bottom if it hits the water.
function float(){
//After entering this code all logs should allow frog floating
	if (logX1 <= x + width &&
				logX1 + logWidth >= x &&
				logY1 + logHeight >= y &&
				logY1 <= y + height) {
					if(x < canvas.width - 30){
						x = x + 2;
					}
	}

	else if (logX2 <= x + width &&
				logX2 + logWidth >= x &&
				logY2 + logHeight >= y &&
				logY2 <= y + height) {
					if(x < canvas.width - 30){
						x = x + 2;
					}
	}

	else if (logX3 <= x + width &&
				logX3 + logWidth >= x &&
				logY3 + logHeight >= y &&
				logY3 <= y + height) {
					if(x > 0){
						x = x - 2;
					}
	}
	else if (logX4 <= x + width &&
				logX4 + logWidth >= x &&
				logY4 + logHeight >= y &&
				logY4 <= y + height) {
					if(x > 0){
						x = x - 2;
					}
	}

	else if (logX5 <= x + width &&
				logX5 + logWidth >= x &&
				logY5 + logHeight >= y &&
				logY5 <= y + height) {
					if(x < canvas.width - 30){
						x = x + 3;
					}
	}

	else if (logX6 <= x + width &&
				logX6 + logWidth >= x &&
				logY6 + logHeight >= y &&
				logY6 <= y + height) {
					if(x < canvas.width - 30){
						x = x + 3;
					}
	}

	else if (logX7 <= x + width &&
				logX7 + logWidth >= x &&
				logY7 + logHeight >= y &&
				logY7 <= y + height) {
					if(x > 0){
						x = x - 2;
					}
	}

	else if (logX8 <= x + width &&
				logX8 + logWidth >= x &&
				logY8 + logHeight >= y &&
				logY8 <= y + height) {
					if(x > 0){
						x = x - 2;
					}
	}

	else if (y < 220 && y > 44){
		y = 444;
		lives = lives -1;
		}
}
//program the game so that if a frog reaches a pad, an image of the frog will remain on the pad and the frog will return to the bottom of the canvas.
function drawPads(){
	ctx.fillStyle = "seagreen";
	var padsX = [padX1, padX2, padX3, padX4, padX5, padX6];
	var padsY = [padY1, padY2, padY3, padY4, padY5, padY6];

	for (i = 0; i < padsX.length; i++){
	ctx.fillRect(padsX[i], padsY[i], padWidth, padHeight);
	}
}

function onPad(){
	if (padX1 <= x + width &&
		padX1 + padWidth >= x &&
		padY1 + padHeight >= y &&
		padY1 <= y + height) {
			pad1 = true;
			y = 444;
			}

	else if (padX2 <= x + width &&
			padX2 + padWidth >= x &&
			padY2 + padHeight >= y &&
			padY2 <= y + height) {
				pad2 = true;
				y = 444;
				}

	else if (padX3 <= x + width &&
			padX3 + padWidth >= x &&
			padY3 + padHeight >= y &&
			padY3 <= y + height) {
				pad3 = true;
				y = 444;
				}

	else if (padX4 <= x + width &&
			padX4 + padWidth >= x &&
			padY4 + padHeight >= y &&
			padY4 <= y + height) {
				pad4 = true;
				y = 444;
				}

	else if (padX5 <= x + width &&
			padX5 + padWidth >= x &&
			padY5 + padHeight >= y &&
			padY5 <= y + height) {
				pad5 = true;
				y = 444;
				}

	else if (padX6 <= x + width &&
			padX6 + padWidth >= x &&
			padY6 + padHeight >= y &&
			padY6 <= y + height) {
				pad6 = true;
				y = 444;
				}

	else if (y < 48){
		y = 444;
		lives = lives - 1;
		}

	var pads = [pad1, pad2, pad3, pad4, pad5, pad6];
	var padsX = [padX1, padX2, padX3, padX4, padX5, padX6];
	var padsY = [padY1, padY2, padY3, padY4, padY5, padY6];

	for (i = 0; i < pads.length; i++){

		if (pads[i] === true) {
			ctx.drawImage(frog, 0, 0, 40, 40, padsX[i], padsY[i], 30, 30);
		}
	}
}
//3 lives per game
function drawLives() {
	// count and display lives left
	ctx.fillStyle = "white";
	ctx.font = "30px Arial";
	ctx.fillText("LIVES: " + (lives), canvas.width-150, 525);
}

function timer() {
	// timer is a displayed shrinking rectangle
	if (time >= 0 && play === true){
	ctx.fillStyle = "red";
	ctx.fillText("TIMER:", 10, 525);
	ctx.fillRect(120, 505, time, 20);
	time = time - 0.1;
	}
}
//replay button appears on game completion
//will draw text  when the player frog wins
function winScreen() {
	ctx.fillStyle = "#0000FF";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(canvas.width/2 - 120,320,240,140);
	ctx.font = "72px Arial";
	ctx.fillText("GAME OVER", 60, 160);
	ctx.fillText("WINNER", 100, 260);
	ctx.font = "48px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("REPLAY", 200, 400);
}
//replay button appears
//will draw text when the frog runs out of lives
function loseScreen() {
	ctx.fillStyle = "#DF223B";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(canvas.width/2 - 120,320,240,140);
	ctx.font = "72px Arial";
	ctx.fillText("GAME OVER", 60, 160);
	ctx.font = "48px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("REPLAY", 200, 400);
}

//With the requestAnimationFrame loop, the draw() function will be executed every time your screen refreshes.
//Add the If statement in the draw() function to determine whether the gameOver() and drawLives() functions are executed.
function draw(){
//Add the clearRect method as shown to clear the canvas with each execution of the draw function.
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(lives<=0 || time<=0){
		play = false;
		loseScreen();
	}

	if(
		pad1 === true &&
		pad2 === true &&
		pad3 === true &&
		pad4 === true &&
		pad5 === true &&
		pad6 === true){
			play=false;
			winScreen();
	}

	if(play === true){
		drawBackground();
		drawLogs();
		moveLogs();
		drawPads();
		onPad();
		drawFrog();
		moveFrog();
		drawCars();
		moveCars();
		runOver();
		float();
		drawLives();
		timer();
	}
//Defining a drawing loop for animation
	requestAnimationFrame(draw);
}
draw();
