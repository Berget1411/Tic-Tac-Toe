const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const gameBoardDisplay = document.querySelector(".game-board");
const startGameButtons = document.querySelectorAll(".game-mode button");
const returnButton = document.querySelector(".return");

const GameBoard = (() => {
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
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
    for (const row of gameBoard) {
      for (const col of row) {
        square = document.createElement("div");
        square.classList.add("square");
        square.textContent = col;
        gameBoardDisplay.append(square);
      }
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
        e.target.textContent = whichPlayersTurn(p1, p2);

        if (p1.getPlayStatus() === true) {
          p1.changePlayStatus(false);
          p2.changePlayStatus(true);
        } else {
          p1.changePlayStatus(true);
          p2.changePlayStatus(false);
        }

        e.target.removeEventListener("click", clickedSquare);
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
