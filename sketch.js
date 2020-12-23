//global vaiables
var monkey,
    bananaGroup,banana,
    obstacle, obstacleGroup,
    ground1,ground2,Iground,groundA,
    jungle,
    score,
    gameState,PLAY,END,
    retry,gameOver

function preload(){
  //monkey runnimg animation
  monkeyRunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  //banana image
  banana1=loadImage("Banana.png")
  //obstacle image
  obstacles=loadImage("stone.png")
  // ground and background animation
  groundImage=loadImage("ground.jpg")
  jungleImage=loadImage("jungle.jpg")
  //monkey collided, retry, gameover sprites
  monkeyC=loadImage("Monkey_01.png")
  retryS=loadImage("restart.png")
  gameO=loadImage("gameOver.png")
}


function setup() {
  createCanvas(600,300); 
//creating background
  jungle=createSprite(300,175,10,10)
  jungle.addImage(jungleImage)
  jungle.scale=0.8
// giving initial score
  score=0
//retry and gameover sprites
 
// ground and ground animation
  ground1=createSprite(180,290,10,50)
  ground1.addImage( groundImage)
  ground1.scale=0.1
  ground2=createSprite(535,290,10,50)
  ground2.addImage( groundImage)
  ground2.scale=0.1
// making invisible ground
  Iground=createSprite(300,290,600,5)
  Iground.visible=false
//creating monkey
  monkey=createSprite(30,250,10,10)
  monkey.addAnimation("monkey",monkeyRunning);
  monkey.scale=0.1
// making obstacle and banana group
  obstacleGroup=new Group()
  bananaGroup=new Group()
// declaring gamestates
  PLAY=1
  END=0
  gameState=PLAY 

  }

  function draw(){

  background(255);
// all the functions inside gmestate PLAY
  if(gameState===PLAY){
// banana objective score
    if(bananaGroup.isTouching(monkey)){
      score=score+1;
      bananaGroup.destroyEach();
    }
// ground moving equations
   Iground.x=camera.position.x
   ground1.x=camera.position.x-200
   ground2.x=camera.position.x+160

   jungle.x=camera.position.x
// spacerbar and monkey jump for diff scales
    if (monkey.scale===0.1){
      if(keyDown("space") && monkey.y>=250){
        monkey.velocityY=-15
      }
    }
    if(monkey.scale===0.15){
      if(keyDown("space") && monkey.y>=225){
          monkey.velocityY=-15
        }
    }
    if(monkey.scale===0.2){
      if(keyDown("space") && monkey.y>=200){
        monkey.velocityY=-15
      }
    }
      if(monkey.scale===0.25){
        if(keyDown("space") && monkey.y>=175){
          monkey.velocityY=-15
      }
    }
    if(monkey.scale===0.3){
        if(keyDown("space") && monkey.y>=150){
          monkey.velocityY=-15
      }
    }
    if(monkey.scale===0.35){
      if(keyDown("space") && monkey.y>=125){
        monkey.velocityY=-15
      }
    }
// giving gravity
    monkey.velocityY=monkey.velocityY+1
// size increasing equations
    switch(score){
    case 3:monkey.scale=0.15
      break;
    case 6:monkey.scale=0.2
      break
    case 9:monkey.scale=0.25
      break
    case 12:monkey.scale=0.3
      break
    case 15:monkey.scale=0.35
      break 
    default:break
    }
// spawn obstacles and bananas
    spawnObstacles()
    bananas()
// gamestate end equations 
    if(obstacleGroup.isTouching(monkey)){
      gameState=END 
    }

  }
// rest equations
  if(gameState===END){
    reset() 
  }
//colliding monkey with invisible ground
  monkey.collide(Iground)
// giving score
  
 camera.position.y=monkey.y-100
 camera.position.x=monkey.x
 
 
  drawSprites()   
}

function spawnObstacles() {
  if(frameCount % 100=== 0) {
     obstacle = createSprite(camera.position.x+550,270,10,40);
  //  obstacle.velocityX = -(6+score/2);
    obstacle.addImage(obstacles)
    obstacle.scale =random(0.05,0.1) ;
    obstacle.lifetime = 100;
    obstacle.setCollider("circle",50,50);
    obstacleGroup.add(obstacle)
    if(obstacle.lifetime>=0){
      monkey.velocityX=6
    }
  }
}

function bananas(){
  if(frameCount%70===0){
    banana=createSprite(camera.position.x+550,random(50,270),10,10);
  //  banana.velocityX=-(6+score/2);
    banana.addImage(banana1);
    banana.scale=0.1;
    banana.lifetime=100;
    bananaGroup.add(banana);
    
  }
}

function reset(){
  //stopping ground
  monkey.velocityX=0
ground1.velocityX=0 ;
ground2.velocityX=0 ;
  //collided monkey animations
monkey.addImage("monkey",monkeyC)
monkey.scale=0.1;
  //setting banana and obstacle lifetime to -1 and velocity 0
bananaGroup.setVelocityXEach(0);
bananaGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);
obstacleGroup.setVelocityXEach(0);
  // stopping monkey
monkey.velocityY=0;
  // retry and gameover sprites

  retry=createSprite(camera.position.x+50,150,50,50)
 
  gameOver=createSprite(camera.position.x+50,50,10,10)
 



retry.visible=true;
retry.addImage(retryS);
gameOver.visible=true
gameOver.addImage(gameO)
retry.scale=1;
  
//reset system
if(mouseDown()){
score=0;
gameState=PLAY;
retry.visible=false;
gameOver.visible=false
bananaGroup.destroyEach();
obstacleGroup.destroyEach();
monkey.addAnimation("monkey",monkeyRunning);
monkey.scale=0.1;
}
}












