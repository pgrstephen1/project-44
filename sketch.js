var jet, jetImg;
var asteroid, asteroidImg, asteroidGroup;
var laser, laserImg, laserGroup;
var score = 0;
var gameState = 0;

function preload(){
jetImg = loadImage("images/jet.png");
asteroidImg = loadImage("images/asteroid.png");
laserImg = loadImage("images/laser.jpg");
}

function setup() {
  createCanvas(1000, 600);
  jet = createSprite(800,300,200,50);
  jet.addImage(jetImg);
  jet.scale = 0.3;

  asteroidGroup = new Group();
  laserGroup = new Group();
}

function draw() {
  background("white");
  textSize(18);
  text("Score: "+ score, 850,50);
  
  if(gameState === 0){
  if(keyIsDown(UP_ARROW)){
    jet.y = jet.y-20;
  }

  if(keyIsDown(DOWN_ARROW)){
    jet.y = jet.y+20;
  }

  if(laserGroup.isTouching(asteroidGroup)){
    asteroidGroup.destroyEach();
    laserGroup.destroyEach();
    score += 1;
  }
 spawnAsteroids();
 shootLasers();
  drawSprites();
}
if(asteroidGroup.isTouching(jet) || asteroidGroup.x>1000){
  gameState = 1;
}

  if(gameState === 1){
    asteroidGroup.destroyEach();
    laserGroup.destroyEach();
    jet.destroy();
    textSize(20);
    text("GAME OVER", displayWidth/2, displayHeight/2);
  }

  if(gameState === 0 && score === 20){
    gameState = 2;
    asteroidGroup.destroyEach();
    laserGroup.destroyEach();
    jet.destroy();
    textSize(20);
    text("YOU WIN", dsiplayWidth/2, displayHeight/2);
  }

  } 

function spawnAsteroids(){
  if(frameCount%130 === 0){
    asteroid = createSprite(0,300,50,50);
    asteroid.addImage(asteroidImg);
    asteroid.y = Math.round(random(50,550));
  asteroid.scale = 0.08;
  asteroid.velocityX = 7;
  asteroid.lifetime = 1500;
  asteroid.setCollider("circle",0,0,210);
  asteroidGroup.add(asteroid);
  }
}

  function shootLasers(){
    if(keyIsDown(LEFT_ARROW)){
    laser = createSprite(1000,300,20,20);
    laser.addImage(laserImg);
    laser.scale = 0.1;
    laser.x = jet.x;
    laser.y = jet.y;
    laser.velocityX = -20;
    laser.lifetime = 1000;
    laser.setCollider("circle",0,0,20);
    laserGroup.add(laser);
    }
}
