let imgSpaceship;
let imgAlien;
let laser;
let spaceship = [350, 700, 100, 100];
let alienx = [100];
let alieny = [100];
let speed = 5;
let spawnCount;
let k = true;

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
	image(imgBackground, 0, 0, 800, 800);
	image(imgSpaceship, spaceship[0], spaceship[1], spaceship[2], spaceship[3]);
	
	spawnCount = 5;
	for(let i = 0; i<spawnCount; i++){
		alienx.push(alienx[0+i]+100);
		image(imgAlien, alienx[0+i], alieny[0], 50, 50);
	}
	
	if(k == true){
	console.log(width);
	k = false;
	}
	for(let i = 0;i < alienx.length;i++){
		alienx[0+i] += speed;
	}
	for(let i = 0;i < alienx.length;i++){
		borderCheck(alienx[0+i], 0);
	}
	


	if(keyIsDown(68)){ // Key D
		spaceship[0] = addSpeed(spaceship[0], 2);
	}
	if(keyIsDown(65)){ // Key A
		spaceship[0] = addSpeed(spaceship[0], -2);
	}
	if(keyIsDown(83)){ //Key S
		spaceship[1] = addSpeed(spaceship[1], 2);
	}
	if(keyIsDown(87)){ //Key W
		spaceship[1] = addSpeed(spaceship[1], -2);
	}

	if(keyIsDown(32)){ //Spacebar
		
	}

	
}

function addSpeed(x, speed) {
	return(x += speed);
}

function borderCheck(x, w){
	if(x + w >= width){
		speed = -speed;
	}
	if(x <= 0){
		speed = -speed;
	}
}