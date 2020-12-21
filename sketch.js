const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

var bg2,run1I,run2I,coinANAMAE,obsIMG,gameover,coll;
var run1,run2,coin,obs;
var coinGroup, obsGroup;
var bgGr, obg;

function preload(){
  bg2 = loadImage("img/bg2.jpg");

  coinANAMAE = loadAnimation("img/coin animaie/coin1.png","img/coin animaie/coin2.png","img/coin animaie/coin3.png","img/coin animaie/coin4.png","img/coin animaie/coin5.png","img/coin animaie/coin6.png","img/coin animaie/coin7.png","img/coin animaie/coin8.png","img/coin animaie/coin9.png","img/coin animaie/coin10.png","img/coin animaie/coin11.png","img/coin animaie/coin12.png","img/coin animaie/coin13.png");

  gameover = loadImage("img/gameover.png");

  coll = loadImage("img/Runner 1/run 3.png")

  obsIMG1 = loadImage("img/obstacle/obs1.png");
  obsIMG2 = loadImage("img/obstacle/obs2.png");
  obsIMG3 = loadImage("img/obstacle/obs3.png");
  obsIMG4 = loadImage("img/obstacle/obs4.png");
  obsIMG5 = loadImage("img/obstacle/obs5.png");
  obsIMG6 = loadImage("img/obstacle/obs6.png");

  run1I = loadAnimation("img/Runner 1/run 4.png","img/Runner 1/run 2.png","img/Runner 1/run1.png","img/Runner 1/run 2.png","img/Runner 1/run 3.png");

  run2I = loadAnimation("img/Runner 2/run 4.png","img/Runner 2/run 3.png","img/Runner 2/run 2.png","img/Runner 2/run 1.png");
}

function setup(){
  canvas = createCanvas(displayWidth-30,displayHeight-150);
  engine = Engine.create();

  obg = createSprite(displayWidth/2, displayHeight/2, displayWidth,displayHeight)
  obg.addImage(bg2);
  obg.scale = 11;
  obg.velocityX = -3;

  run1 = createSprite(500,530,20,50);
  run1.addAnimation("running", run1I);
  run1.scale = 0.7;

  bgGr = createSprite(500,730,1000000,15);
  bgGr.shapeColor = "brown"
  bgGr.x = bgGr.width /2;
  bgGr.visible = false

  coinGroup = new Group();
  obsGroup = new Group();

  Engine.run(engine);

}


function draw(){
  background("purple");

  Engine.update(engine);

  if(gameState === PLAY){

    

    if (coinGroup.isTouching(run1)) {
      score = score + 1;
      coinGroup.destroyEach();
    }
    

    bgGr.velocityX = -(6 + 3*score/100); 

    if(keyIsDown(UP_ARROW) && run1.y >= 525.5) {
      run1.velocityY = -29;
    }

    run1.velocityY = run1.velocityY + 0.8


    if (bgGr.x < 0){
      bgGr.x = bgGr.width/2;
    }

    
      
    run1.velocityY = run1.velocityY + 0.8

    Obstacles();
    coins();

    if (obg.x < 0){
      obg.x = obg.width/2;
    }

    if(obsGroup.isTouching(run1)) {
      gameState = END;
    }  
  }

  if (gameState === END) {
    bgGr.velocityX = 0;
   
    coinGroup.setLifetimeEach(-1);
    obsGroup.setLifetimeEach(-1);
    
    coinGroup.setVelocityXEach(0);
    obsGroup.setVelocityXEach(0);

    run1.changeAnimation(coll)

    imageMode(CENTER);
    var GO;
    GO = createSprite(displayWidth/2,displayHeight/2-30,displayWidth-30,displayHeight-150);
    GO.addImage(gameover)
    GO.scale = 6;

  }
  run1.collide(bgGr);

  console.log(run1.y);

  drawSprites();

  fill("white");
  textSize(32);
  textFont("Georgia");
  text("Score: "+ score, 500,50);
}

function Obstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(1500,600,100,100);
    obstacle.velocityX = -15;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obsIMG1);
              break;
      case 2: obstacle.addImage(obsIMG2);
              break;
      case 3: obstacle.addImage(obsIMG3);
              break;
      case 4: obstacle.addImage(obsIMG4);
              break;
      case 5: obstacle.addImage(obsIMG5);
              break;
      case 6: obstacle.addImage(obsIMG6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obsGroup.add(obstacle);
  }
}

function coins(){
  if(frameCount % 190 === 0) {
    coin = createSprite(1500,600,100,100);
    coin.velocityX = -8;
    coin.addAnimation("coinMoving", coinANAMAE);

    coin.lifetime = 400;
    coinGroup.add(coin)
  }
}