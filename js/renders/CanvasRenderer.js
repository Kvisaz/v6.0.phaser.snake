/**
 *  Рендерер змейки через canvas
 *      - адаптивно определяет размеры тайла, чтобы
 *      отображаемый мир весь помещался на экране
 *      поэтому желательно, чтобы мир и view имели одинаковые пропорции сторон
 *
 *  каждый рендер должен иметь
 *      - init (инициализация)
 *      - update (собственно рендер)
 */

var CanvasRenderer = {
    BG_COLOR: "#428C5C",
    APPLE_COLOR: "#FFA644",
    SNAKE_COLOR: "#ADD96C",
};

CanvasRenderer.init = function (world, view) {
    this.world = world;
    this.view = view;
    this.tileSize = this.getTileSize(world, view);

    // если у нашего view уже был создан канвас - удаляем его
    this.view.innerHTML = "";

    // создаем наш канвас
    this.canvas = document.createElement("CANVAS");
    this.canvas.width = this.tileSize * world.width;
    this.canvas.height = this.tileSize * world.height;
    this.view.appendChild(this.canvas); // вставляем его внутрь нашего вью

    // запоминаем контекст канвас для рисования
    this.context = this.canvas.getContext("2d");
};

// функция получающая размер тайла так, чтобы world помещался во view
CanvasRenderer.getTileSize = function (world, view) {
    var viewHeight = view.offsetHeight;
    var viewWidth = view.offsetWidth;
    console.log("viewHeight: " + viewHeight + "viewWidth: " + viewWidth);
    // выясняем  размеры тайла
    var tileSize = Math.ceil(viewWidth / world.width);
    console.log("tileSize1: " + tileSize);
    // подгоняем размеры тайла так, чтобы мир влез в вью
    if (tileSize * world.height > viewHeight) {
        tileSize = Math.ceil(viewHeight / world.height);
        console.log("tileSize2: " + tileSize);
    }
    return tileSize;
};

CanvasRenderer.update = function () {
    // рисуем фон
    this.context.fillStyle = this.BG_COLOR; // устанавливаем цвет
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height); // сама фигура фона

    // рисуем змейку
    // устанавливаем цвет
    this.context.fillStyle = this.SNAKE_COLOR;
    // вычисляем координаты
    var i, x, y, seg;
    for (i = 0; i < this.world.snake.length; i++) {
        seg = this.world.snake[i];
        x = seg.x * this.tileSize;
        y = seg.y * this.tileSize;
        this.context.fillRect(x, y, this.tileSize, this.tileSize);
    }

    // рисуем яблоко
    // устанавливаем цвет
    this.context.fillStyle = this.APPLE_COLOR;
    // вычисляем координаты
    x = this.world.apple.x * this.tileSize;
    y = this.world.apple.y * this.tileSize;
    this.context.fillRect(x, y, this.tileSize, this.tileSize);
};