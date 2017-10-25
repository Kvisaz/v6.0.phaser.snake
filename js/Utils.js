/**
 * Утилиты
 */

// Подгрузчик всех изображений из ассоциатиавного массива
/*
 *
 *
 * */
var Utils = {};
Utils.loadImages = function (game, hashMap) {
    for (var imageName in hashMap) {
        game.load.image(hashMap[imageName], "img/" + hashMap[imageName]);
    }
};

/* Подгрузчик картинок из мульти-атласа
 *    game: Phaser движок
 *    dir: директория относительно index.html
 *    atlasCoreName: "snake" или другое базовое имя, без расширений и номеров
 *    length: число страниц в атласе
 * */

Utils.loadImageAtlases = function (game, dir, atlasCoreName, length) {
    var i = length-1, name, fullname;
    for (; i>=0;i--) {
        name = atlasCoreName + "-" + i;
        fullname = dir + "/" + name;
        game.load.atlas(name, fullname + ".png", fullname + ".json");
    }
};

