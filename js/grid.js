/**
* Работа с ячейкой
*
* Конструктор ячейки
*
* @param string $size размер
* @param string $previousState предыдущее состояние
*/
function Grid(size, previousState) {
  this.size = size;
  this.cells = previousState ? this.fromState(previousState) : this.empty();
}

/**
* Build a grid of the specified size
*/
Grid.prototype.empty = function () {
  var cells = [];

  for (var x = 0; x < this.size; x++) {
    var row = cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(null);
    }
  }

  return cells;
};
/**
* Работа с ячейкой
*
* Изменение состояния ячейки
*
* @param string $state состояние
*/
Grid.prototype.fromState = function (state) {
  var cells = [];

  for (var x = 0; x < this.size; x++) {
    var row = cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      var tile = state[x][y];
      row.push(tile ? new Tile(tile.position, tile.value) : null);
    }
  }

  return cells;
};
/**
* Find the first available random position
*
*/
Grid.prototype.randomAvailableCell = function () {
  var cells = this.availableCells();

  if (cells.length) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};
/**
* Find the available position
*
*/
Grid.prototype.availableCells = function () {
  var cells = [];

  this.eachCell(function (x, y, tile) {
    if (!tile) {
      cells.push({ x: x, y: y });
    }
  });

  return cells;
};
/**
* Call callback for every cell
*
* @param callback $callback callback
*/
Grid.prototype.eachCell = function (callback) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      callback(x, y, this.cells[x][y]);
    }
  }
};
/**
* Check if there are any cells available
*
*/
Grid.prototype.cellsAvailable = function () {
  return !!this.availableCells().length;
};

/**
* Check if the specified cell is taken
*
* @param cell $cell cell
*/
Grid.prototype.cellAvailable = function (cell) {
  return !this.cellOccupied(cell);
};
/**
* Check if the specified cell is occupied
*
* @param cell $cell cell
*/
Grid.prototype.cellOccupied = function (cell) {
  return !!this.cellContent(cell);
};
/**
* Check specified cell content
*
* @param cell $cell cell
*/
Grid.prototype.cellContent = function (cell) {
  if (this.withinBounds(cell)) {
    return this.cells[cell.x][cell.y];
  } else {
    return null;
  }
};

/**
* Вставка тайла в его позицию
*
* @param string $tile тайл
*/
Grid.prototype.insertTile = function (tile) {
  this.cells[tile.x][tile.y] = tile;
};
/**
* Удаление тайла
*
* @param string $tile тайл
*/
Grid.prototype.removeTile = function (tile) {
  this.cells[tile.x][tile.y] = null;
};
/**
* Проверка в рамках ли
*
* @param string $position позиция
*/
Grid.prototype.withinBounds = function (position) {
  return position.x >= 0 && position.x < this.size &&
         position.y >= 0 && position.y < this.size;
};

/**
* serialize
*/
Grid.prototype.serialize = function () {
  var cellState = [];

  for (var x = 0; x < this.size; x++) {
    var row = cellState[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
    }
  }

  return {
    size: this.size,
    cells: cellState
  };
};
