var player,mask1,mask2,mask3,v1,v2,v3,v4,v5,rborder,lborder,downborder,ground,groundimg,virus,viruses,masks;
var gameState="play";
var score= 0;

function preload(){
groundimg= loadImage("bgimage.jpg");
vimg= loadAnimation("Virus Img 1.png","Virus Img 2.png","Virus Img 3.png");
mimg= loadImage("mask.png");
}

function setup() {
  createCanvas(1000,700);

  //creating the moving ground
  ground=createSprite(500,500,100,100);
  ground.scale=2;
  ground.addImage("background",groundimg);

  //creating the borders
  rborder=createSprite(1000,0,10,1000);
  rborder.visible=false;
  lborder=createSprite(0,0,10,1000);
  lborder.visible=false;
  upborder=createSprite(500,0,1000,10);
  upborder.visible=false;

  //creating the player
  player= createSprite(20,690,20,20);

  //creating the masks and viruses to block the player from reaching them
  mask1=createSprite(40,30,10,10);
  v1=createSprite(10,30,10,10);
  v1.velocityX=+5;
  mask2=createSprite(960,30,10,10);
  v2=createSprite(990,50,10,10);
  v2.velocityX=-5;
  mask3=createSprite(500,300,10,10);
  mask1.addImage("mask img", mimg);
  mask2.addImage("mask img", mimg);
  mask3.addImage("mask img", mimg);
  mask1.scale=0.2;
  mask2.scale=0.2;
  mask3.scale=0.2;

  //creating extra virus obstacles
  v3=createSprite(200,450,10,10);
  v3.velocityX=+6;
  v4=createSprite(400,450,10,10);
  v4.velocityX=+6;
  v5=createSprite(600,450,10,10);
  v5.velocityX=+6;

  v1.addAnimation("virusimg",vimg);
  v1.scale=0.3;
  v2.addAnimation("virusimg",vimg);
  v2.scale=0.3;
  v3.addAnimation("virusimg",vimg);
  v3.scale=0.3;
  v4.addAnimation("virusimg",vimg);
  v4.scale=0.3;
  v5.addAnimation("virusimg",vimg);
  v5.scale=0.3;


}

function draw() {
  background("white");
  viruses=new Group();
  viruses.add(v1);
  viruses.add(v2);
  viruses.add(v3);
  viruses.add(v4);
  viruses.add(v5); 

  masks=new Group();
  masks.add(mask1);
  masks.add(mask2);
  masks.add(mask3);

  if(gameState==="play"){
  //making the ground move
  ground.velocityY=+5;

  if (ground.y>700){
    ground.y= 100;
    ground.velocityY=+5;
  }

  //player moves with the arrow keys
  if (keyDown(UP_ARROW)){
    player.y=player.y-7;
  }
  /*if (keyDown(DOWN_ARROW)){
    player.y=player.y+5;
  }*/
  if (keyDown(RIGHT_ARROW)){
    player.x=player.x+7;
  }
  if (keyDown(LEFT_ARROW)){
    player.x=player.x-7;
  }

  player.bounceOff(upborder);
  player.bounceOff(rborder);
  player.bounceOff(lborder);

  if (player.isTouching(masks)){
    score= score+1;
   // masks.destroy();
  }

  text("Score:"+ score,970,50);

  v1.bounceOff(rborder) ;
  v1.bounceOff(lborder) ;
  v2.bounceOff(rborder) ;
  v2.bounceOff(lborder) ;
  v3.bounceOff(lborder);
  v3.bounceOff(rborder);
  v4.bounceOff(lborder);
  v4.bounceOff(rborder);
  v5.bounceOff(lborder);
  v5.bounceOff(rborder);

  newVirus();
  newMask();
if(player.isTouching(viruses)){
  gameState="end";
}
}
if(gameState==="end"){
  ground.velocityY=0;
  viruses.destroyEach();
  masks.destroyEach();
  text("GAME OVER! YOU SCORED"+ score + "POINTS!",500,350);
}

  drawSprites();
}

function newVirus(){
if(frameCount%50===0){
 virus = createSprite(random(1,900),10,10,10); 
 virus.velocityY=+5;
 virus.addAnimation("virus img",vimg);
 virus.scale=0.3;
 viruses.add(virus);
}
}

function newMask(){
  if(frameCount%100===0){
   mask = createSprite(random(1,999),10,10,10); 
   mask.velocityY=+5;
   mask.addImage("mask img",mimg);
   mask.scale=0.2;
   masks.add(mask);
  }
  }