(function playGame() {
  const Gameboard = {
    gameboard: [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ],
    playerX: {
      name: "player1",
      symbol: "X",
    },
    playerO: {
      name: "player2",
      symbol: "O",
    },
    currentPlayer: null,
    winningPlayer: null,
    gameRules: {
      playRound() {
        console.log(Gameboard.currentPlayer.name + "'s turn");
        const move = prompt("play");
        let moveArr = move.split("");
        Gameboard.gameboard[moveArr[0]][moveArr[1]] =
          Gameboard.currentPlayer.symbol;
        console.table(Gameboard.gameboard);
        if (Gameboard.gameRules.doesWin()) {
          Gameboard.winningPlayer = Gameboard.currentPlayer;
          gameFinished = true;
        }

        if (Gameboard.currentPlayer == Gameboard.playerX) {
          Gameboard.currentPlayer = Gameboard.playerO;
        } else {
          Gameboard.currentPlayer = Gameboard.playerX;
        }
        console.log("Round Finished");
      },
      doesWin() {
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
      },
    },
  };

  Gameboard.currentPlayer = Gameboard.playerX;

  let gameFinished = false;

  console.log("Game Started");
  console.table(Gameboard.gameboard);

  while (gameFinished != true) {
    Gameboard.gameRules.playRound();
  }

  alert("Game Finished " + Gameboard.winningPlayer.name + " Wins!");
})();
