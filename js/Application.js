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
    phaserGame: null, // наша Phaser-игра, реальное воплощение игрушки
};

// Создаем вью, куда будем выводить видимое представление, и откуда получать ввод пользователя
Application.start = function () {
    // Создаем Phaser-игру с состоянием SnakeState
    this.phaserGame = new Phaser.Game(this.width, this.height, Phaser.CANVAS, this.canvasId, SnakeState);
};

// run Application
Application.start();