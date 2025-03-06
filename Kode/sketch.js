let imgSpaceship;
let laser;
let spaceship = [100, 100, 100, 100];

function preload(){
	imgSpaceship = loadImage('Spaceship.png');
}

function setup() 
{
	createCanvas(800, 800);
	
}

function draw()
{
	background(220);
	image(imgSpaceship, spaceship[0], spaceship[1], spaceship[2], spaceship[3]);

	
	if(keyIsDown(68)){
		spaceship[0] = addSpeed(spaceship[0], 2);
	}
	if(keyIsDown(65)){
		spaceship[0] = addSpeed(spaceship[0], -2);
	}
	if(keyIsDown(83)){
		spaceship[1] = addSpeed(spaceship[1], 2);
	}
	if(keyIsDown(87)){
		spaceship[1] = addSpeed(spaceship[1], -2);
	}
	if(keyIsDown(32)){
		
	}
}

function addSpeed(x, speed) {
	return(x += speed);
}

