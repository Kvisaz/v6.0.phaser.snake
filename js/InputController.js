/**
 *  InputController
 *    использует созданную игру Phaser, чтобы отслеживать действия пользователя
 *    В зависимости от действий пользователя - меняет модель мира
 *  ... изменения должны быть минимальными, то есть в модели мира просто
 *  должны быть поля "последние действия или выбор пользователя"
 */

var InputController = {
    // наша модель мира, будет инициализирована в Application
    world: null,
    // наш рендерер-движок Phaser, будет инициализирован в Application
    phaserGame: null,
    // коды клавиш, порядок должен совпадать с порядком обработчиков в keyDirections
    keyCodes: [37, 38, 39, 40],
    // направления соответствующие клавишам
    keyDirections: [Directions.LEFT, Directions.UP, Directions.RIGHT, Directions.DOWN],
    // наши клавиши
    keys: null,
};

// инициализация моделью и движком
InputController.init = function (world, phaser) {
    this.world = world;
    this.phaserGame = phaser;

    //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
    //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
    this.keys = this.phaserGame.input.keyboard.createCursorKeys();
    console.log("InputController.init");
};

// функция обновления, 60 раз в сек проверяем, какая клавиша нажата
InputController.update = function () {
    if(this.keys.up.isDown) this.setDirection(Directions.UP);
    else if (this.keys.down.isDown) this.setDirection(Directions.DOWN);
    else if (this.keys.left.isDown) this.setDirection(Directions.LEFT);
    else if (this.keys.right.isDown) this.setDirection(Directions.RIGHT);

    console.log("InputController.update");
    console.log("InputController.this.world.direction = "+this.world.direction);
};

// Обработчики нажатий клавиш, переданных от UI
InputController.setDirection = function (keyDirection) {
    console.log("InputController.setDirection");
    console.log("InputController.keyDirection = "+keyDirection);
    // если это не противоположное направление - сохраняем его как новое
    if (Math.abs(keyDirection - this.world.direction) != 2) {
        this.world.direction = keyDirection;
        console.log("InputController.this.world.direction = "+this.world.direction);
    }
};