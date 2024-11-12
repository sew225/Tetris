function init() {
  const canvas = document.getElementById("tetris");
  const context = canvas.getContext("2d");
  canvas.width = 300; // this needs to be changed
  canvas.height = 600; // this needs to be changed
  context.scale(20, 20);
  let tempScore = 0;

  let setMatrix = function (width, height) {
    const matrix = [];
    while (height--) {
      matrix.push(new Array(width).fill(0));
    }
    return matrix;
  };

  let setPiece = function (type) {
    if (type === "t") {
      return [
        [0, 0, 0],
        ["#800080", "#800080", "#800080"],
        [0, "#800080", 0],
      ];
    } else if (type === "o") {
      return [
        ["#ffff00", "#ffff00"],
        ["#ffff00", "#ffff00"],
      ];
    } else if (type === "l") {
      return [
        [0, "#ffa500", 0],
        [0, "#ffa500", 0],
        [0, "#ffa500", "#ffa500"],
      ];
    } else if (type === "j") {
      return [
        [0, "#0000ff", 0],
        [0, "#0000ff", 0],
        ["#0000ff", "#0000ff", 0],
      ];
    } else if (type === "i") {
      return [
        [0, "#00ffff", 0, 0],
        [0, "#00ffff", 0, 0],
        [0, "#00ffff", 0, 0],
        [0, "#00ffff", 0, 0],
      ];
    } else if (type === "s") {
      return [
        [0, "#008000", "#008000"],
        ["#008000", "#008000", 0],
        [0, 0, 0],
      ];
    } else if (type === "z") {
      return [
        ["#ff0000", "#ff0000", 0],
        [0, "#ff0000", "#ff0000"],
        [0, 0, 0],
      ];
    }
  };

  let points = function () {
    let rowCount = 1;
    for (let y = area.length - 1; y > 0; --y) {
      let isFullRow = true;
      for (let x = 0; x < area[y].length; ++x) {
        if (area[y][x] === 0) {
          isFullRow = false;
          break;
=======
const canvas = $("#myCanvas")[0];
const ctx = canvas.getContext("2d");

const cw = canvas.width;
const ch = canvas.height;
const padding = 0;

const iColor = "cyan";
const lColor = "orange";
const jColor = "blue";
const oColor = "yellow";
const sColor = "#0FFF50"; //neon green
const zColor = "red";
const tColor = "purple";

let currentWidth;
let currentHeight;
let currentPiece;

let currentX;
let currentY;
let currentRotation = 0;
let rotatedState;
let pieceInMotion;
let intervalId;

const pieces = ["I", "J", "L", "O", "S", "T", "Z"];
const grid = [];
const iShape = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
const lShape = [
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];
const jShape = [
  [1, 0, 0],
  [1, 1, 1],
  [0, 0, 0],
];
const sShape = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0],
];
const zShape = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0],
];
const tShape = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0],
];
const oShape = [
  [1, 1],
  [1, 1],
];

let currentI = iShape,
  currentL = lShape,
  currentJ = jShape,
  currentS = sShape,
  currentZ = zShape,
  currentT = tShape,
  currentO = oShape;

function init() {
  setupGrid();
  sendRandomPiece();

  $(document).keydown(function (event) {
    if (event.which === 40) {
      //down arrow
      moveDown();
    } else if (event.which === 39) {
      //right arrow
      moveRight();
    } else if (event.which === 37) {
      //left arrow
      moveLeft();
    } else if (event.which === 38) {
      //up arrow (shift element)
      if (currentPiece === "I") {
        rotateI(currentX, currentY);
      } else if (currentPiece === "L") {
        rotateL(currentX, currentY);
      } else if (currentPiece === "J") {
        rotateJ(currentX, currentY);
      } else if (currentPiece === "S") {
        rotateS(currentX, currentY);
      } else if (currentPiece === "Z") {
        rotateZ(currentX, currentY);
      } else if (currentPiece === "T") {
        rotateT(currentX, currentY);
      } else if (currentPiece === "O") {
        rotateO(currentX, currentY);
      }
    }
  });
  // if (pieceInMotion) {
  //   intervalId = setInterval(moveDown, 1000);
  // }

  console.log("current piece: " + currentPiece);
  console.log(grid);
}

function shapeCheck() {
  let shape;
  switch (currentPiece) {
    case "I":
      shape = currentI;
      break;
    case "L":
      shape = currentL;
      break;
    case "J":
      shape = currentJ;
      break;
    case "O":
      shape = currentO;
      break;
    case "S":
      shape = currentS;
      break;
    case "Z":
      shape = currentZ;
      break;
    case "T":
      shape = currentT;
      break;
  }
  return shape;
}

