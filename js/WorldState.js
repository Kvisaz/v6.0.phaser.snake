// 1. Модель состояния игрового мира: пассивная (без методов), по возможности простая
var WorldState = {
    score: 0,
    width: 50, // ширина уровня
    height: 50, // высота уровня
    direction: 2, // активное направление для змейки
    snake: [], // массив сегментов змейки, каждый сегмент - { x:, y:, direction: }, змейка отсчитывается с головы
    apple: {x: 0, y: 0}, // яблоко,
    gameover: false, // триггер для всех заинтерсованных объектов
};