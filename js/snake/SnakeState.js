/**
 * State в Phaser - это как бы часть игры с собственной предзагрузкой
 *    соответственно в него следует упаковывать отдельные игры или части тяжелой игры *
 */
var SnakeState = {
    snakeGame: {  // собственно скелет нашей игрушки
        world: WorldState, // модель мира, пассивная как упавшая ель
        logic: GameLogic,  // логика мира, меняет только модель
        controller: InputController, // ввод, использует phaserGame и меняет модель мира
        renderer: SnakeRenderer, // вывод графики Змейки
        bitmapData: null, //  BitmapData для прямых манипуляция с Canvas
    },
    frameCounter: 0 // подсчет скорости
};

// После передачи этого объекта в Phaser.Game у него появится куча свойств State из Phaser
// поэтому нужно быть внимательным ко внутренним переменным - они могут быть переопределены

// Здесь размещаем загрузку необходимых ассетов и инициализацию
SnakeState.preload = function () {
    this.snakeGame.renderer.preload(this.game);
};

// Здесь создаем спрайты и другие объекты, которые требуют загруженных ассетов
SnakeState.create = function () {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // подключаем нашу змейку к Phaser game.
    this.snakeGame.controller.init(this.snakeGame.world, this.game); // this.game это как раз ссылка на будущий game в State
    this.snakeGame.logic.init(this.snakeGame.world); // подключаем мир к логике
    this.snakeGame.logic.start(30, 30); // запускаем работу логики
    this.snakeGame.renderer.create(this.snakeGame.world, 14, 72);
};

// Здесь исполняем логику
SnakeState.update = function () {

    this.frameCounter++; // для подсчета скорости
    if(this.frameCounter != GameConfig.SNAKE_MOVE_IN_FRAMES) return;
    this.frameCounter = 0;
    this.snakeGame.controller.update(); // отслеживаем управление, управление обновляет модель
    this.snakeGame.logic.update(); // логика смотрит на модель, и меняет ее по указанном последнему направлению
    this.snakeGame.renderer.update(); // обновляем рендерер

    if(this.snakeGame.world.gameover){}
};