class Grid {
  constructor(row, col, w, mine) {
    this.ROW = row;
    this.COL = col;
    this.CELL_WIDTH = w;
    this.mine = mine;
    this.cellList = [];

    this.grid = this.make_2DArray(row, col);
    this.init();
  }

  make_2DArray(row, col) {
    let arr = [];
    while (row--) arr.push([]);
    arr.forEach((rowArr, i) => {
      let _col = col;
      while (_col--) arr[i].push(null);
    });
    return arr;
  }

  init() {
    this.grid.forEach((row, i) => {
      row.forEach((col, j) => {
        this.grid[i][j] = new Cell(i, j, this.CELL_WIDTH);
        this.cellList.push({ row: i, col: j });
      });
    });

    while (this.mine--) {
      let mine = this.cellList.splice(floor(random(this.cellList.length)), 1);
      this.grid[mine[0].row][mine[0].col].isMine = true;
    }

    this.grid.forEach(row => {
      row.forEach(cell => {
        cell.set_val(this.get_neighbor(cell));
      });
    });
  }

  show() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        cell.show();
      });
    });
  }

  get_neighbor(cell) {
    let neighbor = [];
    [-1, 0, 1].forEach(i => {
      [-1, 0, 1].forEach(j => {
        if (this.grid[cell.row + i] && this.grid[cell.row + i][cell.col + j])
          neighbor.push(this.grid[cell.row + i][cell.col + j]);
      });
    });
    return neighbor;
  }

  get_cellAtMouse(x, y) {
    if (
      this.grid[floor(y / this.CELL_WIDTH)] &&
      this.grid[floor(y / this.CELL_WIDTH)][floor(x / this.CELL_WIDTH)]
    )
      return this.grid[floor(y / this.CELL_WIDTH)][floor(x / this.CELL_WIDTH)];
  }

  reveal() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        cell.gameOver = true;
        cell.reveal();
      });
    });
  }

  reveal_area(cell) {
    this.get_neighbor(cell).forEach(_cell => {
      if (_cell.reveal() === 0) this.reveal_area(_cell);
    });
  }
}
