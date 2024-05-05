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

let currentPiece;
let currentX;
let currentY;
let currentRotation = 0;
let rotatedState;
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
}

function moveDown() {
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

function moveLeft() {
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

function moveRight() {
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
        drawBlock(x + j, y + i, iColor);
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
        drawBlock(x + j, y + i, lColor);
      }
    }
  }
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
    currentL = rotatedState; //error

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

function sendJ() {
  currentRotation = 0;
  currentPiece = "J";

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawJ(startX, startY);
}

function drawJ(x, y) {
  for (let i = 0; i < jShape.length; i++) {
    for (let j = 0; j < jShape[i].length; j++) {
      if (jShape[i][j]) {
        drawBlock(x + j, y + i, jColor);
      }
    }
  }
}

// function rotateJ(x, y) {
//   if (currentRotation === 0) {
//     rotatedState = [
//       [1, 1, 1],
//       [0, 0, 1],
//     ];
//     clearPrevious();
//     for (let i = 0; i < rotatedState.length; i++) {
//       for (let j = 0; j < rotatedState[i].length; j++) {
//         if (rotatedState[i][j]) {
//           drawBlock(x + j, y + i, "green");
//         }
//       }
//     }
//     currentL = rotatedState; //error

//     currentRotation++;
//   } else if (currentRotation === 1) {
//     rotatedState = [
//       [1, 1],
//       [0, 1],
//       [0, 1],
//     ];
//     clearPrevious();

//     for (let i = 0; i < rotatedState.length; i++) {
//       for (let j = 0; j < rotatedState[i].length; j++) {
//         if (rotatedState[i][j]) {
//           drawBlock(x + j, y + i, "green");
//         }
//       }
//     }
//     currentL = rotatedState;
//     currentRotation++;
//   } else if (currentRotation === 2) {
//     rotatedState = [
//       [0, 0, 1],
//       [1, 1, 1],
//     ];
//     clearPrevious();
//     for (let i = 0; i < rotatedState.length; i++) {
//       for (let j = 0; j < rotatedState[i].length; j++) {
//         if (rotatedState[i][j]) {
//           drawBlock(x + j, y + i, "green");
//         }
//       }
//     }
//     currentL = rotatedState;
//     currentRotation++;
//   } else if (currentRotation === 3) {
//     rotatedState = [
//       [0, 1],
//       [0, 1],
//       [1, 1],
//     ];
//     clearPrevious();
//     for (let i = 0; i < rotatedState.length; i++) {
//       for (let j = 0; j < rotatedState[i].length; j++) {
//         if (rotatedState[i][j]) {
//           drawBlock(x + j, y + i, "green");
//         }
//       }
//     }
//     currentL = rotatedState;
//     currentRotation = 0;
//   }
// }

function sendO() {
  currentRotation = 0;
  currentPiece = "O";

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawO(startX, startY);
}

function drawO(x, y) {
  for (let i = 0; i < oShape.length; i++) {
    for (let j = 0; j < oShape[i].length; j++) {
      if (oShape[i][j]) {
        drawBlock(x + j, y + i, oColor);
      }
    }
  }
}

function sendS() {
  currentRotation = 0;
  currentPiece = "S";

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawS(startX, startY);
}

function drawS(x, y) {
  for (let i = 0; i < sShape.length; i++) {
    for (let j = 0; j < sShape[i].length; j++) {
      if (sShape[i][j]) {
        drawBlock(x + j, y + i, sColor);
      }
    }
  }
}

function sendT() {
  currentRotation = 0;
  currentPiece = "T";

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawT(startX, startY);
}

function drawT(x, y) {
  for (let i = 0; i < tShape.length; i++) {
    for (let j = 0; j < tShape[i].length; j++) {
      if (tShape[i][j]) {
        drawBlock(x + j, y + i, tColor);
      }
    }
  }
}

function sendZ() {
  currentRotation = 0;
  currentPiece = "Z";

  const startX = 4;
  const startY = 0;

  currentX = startX;
  currentY = startY;
  drawZ(startX, startY);
}

function drawZ(x, y) {
  for (let i = 0; i < zShape.length; i++) {
    for (let j = 0; j < zShape[i].length; j++) {
      if (zShape[i][j]) {
        drawBlock(x + j, y + i, zColor);
      }
    }
  }
}

// function resetLShape() {
//   currentL = lShape;
// }

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
}

$(() => {
  init();
  sendRandomPiece();
});
