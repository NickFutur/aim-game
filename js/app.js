const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "#16d9e3",
  "#008B8B",
  "#00FFFF",
  "#00CED1",
  "#7B68EE",
  "#6495ED",
  "#FFFFF0",
  "#00FA9A",
];

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault(); // отменили действие по умолчанию (в данном случае появление #)
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove(); //удаляем кружок по щелчку на него
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreeseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreeseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect(); // выводим информацию об объекте в данном случае ширину и высоту элемента board
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = color;
  console.log(color);

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
