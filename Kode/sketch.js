let startGame = false;
let gameOver = false;
let score = 0;
let highscore = 0;

let imgBackground;

let imgSpaceship;
let spaceship = {x: 350, y: 700, w: 100, h: 100, rightSpeed: 4, leftSpeed: 6, tempSpeed: 4};

let imgBlueLaser;
let blueLaser = {};
let bLaserArr = [];
let bLaserFired = false;

let isSpacebarPressed = false;

let isHit = false;

let killPoint = 10;
let wave = 0;

// Alien-grid
let imgAlien;
let cols = 6;
let rows = 3;
let alienCount = cols * rows;
let spacingX = 100;
let spacingY = 80;
let offsetX = 50;
let offsetY = 100;
let alienArr = [];

function preload(){
	imgBackground = loadImage('Baggrund.jpg');
	imgSpaceship = loadImage('Spaceship.png');
	imgAlien = loadImage('Alien.png');
	imgBlueLaser = loadImage('blåLaser.png');
}

function setup() {
	createCanvas(800, 800);
	alienGrid(4); //Loader grid-struktur
	fill(0, 225, 0);
}

function alienGrid(speed){
	for(let r = 0; r < rows; r++){
		for(let c = 0; c < cols; c++){
			var alien = construct({ x: offsetX + c * spacingX, y: spacingY + r * spacingY, w: 75, h: 75, speedX: speed});
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
		textAlign(CENTER);
		textSize(75); //How to start
		text('Press B to begin!', width/2, height/2);
		textSize(90); //Title
		text('SPACE INVADERS', width / 2, 200);
		textSize(40); //Controls
		text('Use a/d to move left/right', width / 2, 500);
		updateHighscore();
		textSize(42); //Highscore
		text('Highscore: ' + highscore, width / 2, 300);
	} else{
		image(imgBackground, 0, 0, 800, 800);
		spawnImage(imgSpaceship, spaceship);

		bordercheck();
		spaceshipMove();
		spaceshipLaser();
		
		spawnAliens();
		newWave();

		for(let i = 0; i < alienArr.length; i++){
			if(alienArr[i].y > offsetY + 7 * spacingY){
				startGame = false;
				gameOver = true;
				

				if(score > highscore){
					highscore = score;
				}
			}
		}

		textSize(20);
		textAlign(LEFT);
		text('score: ' + score, 30, 20);
		updateScore();
	}
}

function updateHighscore() {
	if (gameOver == true) {
		if (score > highscore) {
			highscore = score;
		}
	}
}

function newWave() {
	if (alienArr.length === 0) {
		alienGrid(4 + 1);
	}
}

function updateScore() {
	if (isHit != false) {
		score += killPoint;
		isHit = false;
	}
}

function spawnAliens() {
	for (let  i = 0; i < alienArr.length; i++) {
		alienArr[i].x += alienArr[i].speedX;
		//Vend hvis en kant bliver ramt
		if (alienArr[i].x <= 0 || alienArr[i].x + alienArr[i].w >= width) {
			alienArr[i].speedX *= -1;
			alienArr[i].y += spacingY;
		}
		spawnImage(imgAlien, alienArr[i]);
	}
}

function spaceshipLaser() {
	blueLaser = { x: spaceship.x + 23.5, y: spaceship.y - 75, w: 50, h: 100, speed: 6 };
	if (isSpacebarPressed == true) {	//Generer laser
		bLaserArr = newObjList(blueLaser, 1);
		bLaserFired = true;
		isSpacebarPressed = false;
	}
	if (bLaserFired == true) {	//Laser bevægelse
		moveUp(bLaserArr);
		for (let i = 0; i < bLaserArr.length; i++) {
			spawnImage(imgBlueLaser, bLaserArr[i]);
			if (bLaserArr[0].y <= -40) { //Bordercheck
				bLaserFired = false;
			}
		}
		for(let l = 0; l < bLaserArr.length; l++){ //Collision check
			for(let i = 0; i < alienArr.length; i++){
				if (bLaserArr[l].x < alienArr[i].x + alienArr[i].w &&
					bLaserArr[l].x + bLaserArr[l].w > alienArr[i].x &&
					bLaserArr[l].y < alienArr[i].y + alienArr[i].h &&
					bLaserArr[l].y + bLaserArr[l].h > alienArr[i].y)
					{
						console.log(i);
						let newList = alienArr.slice(0 ,i);
						for(let n = 0; n <= i; n++){
							alienArr.shift()
						}
						for(let m = newList.length - 1; m >= 0; m--){
							alienArr.unshift(newList[m]);
						}
						bLaserFired = false;
						isHit = true;
					}
				}
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