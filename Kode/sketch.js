let imgSpaceship;
let imgAlien;
let imgBlueLaser;
let imgBackground;
let spaceship = {x: 350, y: 700, w: 100, h: 100, rightSpeed: 4, leftSpeed: 6, tempSpeed: 4};
let blueLaser = {x: 0, y: 0, w: 0, h: 0, speed: 0};
let bLaserCount = 0;
let isSpacebarPressed = false;
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
		console.log('sejt');
	}
}

function draw()
{
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

	if(keyIsDown(68)){ // Key D
		spaceship.x += spaceship.rightSpeed;
	}
	if(keyIsDown(65)){ // Key A
		spaceship.x -= spaceship.leftSpeed;
	}

	//Skud
	if(isSpacebarPressed == true){
		console.log('meget' + ' ' + 'sejt');
		bLaserCount = updateCount(bLaserCount, 1);
		bLaserArr = newObjList(blueLaser, bLaserCount);

		isSpacebarPressed = false;
	}
	
	for(let i = 0; i<bLaserCount; i++){

	}
}



function spawnImage(img, obj){
	image(img, obj.x, obj.y, obj.w, obj.h);
}

function newObjList(obj, n){
	let list = [];
	for(let i = 0; i<n; i++){
		list.push(obj)
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