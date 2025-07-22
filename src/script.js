const xSymbol =
'<svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet"><path fill="#ff5a79" d="M62 10.6L53.4 2L32 23.4L10.6 2L2 10.6L23.4 32L2 53.4l8.6 8.6L32 40.6L53.4 62l8.6-8.6L40.6 32z"></path></svg>'
const oSymbol =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle</title><path d="M11.5,3C16.75,3 21,7.25 21,12.5C21,17.75 16.75,22 11.5,22C6.25,22 2,17.75 2,12.5C2,7.25 6.25,3 11.5,3M11.5,4C6.81,4 3,7.81 3,12.5C3,17.19 6.81,21 11.5,21C16.19,21 20,17.19 20,12.5C20,7.81 16.19,4 11.5,4Z" /></svg>';

const gameController = (function () {
  function playRound(y,x) {
    console.log(currentPlayer.name + "'s turn");
    playerMove(y,x);
    if (doesWin()) {
      winningPlayer = currentPlayer;
      gameFinished = true;
      displayController.showWinner()
      return
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
    displayController.renderBoard()
    currentPlayer = playerX;

    console.log("Game Started");

    // while (gameFinished != true) {
    //   playRound();
    // }

    // alert("Game Finished " + winningPlayer.name + " Wins!");
  }
  function playerSwitch() {
    if (currentPlayer == playerX) {
      currentPlayer = playerO;
    } else {
      currentPlayer = playerX;
    }
    console.log("Round Finished");
  }
  function playerMove(y,x) {
    // let validMove = false;
    // while (validMove == false) {
    // }
    // const move = prompt("play");
    // let moveArr = move.split("");
    let targetCell = Gameboard.gameboard[y][x];
    if (targetCell == "-") {
      validMove = true;
      Gameboard.setCell(y, x, currentPlayer.symbol);

       
    } else {
      
      playRound()
    }
    displayController.renderBoard()
  }

  function getCurentPlayer(){
    alert(currentPlayer.name)
  }

  function isGameFinished(){
    alert(gameFinished)
  }

  function getWinningPlayer(){
    return winningPlayer
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
    getCurentPlayer,
    isGameFinished,
    getWinningPlayer
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
  getCell(row, col) {
    return this.gameboard[row][col];
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

const displayController = {
  grid : document.getElementById("board"),
  dialog : document.querySelector(".dialog"),
  renderBoard() {
    this.clearBoard()
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const cell = document.createElement("div");
        this.grid.appendChild(cell);
        cell.classList.add("bg-white", "border-2","flex", "items-center", "justify-center");

        cell.addEventListener("click", ()=>{
          gameController.playRound(y,x)
        })

        if (Gameboard.getCell(y, x) == "X") {
          cell.insertAdjacentHTML("beforeend", xSymbol);
          let symbol = cell.lastElementChild
          symbol.classList.add("size-60")
        } else if (Gameboard.getCell(y, x) == "O") {
          cell.insertAdjacentHTML("beforeend", oSymbol);
          let symbol = cell.lastElementChild
          symbol.classList.add("size-75","pl-2")
        }
      }
    }
  },
  clearBoard(){
    this.grid.innerHTML = ""
  },
  getMove() {},
  showWinner() {
    this.dialog.showModal()
    const victoryMessage = document.getElementById("victoryMessage")
    const winner = gameController.getWinningPlayer()
    victoryMessage.textContent = winner.name + " Wins!"


  },
  showTie() {},
};

gameController.startGame()


