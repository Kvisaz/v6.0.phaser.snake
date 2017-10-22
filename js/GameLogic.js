/**
 * Логика Змейки 22.10.2017.
 */

var GameLogic = {
    world: null, // модель мира, инициализируется в Application
    moves: [  // смещение координат для разных направлений. Отсчет снизу вверх
        {x: -1, y: 0}, // LEFT
        {x: 0, y: -1}, // TOP
        {x: 1, y: 0}, // RIGHT
        {x: 0, y: 1} // DOWN
    ],
};

// функция создания яблока
GameLogic.createNewApple = function () {
    this.world.apple.x = Math.floor(Math.random() * this.world.width);
    this.world.apple.y = Math.floor(Math.random() * this.world.height);
};

// функция поедания яблока
GameLogic.eatApple = function () {
    this.world.score++; // напоминаю, что отображение данные из модели в UI - работа самого UI
    this.createNewApple();
};

GameLogic.resetWorld = function (width, height) {
    this.world = {
        score: 0,
        width: width,
        height: height,
        direction: Directions.RIGHT, // активное направление для змейки
        snake: [], // массив сегментов змейки, каждый сегмент - { x:, y:, direction: }, змейка отсчитывается с головы
        apple: {x: 0, y: 0}, // яблоко
        gameover: true
    }
};

// инициализация уровня, можно создавать разные размеры
GameLogic.initLevel = function (width, height) {
    this.world.width = width;
    this.world.height = height;

    this.createNewApple(); // создаем яблоко

    // подключаем змейку примерно в центре экрана
    var headX = Math.floor(width / 2); // целочисленные координаты посреди уровня
    var headY = Math.floor(height / 2); // для головы змейки

    var i, size = 3;
    var dirK = this.world.direction == 0 ? -1 : 1;
    for (i = 0; i < size; i++) {
        this.world.snake.unshift({x: headX + dirK * i, y: headY, direction: this.world.direction});
    }
};

// жизненный цикл уровня, повторяется постоянно
GameLogic.update = function () {
    // 1. двигаем змейку - ищем следующий ход
    var move = Moves[this.world.direction];
    // todo log
    console.log("direction: " + this.world.direction);
    console.log("move: " + move.x + " / " + move.y);
    var head = this.world.snake[0];
    var next = {x: head.x + move.x, y: head.y + move.y};
    // переходы через грани
    if (next.x < 0) next.x = this.world.width - 1;
    if (next.x >= this.world.width) next.x = 0;
    if (next.y < 0) next.y = this.world.height - 1;
    if (next.y >= this.world.height) next.y = 0;
    // todo log
    console.log("next: " + next.x + " / " + next.y);

    // 2. проверяем GameOver
    var i, segment;
    for (i = 0; i < this.world.snake.length; i++) {
        segment = this.world.snake[i];
        if (segment.x === next.x && segment.y === next.y) {
            // todo log
            console.log("segment =" + segment.x + "/" + segment.y);
            this.over();
            break; // прекращаем проверку
        }
    }

    // 3. добавляем следующий ход в голову змейки
    this.world.snake.unshift({x: next.x, y: next.y, direction: this.world.direction});

    // 4. проверяем столкновение с яблоком - если есть, не отбрасываем хвост
    var hasApple = next.x == this.world.apple.x && next.y == this.world.apple.y;
    if (hasApple) this.eatApple(); // едим и там же создаем новое яблоко
    else this.world.snake.pop(); // отброс хвоста
};

GameLogic.over = function () {
    this.world.gameover = true;   // Геймувер. Ставим флаг - реакция Application ее проблема
};

// Начало игры
GameLogic.start = function (width, height) {
    this.resetWorld(width, height);
    this.initLevel(width, height); // инициализация уровня
};

GameLogic.restart = function () {
    this.start(this.world.width, this.world.height);
};