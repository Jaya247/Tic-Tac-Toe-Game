// 1) grab elements
const boardEl = document.getElementById("board");
const cells = Array.from(document.querySelectorAll(".cell"));
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

// 2) core state
let currentPlayer = "X";
let gameActive = true;
// 9 positions, empty string means unplayed
let gameState = ["", "", "", "", "", "", "", "", ""];

// 3) all winning lines (indexes into gameState)
const wins = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// 4) when a cell is clicked
function onCellClick(e) {
  const btn = e.currentTarget;
  const index = Number(btn.dataset.index);

  if (!gameActive || gameState[index]) return; // ignore taken or finished

  // place mark
  gameState[index] = currentPlayer;
  btn.textContent = currentPlayer;
  btn.disabled = true;

  // check game result
  if (playerWon(currentPlayer)) {
    statusEl.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    disableAll();
    return;
  }

  // draw?
  if (!gameState.includes("")) {
    statusEl.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

// 5) helpers
function playerWon(p) {
  return wins.some(([a, b, c]) =>
    gameState[a] === p && gameState[b] === p && gameState[c] === p
  );
}

function disableAll() {
  cells.forEach(c => (c.disabled = true));
}

// 6) reset game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusEl.textContent = "Player X's turn";
  cells.forEach(c => {
    c.textContent = "";
    c.disabled = false;
  });
}

// 7) wire up events
cells.forEach(c => c.addEventListener("click", onCellClick));
resetBtn.addEventListener("click", resetGame);