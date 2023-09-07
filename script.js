const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const gameBoardDisplay = document.querySelector(".game-board");
const startGameButtons = document.querySelectorAll(".game-mode button");
const returnButton = document.querySelector(".return");

const GameBoard = (() => {
  const gameBoard = [
    ["X", "O", "X"],
    ["X", "O", "O"],
    ["O", "X", "X"],
  ];
  return { gameBoard };
})();

// const player = () => {
//     pass;
// }

// const displayController = (() => {
//   pass;
// })()

const startGame = () => {
  changeScreen();
  renderGameBoard(GameBoard.gameBoard);
};

startGameButtons.forEach((button) =>
  button.addEventListener("click", startGame)
);

const changeScreen = () => {
  startScreen.classList.toggle("off");
  gameScreen.classList.toggle("off");
};
returnButton.addEventListener("click", changeScreen);

const renderGameBoard = (gameBoard) => {
  for (const row of gameBoard) {
    for (const col of row) {
      square = document.createElement("div");
      square.classList.add("square");
      gameBoardDisplay.append(square);
    }
  }
};