function setupGrid() {
  ctx.strokeStyle = "black";

  for (let i = 0; i <= cw; i += 40) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ch);
    ctx.stroke();
    grid.push(Array(15).fill(0));
  }

  // Draw horizontal lines and fill in the grid array
  for (let j = 0; j <= ch; j += 40) {
    ctx.moveTo(0, j);
    ctx.lineTo(cw, j);
    ctx.stroke();
  }
}

function collisionCheck() {
  let currentShape = shapeCheck();
  for (let i = 0; i < currentShape.length; i++) {
    for (let j = 0; j < currentShape[i].length; j++) {
      if (currentShape[i][j] !== 0) {
        const row = currentX + j + 1;
        if (row >= grid.length || grid[row][currentY + i] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}
function sendRandomPiece() {
  const randomIndex = Math.floor(Math.random() * pieces.length);
  const randomPiece = pieces[randomIndex];
  switch (randomPiece) {
    case "I":
      sendI();
      //already defined
      break;
    case "J":
      sendJ();
      //need to define this
      break;
    case "L":
      sendL();
      //already defined
      break;
    case "O":
      sendO();
      //need to define this
      break;
    case "S":
      sendS();
      // need to define this
      break;
    case "T":
      sendT();
      //need to define this
      break;
    case "Z":
      sendZ();
      //need to define this
      break;
    default:
      console.error("Unknown piece:", randomPiece);
  }
  pieceInMotion = true;
}

function moveDown() {
  if (currentY >= grid[0].length - currentHeight || collisionCheck()) {
    console.log("can't move down");
    handlePieceStop();
    // sendRandomPiece();
  } else {
    clearPrevious();
    currentY++;
    if (currentPiece === "I") {
      drawI(currentX, currentY);
    } else if (currentPiece === "L") {
      drawL(currentX, currentY);
    } else if (currentPiece === "J") {
      drawJ(currentX, currentY);
    } else if (currentPiece === "S") {
      drawS(currentX, currentY);
    } else if (currentPiece === "Z") {
      drawZ(currentX, currentY);
    } else if (currentPiece === "T") {
      drawT(currentX, currentY);
    } else if (currentPiece === "O") {
      drawO(currentX, currentY);
    }
  }
  console.log(grid);
}

function moveLeft() {
  console.log(currentX);
  if (currentX === 0) {
    console.log("can't move left");
  } else {
    clearPrevious();
    currentX--;
    if (currentPiece === "I") {
      drawI(currentX, currentY);
    } else if (currentPiece === "L") {
      drawL(currentX, currentY);
    } else if (currentPiece === "J") {
      drawJ(currentX, currentY);
    } else if (currentPiece === "S") {
      drawS(currentX, currentY);
    } else if (currentPiece === "Z") {
      drawZ(currentX, currentY);
    } else if (currentPiece === "T") {
      drawT(currentX, currentY);
    } else if (currentPiece === "O") {
      drawO(currentX, currentY);
    }
  }
}

function moveRight() {
  console.log(currentX);

  if (currentX === grid.length - 1 - currentWidth) {
    console.log("can't move right");
  } else {
    clearPrevious();
    currentX++;
    if (currentPiece === "I") {
      drawI(currentX, currentY);
    } else if (currentPiece === "L") {
      drawL(currentX, currentY);
    } else if (currentPiece === "J") {
      drawJ(currentX, currentY);
    } else if (currentPiece === "S") {
      drawS(currentX, currentY);
    } else if (currentPiece === "Z") {
      drawZ(currentX, currentY);
    } else if (currentPiece === "T") {
      drawT(currentX, currentY);
    } else if (currentPiece === "O") {
      drawO(currentX, currentY);
    }
  }
}

function handlePieceStop() {
  updateGrid();
  sendRandomPiece();
  pieceInMotion = false;
}

function updateGrid() {
  let currentShape = shapeCheck();
  for (let i = 0; i < currentShape.length; i++) {
    for (let j = 0; j < currentShape[i].length; j++) {
      if (currentShape[i][j] !== 0) {
        const row = currentY + i;
        const col = currentX + j;
        grid[col][row] = currentShape[i][j];
      }
    }
  }
  console.log(grid);
}

function drawBlock(x, y, color) {
  ctx.fillStyle = color;

  ctx.fillRect(x * 40, y * 40, 40, 40);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * 40, y * 40, 40, 40);
}

function clearPrevious() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        drawBlock(i, j, "white");
      }
    }
  }
}

