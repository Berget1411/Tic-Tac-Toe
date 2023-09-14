const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const gameBoardDisplay = document.querySelector(".game-board");
const startGameButtons = document.querySelectorAll(".game-mode button");
const returnButton = document.querySelector(".return");
const displayInfo = document.querySelector(".game-screen h2");
const replayButton = document.querySelector(".replay");

const GameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  return { gameBoard };
})();

const Player = (symbol, playStatus) => {
  const getSymbol = () => symbol;
  const getPlayStatus = () => playStatus;

  const changePlayStatus = (newPlayStatus) => {
    playStatus = newPlayStatus;
  };

  return { getSymbol, getPlayStatus, changePlayStatus };
};

const displayController = (() => {
  const renderGameBoard = (gameBoard) => {
    //reset gameBoard
    gameBoardDisplay.textContent = "";
    let squareNum = 0;
    for (const spot of gameBoard) {
      square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", `${squareNum}`);
      square.textContent = spot;
      gameBoardDisplay.append(square);
      squareNum++;
    }
  };
  return { renderGameBoard };
})();

const GameBrain = (() => {
  const whichPlayersTurn = (p1, p2) => {
    if (p1.getPlayStatus() === true) {
      return p1.getSymbol();
    } else {
      return p2.getSymbol();
    }
  };

  const checkWin = () => {
    const displayWinner = (player) => {
      displayInfo.textContent = `Player ${player} won!`;
      replayButton.style.opacity = "1";

      if ((player = "X")) {
        displayInfo.style.color = "#fb7185";
      } else {
        displayInfo.style.color = "#38bdf8";
      }
      gameBoardDisplay
        .querySelectorAll("div")
        .forEach((square) =>
          square.removeEventListener("click", clickedSquare)
        );
    };

    for (i = 0; i < 9; i++) {
      if (
        //win horizontally
        GameBoard.gameBoard[0] != "" &&
        GameBoard.gameBoard[0] == GameBoard.gameBoard[1] &&
        GameBoard.gameBoard[1] == GameBoard.gameBoard[2]
      ) {
        displayWinner(GameBoard.gameBoard[0]);
      } else if (
        //win horizontally
        GameBoard.gameBoard[3] != "" &&
        GameBoard.gameBoard[3] == GameBoard.gameBoard[4] &&
        GameBoard.gameBoard[4] == GameBoard.gameBoard[5]
      ) {
        displayWinner(GameBoard.gameBoard[3]);
      } else if (
        //win horizontally
        GameBoard.gameBoard[6] != "" &&
        GameBoard.gameBoard[6] == GameBoard.gameBoard[7] &&
        GameBoard.gameBoard[7] == GameBoard.gameBoard[8]
      ) {
        displayWinner(GameBoard.gameBoard[6]);
      } else if (
        //Win vertically
        GameBoard.gameBoard[0] != "" &&
        GameBoard.gameBoard[0] == GameBoard.gameBoard[3] &&
        GameBoard.gameBoard[3] == GameBoard.gameBoard[6]
      ) {
        displayWinner(GameBoard.gameBoard[0]);
      } else if (
        //Win vertically
        GameBoard.gameBoard[1] != "" &&
        GameBoard.gameBoard[1] == GameBoard.gameBoard[4] &&
        GameBoard.gameBoard[4] == GameBoard.gameBoard[7]
      ) {
        displayWinner(GameBoard.gameBoard[1]);
      } else if (
        //Win vertically
        GameBoard.gameBoard[2] != "" &&
        GameBoard.gameBoard[2] == GameBoard.gameBoard[5] &&
        GameBoard.gameBoard[5] == GameBoard.gameBoard[8]
      ) {
        displayWinner(GameBoard.gameBoard[2]);
      } else if (
        //Win diagonally
        GameBoard.gameBoard[0] != "" &&
        GameBoard.gameBoard[0] == GameBoard.gameBoard[4] &&
        GameBoard.gameBoard[4] == GameBoard.gameBoard[8]
      ) {
        displayWinner(GameBoard.gameBoard[0]);
      } else if (
        //Win diagnoally
        GameBoard.gameBoard[2] != "" &&
        GameBoard.gameBoard[2] == GameBoard.gameBoard[4] &&
        GameBoard.gameBoard[4] == GameBoard.gameBoard[6]
      ) {
        displayWinner(GameBoard.gameBoard[2]);
      } else if (GameBoard.gameBoard.includes("") == false) {
        displayInfo.textContent = `Draw!`;
        displayInfo.style.color = "black";
      } else {
        continue;
      }
    }
  };

  const clickedSquare = (target, p1, p2) => {
    currentSymbol = whichPlayersTurn(p1, p2);
    target.textContent = currentSymbol;

    if (p1.getPlayStatus() === true) {
      target.style.color = "#fb7185";
      p1.changePlayStatus(false);
      p2.changePlayStatus(true);

      displayInfo.textContent = `Player ${p2.getSymbol()}'s turn`;
      displayInfo.style.color = "#38bdf8";
    } else {
      target.style.color = "#38bdf8";
      p1.changePlayStatus(true);
      p2.changePlayStatus(false);

      displayInfo.textContent = `Player ${p1.getSymbol()}'s turn`;
      displayInfo.style.color = "#fb7185";
    }

    target.removeEventListener("click", clickedSquare);
    GameBoard.gameBoard[target.id] = currentSymbol;
    checkWin();
  };

  const startGame = () => {
    changeScreen();
    // generate players
    let p1 = Player("X", true);
    let p2 = Player("O", false);

    //render gameboard
    displayController.renderGameBoard(GameBoard.gameBoard);

    //make squares in game-board react to user input
    gameBoardSquares = gameBoardDisplay.querySelectorAll("div");
    gameBoardSquares.forEach((square) =>
      square.addEventListener("click", (e) => {
        target = e.target;
        clickedSquare(target, p1, p2);
      })
    );
  };

  return { whichPlayersTurn, startGame };
})();

startGameButtons.forEach((button) =>
  button.addEventListener("click", GameBrain.startGame)
);

const changeScreen = () => {
  startScreen.classList.toggle("off");
  gameScreen.classList.toggle("off");
};
returnButton.addEventListener("click", changeScreen);
