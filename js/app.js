const canvas = $("#myCanvas")[0];
const ctx = canvas.getContext("2d");

const cw = canvas.width;
const ch = canvas.height;
const padding = 0;

const lColor = "orange";
const iColor = "cyan";
const zColor = "red";
const jColor = "blue";
const sColor = "#0FFF50"; //neon green
const tColor = "purple";
const oColor = "yellow";

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
  if (pieceInMotion) {
    intervalId = setInterval(moveDown, 1000);
  }

  console.log("current piece: " + currentPiece);
  console.log(grid);
}

function setupGrid() {
  let col = 0;
  let row = 0;
  ctx.strokeStyle = "black";

  for (let i = 0; i <= cw; i += 40) {
    ctx.moveTo(i, padding);
    ctx.lineTo(i, ch - padding);
    ctx.stroke();
    grid.push([]);
    for (let j = 0; j <= ch; j += 40) {
      ctx.moveTo(i, j + padding);
      ctx.lineTo(cw, j + padding);
      ctx.strokeStyle = "black";
      ctx.stroke();
      grid[col].push(row);
      row++;
    }
    col++;
    row = 0;
  }
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
  if (currentY === grid[0].length - 1 - currentHeight) {
    console.log("can't move down");
    pieceInMotion = false;
    sendRandomPiece();
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

function drawBlock(x, y, color) {
  ctx.beginPath(x * 40, y * 40);
  ctx.rect(x * 40, y * 40, 40 - padding * 2, 40 - padding * 2);
  ctx.fillStyle = color;

  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
}

function clearPrevious() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== 0) {
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
    currentHeight = 3;
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
        }
      }
    }
    currentL = rotatedState;
    currentWidth = 2;
    currentHeight = 3;
    currentRotation++;
  } else if (currentRotation === 3) {
    rotatedState = lShape;
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, lColor);
        }
      }
    }
    currentJ = rotatedState;
    currentWidth = 3;
    currentHeight = 2;
    currentRotation = 0;
  }
}
function rotateJ(x, y) {
  if (currentRotation === 0) {
    rotatedState = [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, jColor);
        }
      }
    }
    currentWidth = 3;
    currentHeight = 3;
    currentJ = rotatedState; //error

    currentRotation++;
  } else if (currentRotation === 1) {
    rotatedState = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ];
    clearPrevious();

    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, jColor);
        }
      }
    }
    currentJ = rotatedState;
    currentWidth = 3;
    currentHeight = 3;
    currentRotation++;
  } else if (currentRotation === 2) {
    rotatedState = [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, jColor);
        }
      }
    }
    currentJ = rotatedState;
    currentWidth = 2;
    currentHeight = 3;
    currentRotation++;
  } else if (currentRotation === 3) {
    rotatedState = jShape;
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, jColor);
        }
      }
    }
    currentJ = rotatedState;
    currentWidth = 2;
    currentHeight = 3;
    currentRotation = 0;
  }
}
function rotateS(x, y) {
  if (currentRotation === 0) {
    rotatedState = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, sColor);
        }
      }
    }
    currentS = rotatedState; //error
    currentWidth = 3;
    currentHeight = 3;

    currentRotation++;
  } else if (currentRotation === 1) {
    rotatedState = [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ];
    clearPrevious();

    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, sColor);
        }
      }
    }
    currentS = rotatedState;
    currentWidth = 3;
    currentHeight = 3;
    currentRotation++;
  } else if (currentRotation === 2) {
    rotatedState = [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, sColor);
        }
      }
    }
    currentS = rotatedState;
    currentWidth = 2;
    currentHeight = 3;
    currentRotation++;
  } else if (currentRotation === 3) {
    rotatedState = sShape;
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, sColor);
        }
      }
    }
    currentS = rotatedState;
    currentWidth = 3;
    currentHeight = 2;

    currentRotation = 0;
  }
}
function rotateZ(x, y) {
  if (currentRotation === 0) {
    rotatedState = [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, zColor);
        }
      }
    }
    currentZ = rotatedState; //error
    currentWidth = 3;
    currentHeight = 3;

    currentRotation++;
  } else if (currentRotation === 1) {
    rotatedState = [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ];
    clearPrevious();

    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, zColor);
        }
      }
    }
    currentZ = rotatedState;
    currentWidth = 3;
    currentHeight = 3;
    currentRotation++;
  } else if (currentRotation === 2) {
    rotatedState = [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, zColor);
        }
      }
    }
    currentZ = rotatedState;
    currentWidth = 2;
    currentHeight = 3;

    currentRotation++;
  } else if (currentRotation === 3) {
    rotatedState = zShape;
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, zColor);
        }
      }
    }
    currentZ = rotatedState;
    currentWidth = 2;
    currentHeight = 3;
    currentRotation = 0;
  }
}
function rotateT(x, y) {
  if (currentRotation === 0) {
    rotatedState = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, tColor);
        }
      }
    }
    currentT = rotatedState; //error
    currentWidth = 3;
    currentHeight = 3;

    currentRotation++;
  } else if (currentRotation === 1) {
    rotatedState = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];
    clearPrevious();

    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, tColor);
        }
      }
    }
    currentT = rotatedState;
    currentWidth = 3;
    currentHeight = 3;
    currentRotation++;
  } else if (currentRotation === 2) {
    rotatedState = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, tColor);
        }
      }
    }
    currentT = rotatedState;
    currentRotation++;
    currentWidth = 2;
    currentHeight = 3;
  } else if (currentRotation === 3) {
    rotatedState = tShape;
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, tColor);
        }
      }
    }
    currentT = rotatedState;
    currentWidth = 3;
    currentHeight = 2;
    currentRotation = 0;
  }
}

$(() => {
  init();
});
