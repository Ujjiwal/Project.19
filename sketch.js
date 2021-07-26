var PLAY =1;
var END =0;
var gameState = PLAY;
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var foodGroup,obstacleGroup;
var survivalTime=0;
var ground;
var gameOver,gameOverImage,restart,restartImage;

function preload(){
monkey_running=loadAnimation("monkey.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
gameOverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");
}

function setup(){
createCanvas(600,600);
monkey=createSprite(100,500,20,20);
monkey.addAnimation("monkey_running",monkey_running);
monkey.scale=0.2;

gameOver = createSprite(300,300,20,30);
gameOver.addImage(gameOverImage);
gameOver.scale =0.5;

restart = createSprite(300,330);
restart.addImage(restartImage);
restart.scale=0.5;

//obstacle =createSprite(300,500,20,20);

ground=createSprite(100,570,600,20);
ground.x =ground.width/2;

obstacleGroup = createGroup();
bananaGroup = createGroup();

survivalTime=0;
}
function draw() {
background("white");

if(gameState === PLAY){
   gameOver.visible=false;
   restart.visible=false;

   if(obstacleGroup.isTouching(monkey)){
    gameState=END;
   }

   if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
}


 if (ground < 0){
ground.x =ground.width/2;
 }

 spawnObstacles();
 spawnBanana();

 if(keyDown("space")&& monkey.y>=300){
     monkey.velocityY =-12;
 }

 fill("black")
textSize(20)
survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time:"+survivalTime,100,50)

monkey.velocityY =monkey.velocityY+0.8

monkey.collide(ground);


}
else if(gameState === END){
    gameOver.visible = true;
restart.visible = true;

monkey.velocityY=0;
obstacleGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);

if (mousePressedOver(restart)){
    reset();
  }
}

drawSprites();

}

function spawnObstacles(){
if(frameCount % 150===0){
        var obstacle =createSprite(500,530,20,20);
        obstacle.addImage(obstacleImage);
        obstacle.velocityX =-6;
        obstacle.scale =0.25;
        obstacle.lifeTime =500;

obstacleGroup.add(obstacle);
    }
}

function spawnBanana(){
    if(frameCount%160===0){
        banana =createSprite(600,100,40,10);
        banana.y =Math.round(random(250,300));
        banana.addImage(bananaImage);
        banana.scale=0.2;
        banana.velocityX =-3;

        monkey.lifeTime =500;

        banana.depth =monkey.depth;
        monkey.depth =monkey.depth+1;

        bananaGroup.add(banana);
    }
}

function reset(){
    gameState = PLAY;
    gameOver.visible=false;
    restart.visible=false;

    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();

    monkey.changeAnimation("monkey_running",monkey_running);
    
    survivalTime =0;
}

