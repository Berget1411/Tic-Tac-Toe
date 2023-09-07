const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const startGameButtons = document.querySelectorAll(".game-mode button");

const returnButton = document.querySelector(".return");

const startGame = () => {
  changeScreen();
};
startGameButtons.forEach((button) =>
  button.addEventListener("click", startGame)
);

const changeScreen = () => {
  startScreen.classList.toggle("off");
  gameScreen.classList.toggle("off");
};
returnButton.addEventListener("click", changeScreen);

const Gameboard = (() => {
  const gameboard = [
    ["X", "O", "X"],
    ["X", "O", "O"],
    ["O", "X", "X"],
  ];
})();
