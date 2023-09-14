const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const gameBoardDisplay = document.querySelector(".game-board");
const startGameButtons = document.querySelectorAll(".game-mode button");
const returnButton = document.querySelector(".return");
const displayInfo = document.querySelector(".game-screen h2");

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
    for (i = 0; i < 9; i++) {
      if (
        GameBoard.gameBoard[i] != "" &&
        GameBoard.gameBoard[i] == GameBoard.gameBoard[i + 1] &&
        GameBoard.gameBoard[i + 2]
      ) {
        console.log(`${GameBoard.gameBoard[i]} Win`);
      } else if (
        GameBoard.gameBoard[i] != "" &&
        GameBoard.gameBoard[i] == GameBoard.gameBoard[i + 3] &&
        GameBoard.gameBoard[i + 3] == GameBoard.gameBoard[i + 6]
      ) {
        console.log(`${GameBoard.gameBoard[i]} Win`);
      } else if (
        GameBoard.gameBoard[i] != "" &&
        GameBoard.gameBoard[i] == GameBoard.gameBoard[i + 4] &&
        GameBoard.gameBoard[i + 4] == GameBoard.gameBoard[i + 8]
      ) {
        console.log(`${GameBoard.gameBoard[i]} Win`);
      } else {
        continue;
      }
    }
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
      square.addEventListener("click", function clickedSquare(e) {
        currentSymbol = whichPlayersTurn(p1, p2);
        e.target.textContent = currentSymbol;

        if (p1.getPlayStatus() === true) {
          e.target.style.color = "#fb7185";
          p1.changePlayStatus(false);
          p2.changePlayStatus(true);

          displayInfo.textContent = `Player ${p2.getSymbol()}'s turn`;
          displayInfo.style.color = "#38bdf8";
        } else {
          e.target.style.color = "#38bdf8";
          p1.changePlayStatus(true);
          p2.changePlayStatus(false);

          displayInfo.textContent = `Player ${p1.getSymbol()}'s turn`;
          displayInfo.style.color = "#fb7185";
        }

        e.target.removeEventListener("click", clickedSquare);
        GameBoard.gameBoard[e.target.id] = currentSymbol;
        checkWin();
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
