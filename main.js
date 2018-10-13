const ROWS = 20,
  COLS = 20,
  CELL_WIDTH = 40,
  MINES = 80;
let GRID;

function setup() {
  createCanvas(COLS * CELL_WIDTH + 1, ROWS * CELL_WIDTH + 1);
  GRID = new Grid(ROWS, COLS, CELL_WIDTH, MINES);
}

function draw() {
  background(255);
  GRID.show();
}

function mousePressed() {
  let cell = GRID.get_cellAtMouse(mouseX, mouseY),
    value;
  if (cell === undefined) return;
  if (mouseButton === "left") value = cell.reveal();
  if (mouseButton === "right") cell.toggleFlag();
  if (value === 0) GRID.reveal_area(cell); // safe area
  if (value === -1) GRID.reveal(); // game over
}

document.addEventListener("contextmenu", e => {
  let x = e.pageX,
    y = e.pageY;
  if (x > 8 && x < 809 && y > 8 && y < 809) e.preventDefault();
});

let Painter = function(x, y, w, value) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.value = value;

  this.unrevealed = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
  };
  this.numberFlagged = function() {
    fill("#F2DCDE");
    rect(this.x, this.y, this.w, this.w);
    fill("black");
    textAlign("center");
    text(this.value, this.x + this.w / 2, this.y + 25);
  };
  this.blankFlagged = function() {
    fill("#F2DCDE");
    rect(this.x, this.y, this.w, this.w);
  };
  this.mineFlagged = function() {
    fill("#D9E7CD");
    rect(this.x, this.y, this.w, this.w);
    fill("#444");
    noStroke();
    triangle(
      this.x + this.w / 2,
      this.y + 24,
      this.x + this.w / 2 - 3,
      this.y + 10,
      this.x + this.w / 2 + 3,
      this.y + 10
    );
    ellipse(x + this.w / 2, this.y + 29, 4, 4);
  };
  this.flagged = function() {
    fill("#eee");
    rect(this.x, this.y, this.w, this.w);
    fill("#444");
    noStroke();
    triangle(
      this.x + this.w / 2,
      this.y + 24,
      this.x + this.w / 2 - 3,
      this.y + 10,
      this.x + this.w / 2 + 3,
      this.y + 10
    );
    ellipse(this.x + this.w / 2, this.y + 29, 4, 4);
  };
  this.mine = function() {
    fill("#eee");
    rect(this.x, this.y, this.w, this.w);
    fill("#ccc");
    ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w / 2, this.w / 2);
  };
  this.number = function() {
    fill("#ccc");
    rect(this.x, this.y, this.w, this.w);
    fill(0);
    textAlign("center");
    text(this.value, this.x + this.w / 2, this.y + 25);
  };
  this.blank = function() {
    fill("#ddd");
    rect(this.x, this.y, this.w, this.w);
  };
};
