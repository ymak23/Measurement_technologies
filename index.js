

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

const renderChart = (items) => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);



  let currentLabelY = LabelCoordinate.INITIAL_Y;
  let currentBarX = BarCoordinate.INITIAL_X;


  const gapBetweenBars = BarSize.WIDTH + Gap.HORIZONTAL;



  for (const item of items) {

    const barHeight = (item.value * BarSize.MAX_HEIGHT) / MAX_PERCENTAGE;
    


    ctx.fillStyle = item.color;

    ctx.font = `${Font.SIZE} ${Font.FAMILY}`;


    ctx.save();

    ctx.translate(0, canvas.height); 
    ctx.rotate(-Math.PI/2);

    ctx.fillText(item.name.toUpperCase(), LabelCoordinate.INITIAL_X, currentLabelY);

    ctx.restore();
    ctx.fillRect(currentBarX, BarCoordinate.INITIAL_Y, BarSize.WIDTH, -barHeight);
    
    currentBarX += gapBetweenBars;
    currentLabelY += gapBetweenBars;
  }
};

formElement.addEventListener(`submit`, (evt) => {

  evt.preventDefault();
 
  renderChart(getData(inputElements));
  
});
