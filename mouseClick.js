//change tower type
function changeTower(n) {
  currentTower = n;
}

//add tower
canvas.addEventListener('mousedown', function() {
  if(towerAllowed(mouse.x,mouse.y)) {
    towers.push(new towerClasses[currentTower](mouse.x,mouse.y));
    money -= towerClasses[currentTower].prototype.cost;
    document.getElementById('money').innerHTML = money; //update money when adding tower
  }// end if

}, false);

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mouse = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
} 
 
window.addEventListener('mousemove', getMousePos, false); 

//draws transperent radius around mouse to show potential tower range
function drawMouse() {
  //needed otherwise if mouse not on canvas returns error when first loading
  if(!mouse) return;
  var range = towerClasses[currentTower].prototype.range;
  context.beginPath();
  //transperency
  context.globalAlpha = 0.2;
  context.arc(mouse.x,mouse.y,range, 0, 2*Math.PI);
  if(towerAllowed(mouse.x,mouse.y)) context.fillStyle='yellow';
  else context.fillStyle = 'red';
  context.fill();
  context.globalAlpha = 1;
}

//see if tower can be built here:
//starts at top of page
function towerAllowed(x,y) {
  if (money < towerClasses[currentTower].prototype.cost) return false; //can afford tower?
  if( y < rectWidth*3) return false;
  else if (y < firstBorder+rectWidth*2 && x > rightBorder- rectWidth  ) return false;
  else if (y > firstBorder - rectWidth && y < firstBorder + rectWidth *2 && x > leftBorder - rectWidth) return false;
  else if (y > firstBorder + rectWidth*3 && y < secondBorder + rectWidth && x > leftBorder - rectWidth && x < leftBorder + rectWidth*2) return false;
  else if (y > secondBorder - rectWidth && y < secondBorder + rectWidth * 2 && x > leftBorder + rectWidth *2) return false;
  else if (y > secondBorder && y < thirdBorder + rectWidth*2 && x > rightBorder - rectWidth) return false;
  else if (y > thirdBorder - rectWidth && y < thirdBorder + rectWidth*2) return false;
  else {
    for (var i = 0, j = towers.length; i < j; i++) {
      //check to see if existing tower is too close
      //simple rectangular check, might want to change to circular check at some poit
      if(Math.abs(x-towers[i].x) < 2*rectWidth && Math.abs(towers[i].y-y) < 2*rectWidth) { return false };   
    } //end for
  }
  return true;
}
