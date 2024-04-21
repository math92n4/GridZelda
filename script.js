console.log('he')

document.addEventListener('DOMContentLoaded', start)

let lastTimestamp = 0;

function start() {
  createGame();
  document.addEventListener('keydown', keyPress)
  document.addEventListener('keyup', keyUp)
  requestAnimationFrame(tick);
}

function tick(timestamp) {
    requestAnimationFrame(tick);
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp
    movePlayer(deltaTime);
    displayPlayerAtPosition();
    displayPlayerAnimation();
}

function createGame() {
  const background = document.getElementById('background');
  background.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
  console.log(background)
  
  for(let i = 0; i < GRID_HEIGHT; i++) {
    for(let j = 0; j < GRID_WIDTH; j++) {
      const tile = document.createElement('div')
      tile.style.setProperty("--TILE_SIZE", tileSize + 'px')
      tile.classList.add('tile')

      const tileNumber = getTileAtCoord(i, j)
      const className = getClassForTileType(tileNumber)

      tile.classList.add(className);

      background.appendChild(tile)
    }
  }
}

function getClassForTileType(tileNumber) {
  let className;
  switch(tileNumber) {
    case 0:
      className = 'grass'
      break;
    case 1:
      className = 'road'
      break;
    case 2:
      className = 'floor'
      break;
    case 3:
      className = 'water'
      break;
    case 4:
      className = 'sand'
      break;
    case 5:
      className = 'wall2'
  }
  return className;
}

function displayPlayerAtPosition() {
    const visualPlayer = document.getElementById('player');
    visualPlayer.style.translate = `${player.x - player.regX}px ${player.y - player.regY}px`;
}

function displayPlayerAnimation() {
    const visualPlayer = document.getElementById('player');
    if(player.moving) {
        visualPlayer.classList.add('animate')
        visualPlayer.classList.remove('up','down','right','left')
        visualPlayer.classList.add(player.direction)
    } else {
        visualPlayer.classList.remove('animate')
    }
}

function showDebugging() {

}

function lightTile(row, col) {

}

function unLightTile(row, col) {

} 

function keyUp(event) {
    if(event.key === 'w') {
      controls.up = false;
    } else if(event.key === 's') {
      controls.down = false;
    } else if(event.key === 'a') {
      controls.left = false;
    } else if(event.key === 'd'){
      controls.right = false;
    }
  }
  
  function keyPress(event) {
    if(event.key === 'w') {
      controls.up = true;
    } else if(event.key === 's') {
      controls.down = true;
    } else if(event.key === 'a') {
      controls.left = true;
    } else if(event.key === 'd'){
      controls.right = true;
    }
  }

function movePlayer(deltaTime) {
    player.moving = false;

    const newPos = {
        x: player.x,
        y: player.y
    }

    if (controls.left) {
        player.moving = true;
        player.direction = "left";
        newPos.x -= player.speed * deltaTime;
    } else if(controls.right) {
        player.moving = true;
        player.direction = "right";
        newPos.x += player.speed * deltaTime;
    }
    
    if(controls.up) {
        player.moving = true;
        player.direction = "up";
        newPos.y -= player.speed * deltaTime;
    } else if(controls.down) {
        player.moving = true;
        player.direction = "down";
        newPos.y += player.speed * deltaTime;
    }

    if(canMoveTo(newPos)) {
        player.x = newPos.x;
        player.y = newPos.y;
    }
}

function canMoveTo(pos) {
  const coord = coordFromPos(pos.x, pos.y)
  console.log(coord)

    // FIX THIS
  if(coord.row < 0 || coord.col < 0 || coord.row > 8 || coord.col > 14) {
    return false;
  }
  
  const tileValue = getTileAtCoord(coord.row, coord.col)
  console.log(tileValue);

  if(tileValue === 3 || tileValue === 5) {
    return false;
  }
    return true;
}

const controls = {
    left: false,
    right: false,
    up: false,
    down: false
}

const tiles = [
  [1,1,0,0,0,0,5,2,2,2,2,5,0,0,0,0],
  [1,1,0,0,0,0,5,2,2,2,2,5,0,0,0,0],
  [1,1,0,0,0,0,5,5,2,2,5,5,0,0,0,0],
  [1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
  [1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const GRID_HEIGHT = tiles.length
const GRID_WIDTH = tiles[0].length
const tileSize = 40

function getTileAtCoord(row,col) {
  return tiles[row][col]
}

function coordFromPos(x, y) {
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);
  return { row, col };
}

function posFromCoord(row, col) {
  const x = row * tileSize
  const y = col * tileSize
  return { x, y }
}

function getTileCoordUnder(player) {
  const coord = coordFromPos(player.x, player.y);
  return coord;
}

const player = {
    x: 0,
    y: 0,
    regX: 8,
    regY: 12,
    speed: 100,
    moving: false,
    direction: undefined
}

