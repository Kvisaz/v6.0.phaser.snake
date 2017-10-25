/**
 *  Рендерер змейки
 *  Основная идея - создаем цепочку спрайтов для каждого объекта на поле
 *  в цикле update проверяем и обновляем положения спрайтов, если модель изменилась
 */

var SnakeRenderer = {
    frameCounter: 0, // счетчик кадров для подсчета скорости
    world: null, // модель
    game: null, // фазер-игра
    width: 0,
    height: 0,
    BG_COLOR: 0x428C5C,
    SNAKE_COLOR: 0xADD96C,
    APPLE_COLOR: 0xFFA644,
    snake: [], // наша вью-модель змейки, то есть цепочка спрайтов Phaser
    apple: null, // наша вью-модель яблока


    // данные для отображения картинок
    IMAGES: {
        SNAKE_BODY: 'snake-body.png',
        APPLE: 'snake-apple.png',
    }
};

// Поскольку за рендеринг у нас отвечает этот класс - он и отвечает, что надо подгружать
SnakeRenderer.preload = function (game) {
    this.game = game;
    Utils.loadImages(game, this.IMAGES);
};


/*
 *   world - модель нашего мира
 *   game - это Phaser game
 *   x,y - смещение нашего рендерера в мире game
 * */
SnakeRenderer.create = function (world, x, y) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.width = GameConfig.TILE_SIZE * world.width;
    this.height = GameConfig.TILE_SIZE * world.height;

    // добавляем спрайт яблока
    if (world.apple !== undefined) {
        if (this.apple !== null) this.apple.destroy();
        x = this.x + this.world.apple.x * GameConfig.TILE_SIZE;
        y = this.y + this.world.apple.y * GameConfig.TILE_SIZE;
        this.apple = this.game.add.image(x, y, this.IMAGES.APPLE);
    }

    // очищаем змейку на всякий случай
    if (this.snake !== null) {
        this.snake.forEach(function (image) {
            image.destroy();
        });
        this.snake = [];
    }

    // добавляем спрайты змейки
    var i, image, x, y, snakeLength = world.snake.length, next;
    for (i = 0; i < snakeLength; i++) {
        next = world.snake[i];
        x = this.x + next.x * GameConfig.TILE_SIZE;
        y = this.y + next.y * GameConfig.TILE_SIZE;
        image = this.game.add.image(x, y, this.IMAGES.SNAKE_BODY);
        this.snake.push(image); // сохраняем в змейке начиная с головы
    }



};

SnakeRenderer.update = function () {

    // рисуем фон - теперь он задается в create


    // рисуем змейку
    // просто идем по массиву модели и переназначаем нашим спрайтам новые координаты
    // сначала вычисляем - не надо ли добавить или удалить спрайты
    var newSegments = this.world.snake.length - this.snake.length;
    if (newSegments > 0) { // в модели новые сегменты!
        do {
            this.snake.push(this.game.add.image(x, y, this.IMAGES.SNAKE_BODY));
            newSegments--;
        } while (newSegments > 0);
    }
    else if (newSegments < 0) { // лишние спрайты
        do {
            var sprite = this.snake.shift(); // убираем из массива
            sprite.destroy(); // убираем со сцены
            newSegments++;
        } while (newSegments < 0);
    }

    var i, x, y, seg, nextSprite;
    for (i = 0; i < this.world.snake.length; i++) {
        seg = this.world.snake[i];
        x = seg.x * GameConfig.TILE_SIZE + this.x;
        y = seg.y * GameConfig.TILE_SIZE + this.y;
        // устанавливаем координаты спрайтам
        // здесь же можно будет переключать их типы для головы, хвоста и тд
        this.snake[i].x = x;
        this.snake[i].y = y;
    }
    // если спрайтов больше, чем нужно - удаляем оставшиеся


    // рисуем яблоко
    this.apple.x = this.world.apple.x * GameConfig.TILE_SIZE + this.x;
    this.apple.y = this.world.apple.y * GameConfig.TILE_SIZE + this.y;

};