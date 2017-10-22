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
    world: WorldState, // модель мира, пассивная как упавшая ель
    logic: GameLogic,  // логика мира, меняет только модель
    controller: InputController, // ввод, использует phaserGame и меняет модель мира
    phaserGame: null, // наш рендерер Phaser
};

// Создаем вью, куда будем выводить видимое представление, и откуда получать ввод пользователя
Application.start = function () {
    this.phaserGame = new Phaser.Game(this.width, this.height, Phaser.CANVAS, this.canvasId, this);
};

// Здесь размещаем загрузку необходимых ассетов и инициализацию
Application.preload = function () {
    console.log("Preloaded!");
};

// Здесь создаем спрайты и другие объекты, которые требуют загруженных ассетов
Application.create = function () {
    console.log("created!");
    this.controller.init(this.world, this.phaserGame); //
};

// Здесь исполняем логику
Application.update = function () {
    console.log("Updated");
    this.controller.update();

    // тестим модель
    console.log("world.direction = "+this.world.direction);
};

// run Application
Application.start();