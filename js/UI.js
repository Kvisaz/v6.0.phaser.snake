/**
 *  UI - интерфейс пользователя для игры Snake
 */

var UI = {
    bg: null,
    // данные для отображения картинок
    IMAGES: {
        BG_GAME_SYSTEM: 'ui_bg_gamesystem.png',
    }
};
// game - это ссылка на Phaser движок
UI.preload = function (game) {
    Utils.loadImages(game, this.IMAGES);
};

UI.create = function (game) {
    game.add.image(0, 0, this.IMAGES.BG_GAME_SYSTEM);
};

UI.update = function (game) {

};