/**
 *  Фасад для частей игры
 */
var SnakeGame = {
    world: WorldState, // модель мира, пассивная как упавшая ель
    logic: GameLogic,  // логика мира, меняет только модель
    controller: InputController, // ввод, использует phaserGame и меняет модель мира
    renderer: SnakeRenderer, // вывод графики Змейки
    frameCounter: 0, // для ограничения скорости
};

SnakeGame.preload = function (game) {
    this.renderer.preload(game);
};

SnakeGame.create = function (game) {
    // подключаем нашу змейку к Phaser game.
    this.controller.init(this.world, game); // this.game это как раз ссылка на будущий game в State
    this.logic.init(this.world); // подключаем мир к логике
    this.logic.start(30, 30); // запускаем работу логики
    this.renderer.create(this.world, 14, 72);
};

// Здесь исполняем логику
SnakeGame.update = function () {
    this.frameCounter++; // для подсчета скорости
    if(this.frameCounter != GameConfig.SNAKE_MOVE_IN_FRAMES) return;
    this.frameCounter = 0;

    this.controller.update(); // отслеживаем управление, управление обновляет модель
    this.logic.update(); // логика смотрит на модель, и меняет ее по указанном последнему направлению
    this.renderer.update(); // обновляем рендерер

    if(this.world.gameover){
       // todo implement
        alert("GameOver");
        this.logic.restart();
    }
};