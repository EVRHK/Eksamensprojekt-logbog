let startGame = false;
let time;

let imgBackground;

let imgSpaceship;
let spaceship = {x: 350, y: 700, w: 100, h: 100, rightSpeed: 4, leftSpeed: 6, tempSpeed: 4};

let imgAlien;
let alien = {x: 100, y: 100, w: 75, h: 75, rightSpeed: 4, leftSpeed: 4, tempSpeed: 4};
let alienArr = [];
let alienCount = 0;

let imgBlueLaser;
let blueLaser = {};
let bLaserArr = [];

let isSpacebarPressed = false;
let bLaserFired = false;

let buttonStartPressed = false;


function preload(){
	imgBackground = loadImage('Baggrund.jpg');
	imgSpaceship = loadImage('Spaceship.png');
	imgAlien = loadImage('Alien.png');
	imgBlueLaser = loadImage('blåLaser.png');
}

function setup()
{
	createCanvas(800, 800);
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
	//Angiver koordinater til blueLaser
	blueLaser = {x: spaceship.x + 23.5, y: spaceship.y - 75, w: 50, h: 100, speed: 6};

	if(startGame == false){
		image(imgBackground, 0, 0, width, height);
		textAlign(CENTER);
		fill(220);
		textSize(100);
		text('Press B to begin!', width/2, height/2);
	} else{
		image(imgBackground, 0, 0, 800, 800);

		//Loader player
		spawnImage(imgSpaceship, spaceship);

		//Bordercheck left
	if (spaceship.x <= 0) {
		spaceship.leftSpeed = 0;
	}else {
		spaceship.leftSpeed = spaceship.tempSpeed;
	}

	//Bordercheck right
	if ((spaceship.x + spaceship.w) >= width) {
		spaceship.rightSpeed = 0;
	} else {
		spaceship.rightSpeed = spaceship.tempSpeed;
	}

	//Bevægelse
	if(keyIsDown(68)){ // Key D
		spaceship.x = moveRight(spaceship);
	}
	if(keyIsDown(65)){ // Key A
		spaceship.x = moveLeft(spaceship);
	}

	//Skud
	if(isSpacebarPressed == true){
		bLaserArr = newObjList(blueLaser, 1);
		bLaserFired = true;
		isSpacebarPressed = false;
	}

	if(bLaserFired == true){
		moveUp(bLaserArr);
		for(let i = 0; i < bLaserArr.length; i++){
			spawnImage(imgBlueLaser, bLaserArr[i]);
		}
		if(bLaserArr[0].y <= -40){
			bLaserFired = false;
		}
	}

	//Timer
	if(alienCount == 0){
		for(let i = 60*10; i >= 0; i--){
			time = int(i/60)
			text(time, 200, 200);
		}

	}

	//Alien
	textSize(50);
	if(time == 0){

	}
	alienArr = newObjList(alien, 1);
	spawnImage(imgAlien, alien);
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