var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup;
var bullets, bulletsImg, bulletsGroup;
var life1, life2, life3, life1Img, life2Img, life3Img;
var gameState= "play"
var lives=3;
var score;
var gameOverImg, gameOver;
var edges, topEdge, bottomEdge, leftEdge, rightEdge;
var reset, resetImg;
var gunShot, lose;



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage ("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  bulletsImg = loadImage("assets/bullet.png")
  life3Img = loadImage ("assets/heart_3.png")
  life2Img = loadImage ("assets/heart_2.png")
  life1Img = loadImage ("assets/heart_1.png")
  gameOverImg = loadImage ("assets/gameover.png")
  resetImg = loadImage ("assets/resetbutton.png")
  
  gunShot= loadSound ("assets/shoot.mp3")
  lose= loadSound ("assets/lose.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

topEdge = createSprite (windowWidth-750, windowHeight-950, windowWidth,200)
topEdge.setCollider("rectangle",0,0,windowWidth,100);

  

//creating the player sprite
   player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
   player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = false
   player.setCollider("rectangle",0,0,250,250)

   life3= createSprite (displayWidth-160, displayHeight-840 ,50,50)
   life3.addImage(life3Img)
   life3.scale=0.3
   life3.visible=true;

   life2= createSprite (displayWidth-160, displayHeight-840 ,50,50)
   life2.addImage(life2Img)
   life2.scale=0.3
   life2.visible=false;

   life1= createSprite (displayWidth-160, displayHeight-840 ,50,50)
   life1.addImage(life1Img)
   life1.scale=0.3
   life1.visible=false;

   gameOver = createSprite (displayWidth/2, displayHeight/2+30, 50,50)
   gameOver.addImage(gameOverImg)
   gameOver.scale=0.6
   gameOver.visible=false;

   reset = createSprite (displayWidth/2, displayHeight/2+180,50,50)
   reset.addImage (resetImg)
   reset.scale=0.3
   reset.visible=false;

   zombieGroup= new Group();
   bulletsGroup = new Group();

}



function draw() {
  background(0); 

  

if (gameState==="play"){
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
 player.x = player.x+30

 
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  createbullets();
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(player.isTouching(topEdge)){
  player.bounceOff();
}
spawnZombie(); }



if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      lives=lives-1
      life2.visible=true;
      life3.visible=false;
    }}}




    if(lives===1){
      life1.visible=true;
      life2.visible=false;
    }
    if(lives===0){
      life1.visible=false;
      life2.visible=false;
      life3.visible=false;
      gameState="lost"
      }
    


if(gameState==="lost"){
  lose.stop();
  gameOver.visible=true;
  reset.visible=true;
  zombieGroup.destroyEach();

  player.destroy();
  if(mousePressedOver(reset)){
    gameState="play"
    //console.log("hello")
  }
  console.log(gameState)
  
}




if(zombieGroup.isTouching(bulletsGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletsGroup)){
      gunShot.stop();
      zombieGroup[i].destroy();
      bullets.destroy();

    }
  }
}


drawSprites();


textSize (40)
fill ("black")
text("Score: "+lives, displayWidth-230, displayHeight-770);

}

function spawnZombie(){



  if(frameCount % 50 == 0){
  zombie= createSprite (displayWidth-200, Math.round(random(displayHeight-250,displayHeight-550)) ,50,50);
  zombie.addImage(zombieImg)
  zombie.scale= 0.25
  zombie.debug= false
  zombie.velocityX=-6
  zombie.setCollider("rectangle",0,0,400,900)

  zombie.lifetime=600;
  
  
  zombieGroup.add(zombie)
}}

function createbullets(){

  //bullets.lifetime=600


  bullets= createSprite(500,400,60,12);
  bullets.addImage(bulletsImg)
  bullets.y=player.y-5
  bullets.x=player.x+5
  bullets.scale=0.2
  bullets.velocityX=15
  bulletsGroup.add(bullets)
  bullets.setCollider("rectangle",0,0,50,50)

}
