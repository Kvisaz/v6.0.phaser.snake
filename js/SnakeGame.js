/**
 *  Фасад для частей игры
 */
var SnakeGame = {
    world: WorldState, // модель мира, пассивная как упавшая ель
    logic: GameLogic,  // логика мира, меняет только модель
    controller: InputController, // ввод, использует phaserGame и меняет модель мира
    renderer: SnakeRenderer, // вывод графики Змейки
    frameCounter: 0, // для ограничения скорости
    ui: UI, // наш интерфейс
};

SnakeGame.preload = function (game) {
    Utils.loadImageAtlases(game,"img","snake",2);
    this.renderer.preload(game);
    this.ui.preload(game); // UI накладывается поверх игры, поэтому после рендерера
};

SnakeGame.create = function (game) {
    // подключаем нашу змейку к Phaser game.
    this.controller.init(this.world, game); // this.game это как раз ссылка на будущий game в State
    this.logic.init(this.world); // подключаем мир к логике
    this.logic.start(GameConfig.LEVEL_WIDTH_TILES, GameConfig.LEVEL_HEIGHT_TILES); // запускаем работу логики
    this.renderer.create(this.world, ViewConfig.SNAKE_SCREEN_X, ViewConfig.SNAKE_SCREEN_Y);
    this.ui.create(game);
};

// Здесь исполняем логику
SnakeGame.update = function (game) {
    this.controller.update(); // отслеживаем управление, управление обновляет модель

    // Логика обновляется в зависимости от скорости
    this.frameCounter++; // для подсчета скорости
    if(this.frameCounter == GameConfig.SNAKE_MOVE_IN_FRAMES)
    {
        this.logic.update();
        this.frameCounter = 0;
    }
    this.renderer.update(); // обновляем рендерер
    this.ui.update(game); // обновляем UI

    if(this.world.gameover){
       // todo implement
        alert("GameOver");
        this.logic.restart();
    }
};