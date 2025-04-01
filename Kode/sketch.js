let imgSpaceship;
let imgAlien;
let spaceship = {x: 350, y: 700, w: 100, h: 100, rightSpeed: 4, leftSpeed: 4, tempSpeed: 4};
let alien = {};

function preload(){
	imgBackground = loadImage('Baggrund.jpg');
	imgSpaceship = loadImage('Spaceship.png');
	imgAlien = loadImage('Alien.png');
}

function setup()
{
	createCanvas(800, 800);
}

function draw()
{
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
}


function spawnImage(img, obj){
	image(img, obj.x, obj.y, obj.w, obj.h);
}