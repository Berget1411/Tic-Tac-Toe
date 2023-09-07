const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const gameBoardDisplay = document.querySelector(".game-board");
const startGameButtons = document.querySelectorAll(".game-mode button");
const returnButton = document.querySelector(".return");

const GameBrain = (() => {
  const startGame = () => {
    changeScreen();
    displayController.renderGameBoard(GameBoard.gameBoard);
    p1 = Player("X", true);
    p2 = Player("O", false);
  };
  return { startGame };
})();

const GameBoard = (() => {
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  return { gameBoard };
})();

const displayController = (() => {
  const clickHandlerBoard = (e) => {};
  const renderGameBoard = (gameBoard) => {
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

const Player = (symbol, playStatus) => {
  const getSymbol = () => symbol;
  const isPlayerTurn = playStatus;

  return { getSymbol, isPlayerTurn };
};

startGameButtons.forEach((button) =>
  button.addEventListener("click", GameBrain.startGame)
);

const changeScreen = () => {
  startScreen.classList.toggle("off");
  gameScreen.classList.toggle("off");
};
returnButton.addEventListener("click", changeScreen);
