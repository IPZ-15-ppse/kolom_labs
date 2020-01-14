window.fakeStorage = {
  _data: {},

/**
* Работа с хранилищем, добавление
*
* @param id $id id
* @param val $val val
*/
  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

/**
* Работа с хранилищем, получение
*
* @param id $id id
*/
  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

/**
* Работа с хранилищем, удаление
*
* @param id $id id
*/
  removeItem: function (id) {
    return delete this._data[id];
  },

/**
* Работа с хранилищем, очистка
*
*/
  clear: function () {
    return this._data = {};
  }
};
/**
* Работа с локальным хранилищем
*
* Создает фейковое хранилище или получает локальное
*/
function LocalStorageManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}
/**
* Проверка локальным хранилищем
*
* Проверяет работоспособность локального хранилища
*/
LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";

  try {
    var storage = window.localStorage;
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

/** 
* Best score getters/setters
*/
LocalStorageManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey) || 0;
};
/**
* Установить новый лучший счет
*
* @param int $score score
*/
LocalStorageManager.prototype.setBestScore = function (score) {
  this.storage.setItem(this.bestScoreKey, score);
};

/**
* Game state getters/setters and clearing
*/
LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey);
  return stateJSON ? JSON.parse(stateJSON) : null;
};
/**
* Установить новое состояние игры
*
* @param bool $gameState gameState
*/
LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};
/**
* очистить состояние игры
*
*/
LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
};
