const canvas = $("#myCanvas")[0];
const ctx = canvas.getContext("2d");
// canvas.width = 400;
// canvas.height = 800;
const cw = canvas.width;
const ch = canvas.height;
const padding = 0;
let currentPiece;
let currentX;
let currentY;
let currentRotation = 0;
let rotatedState;
const pieces = ["I", "J", "L", "O", "S", "T", "Z"];
const grid = [];
const iShape = [
  [1, 0],
  [1, 0],
  [1, 0],
  [1, 0],
];
const lShape = [
  [1, 0],
  [1, 0],
  [1, 1],
];
const jShape = [
  [0, 1],
  [0, 1],
  [1, 1],
];

const sShape = [
  [0, 1, 1],
  [1, 1, 0],
];
const zShape = [
  [1, 1, 0],
  [0, 1, 1],
];
const tShape = [
  [1, 1, 1],
  [0, 1, 0],
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
  sendL();

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
      }
    }
  });
}

function setupGrid() {
  let col = 0;
  let row = 0;
  for (let i = 0; i <= cw; i += 40) {
    ctx.moveTo(i + padding, padding);
    ctx.lineTo(i + padding, ch + padding);
    ctx.strokeStyle = "black";
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
  console.log(grid);
}

function moveDown() {
  clearPrevious();
  currentY++;
  if (currentPiece === "I") {
    drawI(currentX, currentY);
  } else if (currentPiece === "L") {
    drawL(currentX, currentY);
  }
  //fill out rest
}

function moveLeft() {
  clearPrevious();
  currentX--;
  if (currentPiece === "I") {
    drawI(currentX, currentY);
  } else if (currentPiece === "L") {
    drawL(currentX, currentY);
  }
  //fill out rest
}

function moveRight() {
  clearPrevious();
  currentX++;
  if (currentPiece === "I") {
    drawI(currentX, currentY);
  } else if (currentPiece === "L") {
    drawL(currentX, currentY);
  }
  //fill out rest
}

function sendI() {
  currentPiece = "I";
  currentRotation = 0;

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawI(startX, startY);
}

function drawI(x, y) {
  for (let i = 0; i < iShape.length; i++) {
    for (let j = 0; j < iShape[i].length; j++) {
      if (iShape[i][j]) {
        drawBlock(x + j, y + i, "cyan");
      }
    }
  }
}

function sendL() {
  currentRotation = 0;
  currentPiece = "L";

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawL(startX, startY);
}

function drawL(x, y) {
  for (let i = 0; i < lShape.length; i++) {
    for (let j = 0; j < lShape[i].length; j++) {
      if (lShape[i][j]) {
        drawBlock(x + j, y + i, "green");
      }
    }
  }
}

function rotateL(x, y) {
  if (currentRotation === 0) {
    rotatedState = [
      [1, 1, 1],
      [0, 0, 1],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, "green");
        }
      }
    }
    currentL = rotatedState; //error

    currentRotation++;
  } else if (currentRotation === 1) {
    rotatedState = [
      [1, 1],
      [0, 1],
      [0, 1],
    ];
    clearPrevious();

    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, "green");
        }
      }
    }
    currentL = rotatedState;
    currentRotation++;
  } else if (currentRotation === 2) {
    rotatedState = [
      [0, 0, 1],
      [1, 1, 1],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, "green");
        }
      }
    }
    currentL = rotatedState;
    currentRotation++;
  } else if (currentRotation === 3) {
    rotatedState = [
      [0, 1],
      [0, 1],
      [1, 1],
    ];
    clearPrevious();
    for (let i = 0; i < rotatedState.length; i++) {
      for (let j = 0; j < rotatedState[i].length; j++) {
        if (rotatedState[i][j]) {
          drawBlock(x + j, y + i, "green");
        }
      }
    }
    lShape = rotatedState;
    currentRotation = 0;
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
        drawBlock(j, i, "white"); 
      }
    }
  }
}

function resetLShape() {
  currentL = lShape;
}

$(() => {
  init();
});
