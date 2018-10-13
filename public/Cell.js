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
    this.value = 0;
  }

  show() {
    let painter = new Painter(this.x, this.y, this.w, this.value);
    painter.unrevealed();
    if (this.flagged) {
      if (this.gameOver) {
        if (this.value > 0) painter.numberFlagged();
        if (this.value === 0) painter.blankFlagged();
        if (this.value === -1) painter.mineFlagged();
        return;
      } else return painter.flagged();
    }
    if (this.revealed) {
      if (this.isMine) painter.mine();
      else if (this.value) painter.number();
      else painter.blank();
    }
  }

  set_val(neighbor) {
    if (this.isMine) return (this.value = -1);
    neighbor.forEach(cell => (this.value += cell.isMine ? 1 : 0));
  }

  is_mouseOn(x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  }

  toggleFlag() {
    if (this.gameOver || this.revealed) return;
    this.flagged = !this.flagged;
  }

  reveal() {
    if (this.flagged || this.revealed) return;
    this.revealed = true;
    return this.value;
  }
}
