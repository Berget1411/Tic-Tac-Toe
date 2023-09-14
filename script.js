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

  return { getSymbol, getPlayStatus };
};

const displayController = (() => {
  const clickHandlerBoard = (e) => {
    e.target.textContent = GameBrain.whichPlayersTurn();
  };
  const renderGameBoard = (gameBoard) => {
    //reset gameBoard
    gameBoardDisplay.textContent = "";
    for (const row of gameBoard) {
      for (const col of row) {
        square = document.createElement("div");
        square.classList.add("square");
        square.textContent = col;
        square.addEventListener("click", clickHandlerBoard);
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

  return { whichPlayersTurn };
})();

const startGame = () => {
  changeScreen();
  let p1 = Player("X", true);
  let p2 = Player("O", false);
  displayController.renderGameBoard(GameBoard.gameBoard);
};

startGameButtons.forEach((button) =>
  button.addEventListener("click", startGame)
);

const changeScreen = () => {
  startScreen.classList.toggle("off");
  gameScreen.classList.toggle("off");
};
returnButton.addEventListener("click", changeScreen);
