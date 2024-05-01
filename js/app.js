const canvas = $("#myCanvas")[0];
const ctx = canvas.getContext("2d");
// canvas.width = 400;
// canvas.height = 800;
const cw = canvas.width;
const ch = canvas.height;
const padding = 0;

const pieces = ["I", "J", "L", "O", "S", "T", "Z"];
function init() {
  setupGrid();
}

function setupGrid() {
  for (let i = 0; i <= cw; i += 40) {
    ctx.moveTo(i + padding, padding);
    ctx.lineTo(i + padding, ch + padding);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
  for (let i = 0; i <= ch; i += 40) {
    ctx.moveTo(padding, i + padding);
    ctx.lineTo(cw + padding, i + padding);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

$(() => {
  init();
});
