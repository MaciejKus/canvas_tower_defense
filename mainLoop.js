var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d'),
rectWidth = 20, //basic game unit size (pixles)
maxWidth = canvas.width, //add maxHight if not perfect square
FPS = 30,
baseSpeed = 4*rectWidth/FPS,
mouse, //mouse x and y for drawing range
currentTower = 0, //tower type selector.
//borders for attacker's path
leftBorder = maxWidth/6,
rightBorder = maxWidth*5/6,
//vertical borders:
firstBorder = maxWidth/4,
secondBorder = maxWidth/2,
thirdBorder = maxWidth*3/4,
//points/statistics
attackerPoints = 0,
stopped = 0,
//counter for when to add enemy units
addEnemyTimer = 60,
money = 250,
moneyIncrement = 5;


//draw stuff
mainLoopRender = function() {
  context.beginPath();
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i =0, j = enemies.length; i < j; i ++ ) {
    enemies[i].draw();
  }
  for(var i = 0, j = towers.length; i < j; i++ ) {
    towers[i].draw();
  }
  for(var i = 0, j = bullets.length; i < j; i++) {
    bullets[i].draw();
  }
  drawMouse(); //potential gun radius
  requestAnimationFrame(mainLoopRender);
};

//game logic (seperate from draw stuff)
mainLoopLogic = function() {
  checkForDead();
  addEnemyTimer--;
  if(addEnemyTimer<1) {
    addEnemy()
    addEnemyTimer = (stopped > 40) ? 20 : 30;  //how quicklly a new enemy is generated
  }
  for(var i =0, j = enemies.length; i < j; i ++ ) {
    //true if attacker scored
    if(enemies[i].move()){
      attackerPoints++;
      //add point outside of canvas
      document.getElementById('attackersScore').innerHTML = attackerPoints; 
      enemies.splice(i,1);
      i--;
      j--;
    }
  }
  for(var i = 0, j = towers.length; i < j; i++ ) {
    towers[i].findTarget();
    towers[i].findUnitVector();
    towers[i].fire();
  }
  //move bullets, check for hits, remove bullets if hit
  for(var i = 0, j = bullets.length; i < j; i++) {
    bullets[i].move();
    if(bullets[i].checkCollision()) {
     bullets.splice(i,1);
     j--;
     i--;
    }
  }
  setTimeout(mainLoopLogic, 1000/FPS);
};
 
window.onload = function() {
  setTimeout(mainLoopLogic, 1000/FPS);
  requestAnimationFrame(mainLoopRender);
};

