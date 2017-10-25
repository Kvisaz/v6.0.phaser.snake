/**
 *   Общий модуль для запуска всех Phaser-игр / приложений
 *
 *   Phaser управляет циклом обновления, поэтому сделать Application независимым от конкретного
 *   Phaser пока не представляется возможным
 */

var Application = {
    width: 540,
    height: 960,
    canvasId: "canvas",
    appGame: SnakeGame, // AppGame - это наша игра, вкладываемая в это приложение
    phaserGame: null, // наша Phaser-игра, по сути ссылка на движок
};

function SingleState(AppGame) {
    this.AppGame = AppGame;
    this.preload = function () {
        this.AppGame.preload(this.game); // методу нашей игры передаем Phaser-движок
    };
    this.create = function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // для масштабирования во весь экран
        this.AppGame.create(this.game); // подключаем нашу змейку к Phaser game.
    };
    this.update = function () {
        this.AppGame.update(this.game);
    };
}


// Создаем Phaser-игру с состоянием на базе нашей игры
Application.start = function () {
    this.phaserGame = new Phaser.Game(this.width, this.height, Phaser.CANVAS, this.canvasId, new SingleState(this.appGame));
};

// run Application
Application.start();