

const MAX_PERCENTAGE = 100;

const COLORS = [
  `#b3d5fc`,
  `#98d9d9`,
  `#ede493`,
  `#f0b3fc`
];

const BarSize = {
  MAX_HEIGHT: 190,
  WIDTH: 50
};

const BarCoordinate = {
  INITIAL_X: 80,
  INITIAL_Y: 220
}

const Font = {
  SIZE: `18px`,
  FAMILY: `Tahoma`
};

const LabelCoordinate = {
  INITIAL_X: 30,
  INITIAL_Y: 70
}

const Gap = {
  HORIZONTAL: 65,
  VERTICAL: 30
}

const formElement = document.querySelector(`.chart__data`);
const inputElements = formElement.querySelectorAll(`.chart__input`);

const getData = (inputElements) => {
  return Array.from(inputElements).map((input, index) => ({
    name: input.name,
    value: input.value,
    color: COLORS[index]
  }));
};

const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);
// Получаем на вход items — массив объектов с данными
const renderChart = (items) => {
  // Очищаем всю область холста
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // Задаём координаты для первого столбца и подписи
  let currentLabelY = LabelCoordinate.INITIAL_Y;
  let currentBarX = BarCoordinate.INITIAL_X;

  // Определяем горизонтальный отступ между соседними столбцами
  const gapBetweenBars = BarSize.WIDTH + Gap.HORIZONTAL;

  // Проходим в цикле по каждому объекту в массиве с данными
  // Для каждого будет нарисован отдельный столбец
  for (const item of items) {
    // Вычисляем высоту столбца с учётом процентов из данных
    const barHeight = (item.value * BarSize.MAX_HEIGHT) / MAX_PERCENTAGE;
    
        // Задаём цвет заливки любых элементов, 
        //которые будут создаваться дальше

    ctx.fillStyle = item.color;
    // Задаём параметры шрифта
    ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
        // Запоминаем текущие параметры холста

    ctx.save();
    // Сдвигаем начало коодинат вниз по оси y на величину canvas.height
    // Поворачиваем систему координат на 90 градусов против часовой стрелки
    // Math.PI/2 — перевод 90 градусов в радианы
    ctx.translate(0, canvas.height); 
    ctx.rotate(-Math.PI/2);
    // В изменённой системе координат рисуем текст снизу вверх
    ctx.fillText(item.name.toUpperCase(), LabelCoordinate.INITIAL_X, currentLabelY);
   // В изменённой системе координат рисуем текст снизу вверх
    ctx.restore();
    // Рисуем столбец
    // Отрицательное значение — отрисовка снизу вверх
    ctx.fillRect(currentBarX, BarCoordinate.INITIAL_Y, BarSize.WIDTH, -barHeight);
    
    // Для следующего столбца обновляем координаты с учётом отступа
    currentBarX += gapBetweenBars;
    currentLabelY += gapBetweenBars;
  }
};

formElement.addEventListener(`submit`, (evt) => {
  // Отменяем действие по умолчанию — отправку формы на сервер (которого нет)
  evt.preventDefault();
  // Отрисовываем график
  renderChart(getData(inputElements));
  // Сбрасываем значения полей ввода
  //formElement.reset();
});
