/**
 *  UI - интерфейс пользователя для игры Snake
 */

var UI = {
    bg: null,
    // данные для отображения картинок
    IMAGES: {
        BG_GAME_SYSTEM: {page: 'snake-0', name: 'ui_bg_gamesystem'},
    }
};
// game - это ссылка на Phaser движок
UI.preload = function (game) {};

UI.create = function (game) {
    game.add.image(0, 0, this.IMAGES.BG_GAME_SYSTEM.page, this.IMAGES.BG_GAME_SYSTEM.name);
};

UI.update = function (game) {

};