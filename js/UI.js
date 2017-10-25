/**
 *  UI - интерфейс пользователя для игры Snake
 */

var UI = {
    world: null,
    bg: null,
    // данные для отображения картинок
    IMAGES: {
        BG_GAME_SYSTEM: {page: 'snake-1', name: 'ui_bg_gamesystem'},
        JOYPAD: {page: 'snake-0', name: 'joypad'},
        JOYPAD_UP: {page: 'snake-0', name: 'joypad_up'},
        JOYPAD_RIGHT: {page: 'snake-0', name: 'joypad_right'},
        JOYPAD_DOWN: {page: 'snake-0', name: 'joypad_down'},
        JOYPAD_LEFT: {page: 'snake-0', name: 'joypad_left'},
    },
    joypad: null, // виртуальный джойстик
    isPointerOnJoypad: false,
    keys: null, // клавиши для десктопа
    music: null, // музыка
};
// game - это ссылка на Phaser движок
UI.preload = function (game) {
    game.load.audio('battle', 'sounds/battle.mp3'); // see http://phaser.io/examples/v2/audio/loop
};

UI.create = function (game) {
    game.add.image(ViewConfig.UI_BG_X, ViewConfig.UI_BG_Y, this.IMAGES.BG_GAME_SYSTEM.page, this.IMAGES.BG_GAME_SYSTEM.name);

    // Джойстик
    this.joypad = game.add.image(ViewConfig.JOYPAD_X, ViewConfig.JOYPAD_Y, this.IMAGES.JOYPAD.page, this.IMAGES.JOYPAD.name);
    this.joypad.inputEnabled = true;

    // Функции обработки клавиш для мышки
    // cv http://phaser.io/examples/v2/input/virtual-gamecontroller
    this.joypad.events.onInputDown.add(this.onKeyDown.bind(this));
    this.joypad.events.onInputUp.add(this.onKeyUp.bind(this));
    // и для тачскрина
    this.joypad.events.onInputOver.add((function () {this.isPointerOnJoypad = true;}).bind(this));
    this.joypad.events.onInputOut.add((function () {this.isPointerOnJoypad = false;}).bind(this));

    // и добавляем клавиши для десктопа
    if(game.device.desktop){
        this.keys = game.input.keyboard.createCursorKeys();
    }

    // включаем музыку
    this.music = game.add.audio('battle');
    game.sound.setDecodedCallback([this.music], this.onSoundDecoded, this);

};

UI.onSoundDecoded = function () {
    this.music.loopFull(0.6);
};

UI.onKeyDown = function (image, pointer) {
    var images = this.IMAGES;
    var joypad = this.joypad;
    var x = pointer.position.x - image.position.x;
    var y = pointer.position.y - image.position.y;

    // определяем границы для участков джойпада
    var y1 = Math.ceil(image.height / 3);
    var y2 = image.height - y1;
    var x1 = y1;
    var x2 = y2;

    // определяем участок и включаем соответствующий фрейм
    if (x <= x1 && y >= y1 && y <= y2){ // LEFT
        this.onKeyLeftPress();
    }
    else if (x >= x2 && y >= y1 && y <= y2){ // right
        this.onKeyRightPress();
    }
    else if (x >= x1 && x <= x2 && y <= y1 ){ // up
        this.onKeyUpPress();
    }
    else if (x >= x1 && x <= x2 && y >= y2 ){ // down
        this.onKeyDownPress();
    }

    console.log("UI.onKeyDown");
};

UI.onKeyUp = function (image, pointer) {
    var images = this.IMAGES;
    var joypad = this.joypad;
    joypad.frameName = images.JOYPAD.name;
};

UI.onKeyOver = function (image, pointer) {
    var images = this.IMAGES;
    var joypad = this.joypad;
    joypad.frameName = images.JOYPAD.name;
};

UI.update = function (game) {
    // проверяем, не находится ли курсор над джойтиском
    if(this.isPointerOnJoypad){
        var joypad = this.joypad;
        var images = this.IMAGES;
        var pointer = game.input.activePointer;
        // определяем границы для участков джойпада
        var y1 = Math.ceil(joypad.height / 3);
        var y2 = joypad.height - y1;
        var x1 = y1;
        var x2 = y2;

        //
        var x = pointer.position.x - joypad.position.x;
        var y = pointer.position.y - joypad.position.y;

        // определяем участок и включаем соответствующий фрейм
        if (x <= x1 && y >= y1 && y <= y2){ // LEFT
            this.onKeyLeftPress();
        }
        else if (x >= x2 && y >= y1 && y <= y2){ // right
            this.onKeyRightPress();
        }
        else if (x >= x1 && x <= x2 && y <= y1 ){ // up
            this.onKeyUpPress();
        }
        else if (x >= x1 && x <= x2 && y >= y2 ){ // down
            this.onKeyDownPress();
        }
        else {
            joypad.frameName = images.JOYPAD.name;
        }
    }
    // проверяем клавиши на десктопе
    if(game.device.desktop) {
        if(this.keys.up.isDown) this.onKeyUpPress();
        else if (this.keys.down.isDown) this.onKeyDownPress();
        else if (this.keys.left.isDown) this.onKeyLeftPress();
        else if (this.keys.right.isDown) this.onKeyRightPress();
    }
};

UI.onKeyLeftPress = function () {
    this.joypad.frameName = this.IMAGES.JOYPAD_LEFT.name;
    this.setDirection(Directions.LEFT)
};

UI.onKeyRightPress = function () {
    this.joypad.frameName = this.IMAGES.JOYPAD_RIGHT.name;
    this.setDirection(Directions.RIGHT)
};

UI.onKeyDownPress = function () {
    this.joypad.frameName = this.IMAGES.JOYPAD_DOWN.name;
    this.setDirection(Directions.DOWN)
};

UI.onKeyUpPress = function () {
    this.joypad.frameName = this.IMAGES.JOYPAD_UP.name;
    this.setDirection(Directions.UP)
};

UI.setDirection = function (keyDirection) {
    // если это не противоположное направление - сохраняем его как новое
    if (Math.abs(keyDirection - this.world.direction) != 2) {
        this.world.direction = keyDirection;
    }
};