let turnX = true;
let welcomeMsg = true;
let count = 0;
const msg = document.getElementById('msg');
const btns = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('#new-btn');
const reset_btn = document.querySelector('#reset-btn');
const clickSound = document.querySelector('#clickSound');
const drawSound = document.querySelector('#drawSound');
const winSound = document.querySelector('#winSound');
const newGameSound = document.querySelector('#newGameSound');
const volumeControl = document.querySelector('#volumeControl');
const patterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
];

volumeControl.addEventListener('input', () => {
  drawSound.volume = volumeControl.value;
  winSound.volume = volumeControl.value;
  clickSound.volume = volumeControl.value;
  newGameSound.volume = volumeControl.value;
});

reset_btn.addEventListener('click', () => {
  newGame();
});

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    clickSound.play();
    if (welcomeMsg) {
      welcomeMsg = false;
      msg.innerText = "Started";
    }
    changeValueOf(btn);

    if (!isWon()) {
      isDraw();
    }
    count++;
  });
});

newGameBtn.addEventListener('click', newGame);

function changeValueOf(button) {
  let text = "O";
  if (turnX) {
    text = "X";
    turnX = !turnX;
  } else {
    text = "O";
    turnX = !turnX;
  }

  button.innerText = text;
  button.disabled = true;
}

async function newGame() {
  drawSound.pause();
  await newGameSound.play();
  btns.forEach((btn) => {
    btn.classList.remove("winner", "draw");
    count = 0;
    btn.innerText = null;
    btn.disabled = false;
  });
  welcomeMsg = true;
  msg.innerText = "Welcome Start New Game";
}

function disableAll() {
  btns.forEach((box) => {
    box.disabled = true;
  });
}

function isWon() {
  for (let pattern of patterns) {
    let box1 = btns[pattern[0]];
    let box2 = btns[pattern[1]];
    let box3 = btns[pattern[2]];

    if (box1.innerText == box2.innerText && box2.innerText == box3.innerText && box1.innerText != "") {
      winSound.play();
      msg.innerText = box1.innerText + " Won";
      box1.classList.add("winner");
      box2.classList.add("winner");
      box3.classList.add("winner");
      disableAll();

      return true;
    }
  }
  return false;
}

function isDraw() {
  if (count == 8 && !isWon()) {
    drawSound.volume = volumeControl.value;
    drawSound.play();
    msg.innerText = "Draw!";
    btns.forEach((btn) => {
      btn.classList.add("draw");
    });
  }
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const timeString = `${hours}:${minutes} ${ampm}`;
  document.getElementById('Time').textContent = timeString;
}

setInterval(updateClock, 2000);
