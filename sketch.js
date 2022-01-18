
var backGround, backround;
var gameState = "play"
var shrub, shrubimg,shrubimg2,shrubimg3, shrubGroup;
var score = 0
var girl, girlimg, girldead;
var die;


function preload(){
shrubimg = loadImage("obstacle1.png");
shrubimg2 = loadImage("obstacle2.png");
shrubimg3 = loadImage("obstacle3.png");


backround = loadImage("Road.png");
girlimg = loadAnimation("opponent4.png", "opponent5.png");
girldead = loadAnimation("opponent6.png");
die = loadSound("die.mp3");

}

function setup() {
 createCanvas(600,600);
 
shrubGroup = new Group();


backGround = createSprite(200,180,400,20);
  backGround.addImage("ground",backround);
  
  

  

girl = createSprite(50,300);
girl.addAnimation("running", girlimg)
girl.addAnimation("dead", girldead)

girl.scale = 0.1
score = 0

gameState = "play"


}
function draw() {
  console.log(score)
  girl.debug = true

    background("white")
 drawSprites()
 

if(gameState === "play"){
  
 if(backGround.x < 0){
   backGround.x = 800
 }
 backGround.velocityX = -5
  

  stroke("grey")
  fill("white")
  textSize(30)
  text("Score: "+ score, 200,50);

score = score + Math.round(getFrameRate()/50);
  

  backGround.scale = 0.5
  
  girl.changeAnimation("running", girlimg)

if(shrubGroup.isTouching(girl)){
  score = 0

  gameState = "end"  
  die.play()
}



spawnObstacles()
  


 if(keyDown("down_arrow")){
    girl.y = girl.y + 3
  }
  if(keyDown("up_arrow")){
    girl.y = girl.y - 3
  }

}
  


if(gameState === "end"){
    stroke("yellow")
   fill("yellow")
   textSize(30)
   text("GAMEOVER",230,250)
   backGround.velocityX = 0
   shrubGroup.velocityX = 0
   shrub.velocityX = 0
   girl.changeAnimation("dead", girldead)
  
}

  
}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var shrub = createSprite(800, Math.round(random(0,800)));
    shrub.velocityX = -(6 + score/100);
    shrub.scale = 0.1
    shrubGroup.add(shrub);
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: shrub.addImage(shrubimg);
               break;
       case 2: shrub.addImage(shrubimg2);
               break;
       case 3: shrub.addImage(shrubimg3);
       default: break;
       
     }
    }
  }
