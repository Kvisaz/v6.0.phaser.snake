/**
 * Компактная Змейка со сменным UI 19.10.2017.
 */

// 1. Модель состояния игрового мира: пассивная (без методов), по возможности простая
var WorldState = {
    score: 0,
    width: 50, // ширина уровня
    height: 50, // высота уровня
    direction: 2, // активное направление для змейки
    snake: [], // массив сегментов змейки, каждый сегмент - { x:, y:, direction: }, змейка отсчитывается с головы
    apple: {x: 0, y: 0} // яблоко
};

// Описание направлений
var Directions = {
    LEFT: 0,  // индекс LEFT должен быть 1 - это поможет легкому переводу кода клавиш
    UP: 1,  // порядок такой сделан, чтобы между противположными направлениями
    RIGHT: 2, // была одна разница (2) - это позволяет не поворачивать змейку против себя же
    DOWN: 3
};

// смещение координат для разных направлений. Отсчет снизу вверх
var Moves = [
    {x: -1, y: 0}, // LEFT
    {x: 0, y: -1}, // TOP
    {x: 1, y: 0}, // RIGHT
    {x: 0, y: 1} // DOWN
];

// наша игра
var Game = {
    world: WorldState, // модель мира
    view: null, // наш элемент для вывода уровня, передается рендереру
    renderer: CanvasRenderer, // наш рендерер, переводит модель мира в картинку
    uiBox: null, // UI, который запускает нашу игру, должен содержать onGameOver(score) и onScoreChange(score)
};

// функция создания яблока
Game.createNewApple = function () {
    this.world.apple.x = Math.floor(Math.random() * this.world.width);
    this.world.apple.y = Math.floor(Math.random() * this.world.height);
};

// функция поедания яблока
Game.eatApple = function () {
    this.world.score++;
    this.uiBox.onScoreChange(this.world.score);
    this.createNewApple();
};

Game.resetWorld = function (width, height) {
    this.world = {
        score: 0,
        width: width,
        height: height,
        direction: Directions.RIGHT, // активное направление для змейки
        snake: [], // массив сегментов змейки, каждый сегмент - { x:, y:, direction: }, змейка отсчитывается с головы
        apple: {x: 0, y: 0} // яблоко
    }
};

// инициализация уровня, можно создавать разные размеры
Game.initLevel = function (width, height) {
    this.world.width = width;
    this.world.height = height;

    this.renderer.init(this.world, this.view);


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

// Обработчики нажатий клавиш, переданных от UI
Game.setDirection = function (keyDirection) {
    // если это не противоположное направление - сохраняем его как новое
    if (Math.abs(keyDirection - this.world.direction) != 2) {
        this.world.direction = keyDirection;
    }
};

// запуск цикла игры, использую setInterval для совместимости со старым Safari
// bind позволяет привязать this объекта
// так как по дефолту setInterval передает в функцию this от window
Game.resume = function () {
    this.interval = setInterval(this.update.bind(this), 100);
};

Game.pause = function () {
    clearInterval(this.interval);
};

// жизненный цикл уровня, повторяется постоянно
Game.update = function () {
    // 1. двигаем змейку - ищем следующий ход
    var move = Moves[this.world.direction];
    console.log("direction: " + this.world.direction);
    console.log("move: " + move.x + " / " + move.y);
    var head = this.world.snake[0];
    var next = {x: head.x + move.x, y: head.y + move.y};
    // переходы через грани
    if (next.x < 0) next.x = this.world.width - 1;
    if (next.x >= this.world.width) next.x = 0;
    if (next.y < 0) next.y = this.world.height - 1;
    if (next.y >= this.world.height) next.y = 0;

    console.log("next: " + next.x + " / " + next.y);

    // 2. проверяем GameOver
    var i, segment;
    for (i = 0; i < this.world.snake.length; i++) {
        segment = this.world.snake[i];
        if (segment.x === next.x && segment.y === next.y) {
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

    // 5. рисуем уровень
    this.renderer.update();
};

// Геймувер
Game.over = function () {
    this.pause(); // стопим игру
    this.uiBox.onGameOver(this.world.score); // передаем сообщение о геймувере нашему интерфейсу
};

// Начало игры
Game.start = function (width, height) {
    this.resetWorld(width, height);
    this.initLevel(width, height); // инициализация уровня
    this.resume(); // старт
};

Game.restart = function () {
    this.start(this.world.width, this.world.height);
};