function drawI(x, y) {
  for (let i = 0; i < currentI.length; i++) {
    for (let j = 0; j < currentI[i].length; j++) {
      if (currentI[i][j]) {
        drawBlock(x + j, y + i, iColor);
      }
    }
  }
}
function drawL(x, y) {
  for (let i = 0; i < currentL.length; i++) {
    for (let j = 0; j < currentL[i].length; j++) {
      if (currentL[i][j]) {
        drawBlock(x + j, y + i, lColor);
      }
    }
  }
}
function drawJ(x, y) {
  for (let i = 0; i < currentJ.length; i++) {
    for (let j = 0; j < currentJ[i].length; j++) {
      if (currentJ[i][j]) {
        drawBlock(x + j, y + i, jColor);
      }
    }
  }
}
function drawO(x, y) {
  for (let i = 0; i < currentO.length; i++) {
    for (let j = 0; j < currentO[i].length; j++) {
      if (currentO[i][j]) {
        drawBlock(x + j, y + i, oColor);
      }
    }
  }
}
function drawS(x, y) {
  for (let i = 0; i < currentS.length; i++) {
    for (let j = 0; j < currentS[i].length; j++) {
      if (currentS[i][j]) {
        drawBlock(x + j, y + i, sColor);
      }
    }
  }
}
function drawZ(x, y) {
  for (let i = 0; i < currentZ.length; i++) {
    for (let j = 0; j < currentZ[i].length; j++) {
      if (currentZ[i][j]) {
        drawBlock(x + j, y + i, zColor);
      }
    }
  }
}
function drawT(x, y) {
  for (let i = 0; i < currentT.length; i++) {
    for (let j = 0; j < currentT[i].length; j++) {
      if (currentT[i][j]) {
        drawBlock(x + j, y + i, tColor);
      }
    }
  }
}

function sendI() {
  currentPiece = "I";
  currentRotation = 0;
  currentWidth = 4;
  currentHeight = 2;

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawI(startX, startY);
}
function sendL() {
  currentRotation = 0;
  currentPiece = "L";
  currentWidth = 3;
  currentHeight = 2;

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawL(startX, startY);
}
function sendJ() {
  currentRotation = 0;
  currentPiece = "J";
  currentWidth = 3;
  currentHeight = 2;

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawJ(startX, startY);
}
function sendO() {
  currentRotation = 0;
  currentPiece = "O";
  currentWidth = 2;
  currentHeight = 2;

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawO(startX, startY);
}
function sendS() {
  currentRotation = 0;
  currentPiece = "S";
  currentWidth = 3;
  currentHeight = 2;

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawS(startX, startY);
}
function sendZ() {
  currentRotation = 0;
  currentPiece = "Z";
  currentWidth = 3;
  currentHeight = 2;

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawZ(startX, startY);
}
function sendT() {
  currentRotation = 0;
  currentPiece = "T";
  currentWidth = 3;
  currentHeight = 2;

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawT(startX, startY);
}

function rotateI(x, y) {
  if (currentRotation === 0) {
    rotatedState = [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, iColor);
        }
      }
    }
    currentI = rotatedState; //error
    currentWidth = 4;
    currentHeight = 4;
    currentRotation++;
  } else if (currentRotation === 1) {
    rotatedState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ];
    clearPrevious();

    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, iColor);
        }
      }
    }
    currentI = rotatedState;
    currentWidth = 4;
    currentHeight = 4;
    currentRotation++;
  } else if (currentRotation === 2) {
    rotatedState = [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, iColor);
        }
      }
    }
    currentI = rotatedState;
    currentWidth = 2;
    currentHeight = 4;
    currentRotation++;
  } else if (currentRotation === 3) {
    rotatedState = iShape;
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, iColor);
        }
      }
    }
    currentI = rotatedState;
    currentWidth = 4;
    currentHeight = 2;
    currentRotation = 0;
  }
}
function rotateL(x, y) {
  if (currentRotation === 0) {
    rotatedState = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, lColor);
        }
      }
    }
    currentL = rotatedState;
    currentWidth = 3;
    currentHeight = 3;
    currentRotation++;
  } else if (currentRotation === 1) {
    rotatedState = [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ];
    clearPrevious();

    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, lColor);
        }
      }
    }
    currentL = rotatedState;
    currentWidth = 3;
    currentHeight = 3;
    currentRotation++;
  } else if (currentRotation === 2) {
    rotatedState = [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, lColor);