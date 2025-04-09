let imgSpaceship;
let imgAlien;
let imgBlueLaser;
let imgBackground;
let spaceship = {x: 350, y: 700, w: 100, h: 100, rightSpeed: 4, leftSpeed: 6, tempSpeed: 4};
let blueLaser = {};
let bLaserCount = 0;
let isSpacebarPressed = false;
let bLaserFired = false;
let bLaserArr = [];
let alien = {};

function preload(){
	imgBackground = loadImage('Baggrund.jpg');
	imgSpaceship = loadImage('Spaceship.png');
	imgAlien = loadImage('Alien.png');
	imgBlueLaser = loadImage('blåLaser.png')
}

function setup()
{
	createCanvas(800, 800);
}

function keyPressed(){
	if(keyCode === 32){ // Spacebar
		isSpacebarPressed = true;
	}
}

function draw(){
	//Angiver koordinater til blueLaser
	blueLaser = {x: spaceship.x + 23.5, y: spaceship.y - 75, w: 50, h: 100, speed: 6}
	
	//Loader baggrund og player
	image(imgBackground, 0, 0, 800, 800);
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
		bLaserCount = updateCount(bLaserCount, 1);
		bLaserArr = newObjList(blueLaser, 1);
		bLaserFired = true;
		isSpacebarPressed = false;
	}

	if(bLaserFired == true){
		moveUp(bLaserArr);
		for(let i = 0; i < bLaserArr.length; i++){
			spawnImage(imgBlueLaser, bLaserArr[i]);
		}
		if(bLaserArr[0].y <= -20){
			bLaserFired = false;
		}
	}

	//Alien
	
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

function updateCount(count, update){
	count += update;
	return count
}