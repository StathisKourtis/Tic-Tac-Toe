const gameboard = {
  A: ["-", "-", "-"],
  B: ["-", "-", "-"],
  C: ["-", "-", "-"],
};
let currentPlayer = "player1";
let mark = "X";
let winningPlayer = "";
let gameFinished = false;

(function playGame() {
  console.log("Game Started");
  console.table(gameboard);

  while (gameFinished != true) {
    playRound();
  }

  alert("Game Finished " + winningPlayer + "Wins!");
})();

function buildBoard() {}

function doesWin() {
  // Check rows A, B, C
  for (let row of ["A", "B", "C"]) {
    if (
      gameboard[row][0] === gameboard[row][1] &&
      gameboard[row][1] === gameboard[row][2] &&
      gameboard[row][0] !== "-"
    ) {
      return true;
    }
  }

  // Check columns 0, 1, 2
  for (let col = 0; col < 3; col++) {
    if (
      gameboard["A"][col] === gameboard["B"][col] &&
      gameboard["B"][col] === gameboard["C"][col] &&
      gameboard["A"][col] !== "-"
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    gameboard["A"][0] === gameboard["B"][1] &&
    gameboard["B"][1] === gameboard["C"][2] &&
    gameboard["A"][0] !== "-"
  ) {
    return true;
  }

  if (
    gameboard["A"][2] === gameboard["B"][1] &&
    gameboard["B"][1] === gameboard["C"][0] &&
    gameboard["A"][2] !== "-"
  ) {
    return true;
  }

  return false;
}

function playRound() {
  console.log(currentPlayer + "'s turn");
  const move = prompt("play");
  let moveArr = move.split("");
  gameboard[moveArr[0]][moveArr[1]] = mark;
  console.table(gameboard);
  if (doesWin()) {
    winningPlayer = currentPlayer;
    gameFinished = true;
  }

  if (currentPlayer == "player1") {
    currentPlayer = "player2";
    mark = "O";
  } else {
    currentPlayer = "player1";
    mark = "X";
  }
  console.log("Round Finished");
}
