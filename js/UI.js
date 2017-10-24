/**
 *  UI - интерфейс пользователя для игры Snake
 */

/*
 содержит ссылку на объект game, в которой должно быть
 - view (HTML элемент для вывода самой игры)
 - функции
 - setDirection - для указания направления любым предоставленным UI способом
 - onGameOver
 */

var UI = {
    game: null,
    gameoverWin: null,
    gameView: null,
    scoreView: null, // куда выводим очки
    keyCodes: [37, 38, 39, 40], // порядок должен совпадать с порядком обработчиков в keyDirections
    keyDirections: [Directions.LEFT, Directions.UP, Directions.RIGHT, Directions.DOWN]
};

/*
 *   Строим интерфейс, подключаемся к текущему документу
 *   для изменения пропорций - указываем желаемы размеры интерфейса
 * */
UI.build = function (uiViewId, gameViewId,  width, height) {
    var ui = this;
    this.view = document.getElementById(uiViewId);
    this.gameView = document.getElementById(gameViewId);
    this.scoreView = document.getElementById("topbarRight");

    // для изменения окна - делаем ресайз
    this.proportion = width / height;
    this.idealWidth = width;
    this.idealHeight = height;
    this.scale = 1;
    window.addEventListener("resize", this.onResize.bind(this));
    this.onResize();

    // ищем окно геймувера и привязываем обработчик клика к нажатию его кнопки
    this.gameoverWin = document.getElementById("gameoverWindow");
    var gameoverBt = document.getElementById("gameRestartButton");
    gameoverBt.addEventListener('click', function () {
        ui.gameoverWin.classList.add("hidden"); // убираем окно геймувера, добавляя ему класс для скрытия
        ui.game.restart();
    });

    // устанавливаем размер
};


/*
    ресайз UI при изменении
     + сделан общий ресайз контейнера W
     - надо сделать ресайз шрифтов
*/
UI.onResize = function (e) {
    var me = this, width, height;
    var win = document.body;
    width = win.clientWidth;
    height = win.clientHeight;
    var winK = win.clientWidth / win.clientHeight;
    if (winK > me.proportion) { // ширина окна больше, пляшем от высоты
        width = height * me.proportion;
    }
    else if (winK < me.proportion) {
        height = width / me.proportion;
    }

    me.view.style.width = width + "px";
    me.view.style.height = height + "px";
    me.scale = width / me.idealWidth;
};

/*  Подключаем ввод с клавиш клавиатуры */
UI.bindInput = function (game) {
    // коды клавиш со стрелками, если поставить другие - будут работать другие
    document.addEventListener('keydown', function (e) {
        var keyIndex =  this.keyCodes.indexOf(e.keyCode); // номер клавиши в массиве кодов
        if (keyIndex === -1) return; // если нажатая клавиша - не стрелки,  не обрабатываем
        // вычитаем базу, получаем индекс обработчиков от 0 до 3
        var newDirection =  this.keyCodes[keyIndex] -  this.keyCodes[0];
        game.setDirection( this.keyDirections[newDirection]); // вызываем обработчик в игре
    }.bind(this));

    // подключаем клики на визуальных кнопках
    this.visualKeyIds  = ["keyLeft", "keyUp", "keyRight", "keyDown"]; // порядок должен совпадать с порядком обработчиков в keyDirections

    // подключаем эффекты на визуальных кнопках
    // -- нажали
    document.addEventListener('touchstart', this.onVisualKeyDown.bind(this));
    document.addEventListener('mousedown', this.onVisualKeyDown.bind(this));
    // -- отжали
    document.addEventListener('touchend', this.onVisualKeyUp.bind(this));
    document.addEventListener('mouseup', this.onVisualKeyUp.bind(this));
};

/*
*  Сервисные сокращенные функции
* */
UI.onVisualKeyDown = function (e) {

    var keyIndex = this.visualKeyIds.indexOf(e.target.id); // номер клавиши в массиве кодов
    if (keyIndex === -1) return; // если нажатая клавиша - не стрелки,  не обрабатываем

    var newDirection = this.keyCodes[keyIndex] - this.keyCodes[0]; // вычитаем базу, получаем индекс обработчиков от 0 до 3
    this.game.setDirection(this.keyDirections[newDirection]); // вызываем обработчик в игре

    e.target.classList.add("keyPressed"); // создаем эффект нажатой кнопки
};

UI.onVisualKeyUp = function (e) {

    var keyIndex = this.visualKeyIds.indexOf(e.target.id); // номер клавиши в массиве кодов
    if (keyIndex === -1) return; // если нажатая клавиша - не стрелки,  не обрабатываем
    e.target.classList.remove("keyPressed"); // отжимаем кнопку
};

/*
 *   Обратная связь с игрой - вывод очков
 * */

UI.onScoreChange = function (score) {
    this.scoreView.innerHTML = score;

};

// Обработка геймувера
UI.onGameOver = function (score) {
    this.gameoverWin.classList.remove("hidden"); // показываем окно геймувера, добавляя ему класс для скрытия
};

/*
 *
 *   Вкладываем игру в UI
 *       - передаем ей DOM-элемент для рендера
 *       - подключаем пользовательский ввод
 *       - передаем игре коллбэк-функцию для GameOver
 *       - передаем игре коллбэк-функцию для вывода очков
 * */

UI.bindGame = function (game) {
    game.view = this.gameView; // передаем элемент для рендера
    game.uiBox = this; // передаем себя как uiBox для передачи очков и сообщения о геймувере
    this.bindInput(game); // устанавливаем связь ввода пользователя с функциями игры
    this.game = game;
};