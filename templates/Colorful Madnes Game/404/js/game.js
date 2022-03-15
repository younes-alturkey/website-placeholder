"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var Color = function () {
  function Color() {
    var _this = this;

    var level = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var maxLevel = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

    _classCallCheck(this, Color);

    this.maxLevel = maxLevel;
    this.level = level;
    this.color = Array.from({ length: 3 }, function () {
      return randomNumber(_this.maxLevel, 255);
    });
    this.colorVariant = this._makeColorVariant();
  }

  Color.prototype._makeColorVariant = function _makeColorVariant() {
    var _this2 = this;

    var newColor = [].concat(this.color);
    return newColor.map(function (a) {
      return a - (10 + _this2.maxLevel - _this2.level);
    });
  };

  Color.prototype.print = function print(color) {
    return "rgb(" + color.join() + ")";
  };

  Color.prototype.fake = function fake() {
    return this.print(this.color);
  };

  Color.prototype.correct = function correct() {
    return this.print(this.colorVariant);
  };

  return Color;
}();

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.gameWidth = (window.innerWidth / 2) - 10;
    if (this.gameWidth > 500) this.gameWidth = 500;

    this.scene = [];

    this.stage = new Konva.Stage({
      container: "#app",
      width: this.gameWidth,
      height: this.gameWidth
    });

    this.levelLayer = new Konva.Layer();
    this.gameOverLayer = new Konva.Layer();
    this.gameWinLayer = new Konva.Layer();

    this.stage.add(this.levelLayer);
    this.stage.add(this.gameOverLayer);
    this.stage.add(this.gameWinLayer);

    this._newGame();
  }

  Game.prototype._newGame = function _newGame() {
    this.difficulty = 1;
    this.difficultyLevel = 30;
    this.size = 4;
    this.dateStart = new Date();
    this.level = [];

    this._createLevel();
  };

  Game.prototype._gameWin = function _gameWin() {
    var _this3 = this;

    var background = new Konva.Rect({
      x: 0,
      y: 0,
      fill: "black",
      width: this.gameWidth,
      height: this.gameWidth
    });

    // add the shapes to the layer
    this.gameWinLayer.add(background);

    var text = new Konva.Text({
      text: "YOU WON!\n\nAre you magician? Well done!\n\nIf you like it, I'd appreciated your ❤️\n\n(click to restart)\n",
      fontSize: 13,
      opacity: 0,
      width: this.gameWidth,
      fill: "white",
      align: "center"
    });

    text.y(this.gameWidth / 2 - text.getHeight());

    var emoji = new Konva.Text({
      y: this.gameWidth / 2,
      text: "🎉",
      width: this.gameWidth,
      fontSize: 10,
      opacity: 0,
      fill: "white",
      align: "center"
    });

    emoji.y(this.gameWidth / 2 - emoji.getHeight() + this.gameWidth / 4);

    this.gameWinLayer.add(text, emoji);

    text.to({
      easing: Konva.Easings.ElasticEaseOut,
      opacity: 1,
      duration: 0.7,
      fontSize: 20
    });

    emoji.to({
      easing: Konva.Easings.EaseIn,
      opacity: 1,
      duration: 0.4,
      fontSize: 50
    });

    this.gameWinLayer.draw();

    this.gameWinLayer.on("mousedown touchstart", function () {
      // hide the game over screen
      _this3.gameWinLayer.clear();
      // start new game
      _this3._newGame();
    });
  };

  Game.prototype._gameOver = function _gameOver() {
    var _this4 = this;

    var background = new Konva.Rect({
      x: 0,
      y: 0,
      fill: "black",
      width: this.gameWidth,
      height: this.gameWidth
    });

    // add the shapes to the layer
    this.gameOverLayer.add(background);

    var text = new Konva.Text({
      text: "GAME OVER!\n\nYour score is: " + (this.difficulty - 1) + "\n\nIf you like it, I'd appreciated your ❤️\n\n(click to restart)\n",
      fontSize: 13,
      opacity: 0,
      width: this.gameWidth,
      fill: "white",
      align: "center"
    });

    text.y(this.gameWidth / 2 - text.getHeight());

    var emoji = new Konva.Text({
      y: this.gameWidth / 2,
      text: "🤓",
      width: this.gameWidth,
      fontSize: 10,
      opacity: 0,
      fill: "white",
      align: "center"
    });

    emoji.y(this.gameWidth / 2 - emoji.getHeight() + this.gameWidth / 4);

    this.gameOverLayer.add(text, emoji);

    text.to({
      easing: Konva.Easings.ElasticEaseOut,
      opacity: 1,
      duration: 0.7,
      fontSize: 20
    });

    emoji.to({
      easing: Konva.Easings.EaseIn,
      opacity: 1,
      duration: 0.4,
      fontSize: 50
    });

    this.gameOverLayer.draw();

    this.gameOverLayer.on("mousedown touchstart", function () {
      // hide the game over screen
      _this4.gameOverLayer.clear();
      // start new game
      _this4._newGame();
    });
  };

  Game.prototype._clickHandler = function _clickHandler(id) {
    var isCorrectTile = this.level[id].win;
    if (isCorrectTile) {
      this._levelUp();
    } else {
      this._gameOver();
    }
  };

  Game.prototype._levelUp = function _levelUp() {
    this.difficulty++;

    if (this.difficulty > this.difficultyLevel) {
      this._gameWin();
      return;
    }

    if (this.difficulty % 4 === 0) this.size++;
    this._createLevel();
  };

  Game.prototype._clearLevel = function _clearLevel() {
    this.scene.forEach(function (tile) {
      tile.destroy();
    });
    this.level = [];
  };

  Game.prototype._createLevel = function _createLevel() {
    var _this5 = this;

    var color = new Color(this.difficulty, this.difficultyLevel);
    var mapSize = Math.pow(this.size, 2);
    var tileGutter = 10;
    var tileWidth = Math.round(this.gameWidth / this.size) - tileGutter / this.size;
    var correctTile = randomNumber(0, mapSize);

    this._clearLevel();

    for (var i = 0; i < mapSize; i++) {
      this.level.push({
        x: i % this.size,
        y: Math.floor(i / this.size),
        win: i === correctTile
      });
    }

    this.scene = this.level.map(function (_ref, id) {
      var x = _ref.x;
      var y = _ref.y;
      var win = _ref.win;

      var tileColor = win ? color.correct() : color.fake();
      return new Konva.Rect({
        id: id,
        x: x * tileWidth + tileGutter,
        y: y * tileWidth + tileGutter,
        width: tileWidth - tileGutter,
        height: tileWidth - tileGutter,
        fill: tileColor
      }).on("mousedown touchstart", function () {
        return _this5._clickHandler(id);
      }).on("mouseenter", function (_ref2) {
        var target = _ref2.target;

        _this5.stage.container().style.cursor = "pointer";
      }).on("mouseleave", function (_ref3) {
        var target = _ref3.target;

        _this5.stage.container().style.cursor = "default";
      });
    });

    this.scene.forEach(function (tile) {
      _this5.levelLayer.add(tile);
    });

    this.levelLayer.draw();
  };

  return Game;
}();

new Game();