/**
 * Утилиты
 */

// Подгрузчик всех изображений из ассоциатиавного массива
    /*
    *
    *
    * */
var Utils = {};
Utils.loadImages = function(game, hashMap){
    for (var imageName in hashMap) {
        game.load.image(hashMap[imageName], "img/" + hashMap[imageName]);
    }
};

// Подгрузчик картинок для кнопок из ассоциатиавного массива
// отличия - грузятся как spritesheet, и нужно указывать размеры

