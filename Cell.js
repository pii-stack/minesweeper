class Cell {
  constructor(row, col, w) {
    this.isMine = false;
    this.revealed = false;
    this.flagged = false;
    this.row = row;
    this.col = col;
    this.w = w;
    this.x = col * w;
    this.y = row * w;
    this.value;
  }

  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);

    if (this.flagged) {
      if (this.gameOver) {
        if (this.value > 0) {
          fill("#F2DCDE");
          rect(this.x, this.y, this.w, this.w);
          fill("black");
          textAlign("center");
          text(this.value, this.x + this.w / 2, this.y + 25);
        }
        if (this.value === 0) {
          fill("#F2DCDE");
          rect(this.x, this.y, this.w, this.w);
        }
        if (this.value === -1) {
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
          ellipse(this.x + this.w / 2, this.y + 29, 4, 4);
        }
        return;
      } else {
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
        return;
      }
    }

    if (this.revealed) {
      if (this.isMine) {
        fill("#eee");
        rect(this.x, this.y, this.w, this.w);
        fill("#ccc");
        ellipse(
          this.x + this.w / 2,
          this.y + this.w / 2,
          this.w / 2,
          this.w / 2
        );
      } else if (this.value) {
        fill("#ccc");
        rect(this.x, this.y, this.w, this.w);
        fill(0);
        textAlign("center");
        text(this.value, this.x + this.w / 2, this.y + 25);
      } else {
        fill("#ddd");
        rect(this.x, this.y, this.w, this.w);
      }
    }
  }

  set_val(allCell) {
    if (this.isMine) return (this.value = -1);

    let value = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          allCell[this.row + i] &&
          allCell[this.row + i][this.col + j] &&
          allCell[this.row + i][this.col + j].isMine
        )
          value++;
      }
    }
    this.value = value;
  }

  get_val() {
    return this.value;
  }

  contains(x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  }
  toggleFlag() {
    if (this.gameOver || this.revealed) return;
    this.flagged = !this.flagged;
  }

  reveal(allCell, forceReveal) {
    if (forceReveal) {
      this.gameOver = true;
      this.revealed = true;
    }
    if (this.flagged) return;

    this.revealed = true;

    if (!forceReveal && this.value === -1) {
      allCell.forEach(row => {
        row.forEach(col => {
          col.reveal(null, true);
        });
      });
    }

    if (!forceReveal && this.value === 0) {
      [-1, 0, 1].forEach(i => {
        [-1, 0, 1].forEach(j => {
          if (
            allCell[this.row + i] &&
            allCell[this.row + i][this.col + j] &&
            !allCell[this.row + i][this.col + j].revealed
          )
            allCell[this.row + i][this.col + j].reveal(allCell);
        });
      });
    }
  }
}
