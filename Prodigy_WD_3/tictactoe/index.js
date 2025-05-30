// Player Names
let P1 = "PLAYER1";
let P2 = "PLAYER2";
let playingWithAI = false;

function setNames() {
  const p1Input = document.getElementById("player1-name").value.trim();
  const p2Input = document.getElementById("player2-name").value.trim();

  if (p1Input) P1 = p1Input;
  else P1 = "PLAYER1";
  if (p2Input) P2 = p2Input;
  else P2 = "PLAYER2";

  updateResultText(`${P1} : X<br>${P2} : O`);
  replay();
}

function updateResultText(text) {
  const resultElem = document.getElementById("result");
  resultElem.innerHTML = text;
  resultElem.style.color = "antiquewhite";
  resultElem.style.fontSize = "30px";
  resultElem.style.paddingTop = "0";
}

let flag = true; // true = X turn, false = O turn
let t = 0; // turn count
let gameOver = false;

function game(button) {
  if (gameOver) return;
  if (button.textContent !== "") return; // ignore if already clicked

  if (flag) {
    button.textContent = "X";
    button.style.backgroundColor = "#2a74f0";
    button.style.color = "white";
  } else {
    button.textContent = "O";
    button.style.backgroundColor = "hotpink";
    button.style.color = "white";
  }
  button.disabled = true;

  t++;
  if (checkResult()) {
    updateResultText((flag ? P1 : P2) + " WINS !!");
    gameOver = true;
    disableAllButtons();
    return;
  }
  if (t === 9) {
    updateResultText("MATCH DRAW !!");
    gameOver = true;
    return;
  }
  flag = !flag;

  // If playing with AI and it's O's turn, let AI play
  if (playingWithAI && !flag && !gameOver) {
    aiPlay();
  }
}

function disableAllButtons() {
  const buttons = document.querySelectorAll(".tic-tac-toe");
  buttons.forEach((btn) => (btn.disabled = true));
}

function enableAllButtons() {
  const buttons = document.querySelectorAll(".tic-tac-toe");
  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.textContent = "";
    btn.style.backgroundColor = "transparent";
    btn.style.color = "black";
  });
}

function replay() {
  flag = true;
  t = 0;
  gameOver = false;
  enableAllButtons();
  updateResultText(`${P1} : X<br>${P2} : O`);
}

function checkResult() {
  const b = [];
  for (let i = 1; i <= 9; i++) {
    b[i] = document.getElementById("b" + i).textContent;
  }
  // Winning combinations
  const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  return wins.some(
    ([x, y, z]) => b[x] !== "" && b[x] === b[y] && b[y] === b[z]
  );
}

// Simple AI that picks random empty cell for O
function aiPlay() {
  const emptyButtons = [...document.querySelectorAll(".tic-tac-toe")].filter(
    (btn) => btn.textContent === ""
  );
  if (emptyButtons.length === 0) return;

  const randomIndex = Math.floor(Math.random() * emptyButtons.length);
  const aiButton = emptyButtons[randomIndex];

  // Delay AI move to simulate thinking
  setTimeout(() => {
    game(aiButton);
  }, 500);
}

function toggleAI() {
  playingWithAI = !playingWithAI;
  const btn = document.getElementById("ai-toggle-btn");
  btn.textContent = `Play with AI: ${playingWithAI ? "ON" : "OFF"}`;
  replay();
}
