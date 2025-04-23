let startGame = false;

let imgBackground;

let imgSpaceship;
let spaceship = {x: 350, y: 700, w: 100, h: 100, rightSpeed: 4, leftSpeed: 6, tempSpeed: 4};

let imgBlueLaser;
let blueLaser = {};
let bLaserArr = [];

let isSpacebarPressed = false;
let bLaserFired = false;

// Alien-grid
let imgAlien;
let cols = 5;
let rows = 3;
let spacingX = 100;
let spacingY = 80;
let offsetX = 50;
let offsetY = 100;
let alienArr = [];
/* let alien = {x: 100, y: 100, w: 75, h: 75, rightSpeed: 4, leftSpeed: 4, tempSpeed: 4};
let alienCount = 0; */

function preload(){
	imgBackground = loadImage('Baggrund.jpg');
	imgSpaceship = loadImage('Spaceship.png');
	imgAlien = loadImage('Alien.png');
	imgBlueLaser = loadImage('blåLaser.png');
}

function setup() {
	createCanvas(800, 800);
	textAlign(CENTER);
	fill(220);
	textSize(100);
	alienGrid(); //Loader grid-struktur
}

function alienGrid(){
	for(let r = 0; r < rows; r++){
		for(let c = 0; c < cols; c++){
			var alien = construct({ x: offsetX + c * spacingX, y: spacingY + r * spacingY, w: 75, h: 75, speedX: 2});
			alienArr.push(alien);
		}
	}
}

function keyPressed(){
	if(keyCode === 66){  //B
		startGame = true;
	}
	if(keyCode === 32){ // Spacebar
		if(bLaserFired != true){
			isSpacebarPressed = true;
		}
	}
}

function draw(){
	if(startGame == false){
		image(imgBackground, 0, 0, width, height);
		text('Press B to begin!', width/2, height/2);
	} else{

	image(imgBackground, 0, 0, 800, 800);
	spawnImage(imgSpaceship, spaceship);

	bordercheck();
	spaceshipMove();
	spaceshipLaser();

	//Alien bevægelse
	for(let i = 0; i < alienArr.length; i++){
		alienArr[i].x += alienArr[i].speedX;
		//Vend hvis en kant bliver ramt
		if(alienArr[i].x <= 0 || alienArr[i].x + alienArr[i].w >= width){
			alienArr[i].speedX *= -1;
			alienArr[i].y += spacingY;
		}
		spawnImage(imgAlien, alienArr[i]);
	}
	
	}
}

function spaceshipLaser() {
	if (isSpacebarPressed == true) {	//Generer laser
		blueLaser = { x: spaceship.x + 23.5, y: spaceship.y - 75, w: 50, h: 100, speed: 6 };
		bLaserArr = newObjList(blueLaser, 1);
		bLaserFired = true;
		isSpacebarPressed = false;
	}
	if (bLaserFired == true) {	//Laser bevægelse
		moveUp(bLaserArr);
		for (let i = 0; i < bLaserArr.length; i++) {
			spawnImage(imgBlueLaser, bLaserArr[i]);
		}
		if (bLaserArr[0].y <= -40) {
			bLaserFired = false;
		}
	}
}

function spaceshipMove() {
	if (keyIsDown(68)) { // Key D
		spaceship.x = moveRight(spaceship);
	}
	if (keyIsDown(65)) { // Key A
		spaceship.x = moveLeft(spaceship);
	}
}

function bordercheck() {
	if (spaceship.x <= 0) { //Bordercheck left
		spaceship.leftSpeed = 0;
	} else {
		spaceship.leftSpeed = spaceship.tempSpeed;
	}
	if ((spaceship.x + spaceship.w) >= width) { //Bordercheck right
		spaceship.rightSpeed = 0;
	} else {
		spaceship.rightSpeed = spaceship.tempSpeed;
	}
}



function moveUp(obj) {
	for (let i = 0; i < obj.length; i++) {
		obj[i].y = obj[i].y - obj[i].speed;
	}
}

function moveRight(obj){
	let tempVal = obj.x + obj.rightSpeed
	return tempVal
}

function moveLeft(obj){
	let tempVal = obj.x - obj.leftSpeed
	return tempVal
}

function spawnImage(img, obj){
	image(img, obj.x, obj.y, obj.w, obj.h);
}

function newObjList(obj, n){
	let list = [];
	for(let i = 0; i<n; i++){
		list.push(obj);
	}
	return list;
}

function construct(obj){
	return{...obj}
}