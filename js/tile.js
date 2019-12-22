/**
* Работа с тайлами
*
* @param string $position Позиция
* @param string $value Значение
*/
function Tile(position, value) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
}

/**
* Сохранение позиции
*/
Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};
/**
* Обновление позиции
*/
Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};
/**
* Сериализация позиции
*/
Tile.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    value: this.value
  };
};
