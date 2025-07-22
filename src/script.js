const gameController = (function () {
  function playRound() {
    console.log(currentPlayer.name + "'s turn");
    playerMove();
    if (doesWin()) {
      winningPlayer = currentPlayer;
      gameFinished = true;
    }

    playerSwitch();
  }
  function doesWin() {
    const board = Gameboard.gameboard;

    // Check rows
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2] &&
        board[row][0] !== "-"
      ) {
        return true;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col] &&
        board[0][col] !== "-"
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== "-"
    ) {
      return true;
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== "-"
    ) {
      return true;
    }

    return false;
  }
  function startGame() {
    gameFinished = false;
    Gameboard.resetGameboard();
    currentPlayer = playerX;

    console.log("Game Started");

    while (gameFinished != true) {
      playRound();
    }

    alert("Game Finished " + winningPlayer.name + " Wins!");
  }
  function playerSwitch() {
    if (currentPlayer == playerX) {
      currentPlayer = playerO;
    } else {
      currentPlayer = playerX;
    }
    console.log("Round Finished");
  }
  function playerMove() {
    let validMove = false;
    while (validMove == false) {
      const move = prompt("play");
      let moveArr = move.split("");
      let targetCell = Gameboard.gameboard[moveArr[0]][moveArr[1]];
      if (targetCell == "-") {
        validMove = true;
        Gameboard.setCell(moveArr[0], moveArr[1], currentPlayer.symbol);
      } else {
        alert("Invalid Move");
      }
    }
  }
  let playerX = {
    name: "player1",
    symbol: "X",
  };
  let playerO = {
    name: "player2",
    symbol: "O",
  };
  let currentPlayer = null;
  let winningPlayer = null;
  let gameFinished = false;

  return {
    startGame,
    playRound,
  };
})();

const Gameboard = {
  gameboard: [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ],

  setCell(row, col, symbol) {
    this.gameboard[row][col] = symbol;
    console.table(this.gameboard);
  },
  resetGameboard() {
    this.gameboard = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];

    console.table(this.gameboard);
  },
};

const displayController = {};
