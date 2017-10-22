/**
 *  Рендерер змейки как строки
 *
 *  каждый рендер должен иметь init (инициализация) и update (собственно рендер)
 */
var StringRenderer = {
    SOLID: "■", // символы для отображения непустых и пустых элементов
    EMPTY: " ",
    NEWLINE: "\n"
};

// этот рендер основан на одномерном массиве (строке, точнее)
StringRenderer.init = function (world, view) {
    this.world = world;
    this.view = view;
    // todo рендерер должен адаптировать вывод под текущие размеры view
    var viewHeight = view.offsetHeight;
    var viewWidth = view.offsetWidth;


    console.log("viewHeight: "+viewHeight + "viewWidth: " + viewWidth);
    // выясняем  размеры тайла
    var tileSize = Math.ceil(viewWidth / world.width);
    console.log("tileSize1: "+tileSize);
    // подгоняем размеры тайла так, чтобы мир влез в вью
    if(tileSize*world.height > viewHeight) {
        tileSize = Math.ceil(viewHeight / world.height);
        console.log("tileSize2: "+tileSize);
    }
    // адаптируем размер текста в выводе за счет инлайн-стилей CSS
    view.style.fontSize = tileSize+"px";

    // этот рендер основан на одномерном массиве (строке, точнее)
    this.grid1D = []; // наш массив, всегда будет очищаться
    this.strLength = this.world.width * this.world.height;
};

StringRenderer.update = function () {
    this.grid1D = []; // очищаем массив

    var i, gridX, seg;
    // набиваем массив змейкой
    for (i = 0; i < this.world.snake.length; i++) {
        seg = this.world.snake[i];
        gridX = seg.x + seg.y * this.world.width;
        //console.log("gridX = "+gridX);
        this.grid1D[gridX] = this.SOLID;
    }

    // добиваем яблочком
    gridX = this.world.apple.x + this.world.apple.y * this.world.width;
    this.grid1D[gridX] = this.SOLID;

    // заполняем пустые элементы пустым местом
    for (i = 0; i < this.strLength; i++) {
        // для неопределенных элементов создаем пустое место
        if (this.grid1D[i] === undefined) this.grid1D[i] = this.EMPTY;
        // для последних элементов создаем перевод строки
        if (i !== 0 && i % this.world.width === this.world.width - 1) this.grid1D[i] += this.NEWLINE;
    }

    var str = this.grid1D.join(""); // склеиваем в 1 строку без пробелов
    this.view.innerHTML = str; // выводим ее в строку
};