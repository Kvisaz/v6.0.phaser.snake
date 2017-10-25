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
    joypad: null,
    isPointerOnJoypad: false
};
// game - это ссылка на Phaser движок
UI.preload = function (game) {
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
        joypad.frameName = images.JOYPAD_LEFT.name;
    }
    else if (x >= x2 && y >= y1 && y <= y2){ // right
        joypad.frameName = images.JOYPAD_RIGHT.name;
    }
    else if (x >= x1 && x <= x2 && y <= y1 ){ // up
        joypad.frameName = images.JOYPAD_UP.name;
    }
    else if (x >= x1 && x <= x2 && y >= y2 ){ // down
        joypad.frameName = images.JOYPAD_DOWN.name;
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
            joypad.frameName = images.JOYPAD_LEFT.name;
        }
        else if (x >= x2 && y >= y1 && y <= y2){ // right
            joypad.frameName = images.JOYPAD_RIGHT.name;
        }
        else if (x >= x1 && x <= x2 && y <= y1 ){ // up
            joypad.frameName = images.JOYPAD_UP.name;
        }
        else if (x >= x1 && x <= x2 && y >= y2 ){ // down
            joypad.frameName = images.JOYPAD_DOWN.name;
        }
        else {
            joypad.frameName = images.JOYPAD.name;
        }

    }
};