const ROWS = 20,
  COLS = 20,
  W = 40,
  MINES = 80;
let GRID,
  cellList = [];

let make_2DArray = (row, col) => {
  let arr = [];
  while (row--) arr.push([]);
  arr.forEach((rowArr, i) => {
    let _col = col;
    while (_col--) arr[i].push(null);
  });
  return arr;
};

function setup() {
  createCanvas(COLS * W + 1, ROWS * W + 1);
  GRID = make_2DArray(ROWS, COLS);
  GRID.forEach((row, i) => {
    row.forEach((col, j) => {
      GRID[i][j] = new Cell(i, j, W);
      cellList.push({ row: i, col: j });
    });
  });
  let mines = MINES;
  while (mines--) {
    let mine = cellList.splice(floor(random(cellList.length)), 1);
    GRID[mine[0].row][mine[0].col].isMine = true;
  }
}

function draw() {
  background(255);
  GRID.forEach(row => {
    row.forEach(col => {
      col.show();
    });
  });

  GRID.forEach(row => {
    row.forEach(col => {
      col.set_val(GRID);
    });
  });
}

function mousePressed() {
  GRID.forEach(row => {
    row.forEach(col => {
      if (col.contains(mouseX, mouseY)) {
        if (mouseButton === "right") col.toggleFlag();
        if (mouseButton === "left") col.reveal(GRID);
      }
    });
  });
}

document.addEventListener("contextmenu", function(event) {
  let x = event.pageX,
    y = event.pageY;
  if (x > 8 && x < 809 && y > 8 && y < 809) event.preventDefault();
});
