const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const gameBoardDisplay = document.querySelector(".game-board");
const startGameButtons = document.querySelectorAll(".game-mode button");
const returnButton = document.querySelector(".return");
const displayInfo = document.querySelector(".game-screen h2");

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
    let squareNum = 0;
    for (const row of gameBoard) {
      for (const col of row) {
        square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", `${squareNum}`);
        square.textContent = col;
        gameBoardDisplay.append(square);
        squareNum++;
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

  const checkWin = () => {
    let xCounter = 0;
    let oCounter = 0;

    for (const row of GameBoard.gameBoard) {
      for (const square of row) {
        console.log(square.textContent);
        if (square.textContent === "X") {
          xCounter++;
        } else if (square.textContent === "O") {
          oCounter++;
        } else {
          continue;
        }
      }
      if (xCounter === 3) {
        console.log("X win");
        break;
      } else if (oCounter === 3) {
        console.log("O win");
        break;
      } else {
        xCounter = 0;
        oCounter = 0;
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

        console.log(e.target.id);
        if (e.target.id < 3) {
          GameBoard.gameBoard[0][e.target.id] = currentSymbol;
        } else if (e.target.id > 2 && e.target.id < 6) {
          GameBoard.gameBoard[1][e.target.id - 3] = currentSymbol;
        } else {
          GameBoard.gameBoard[2][e.target.id - 6] = currentSymbol;
        }
        console.log(GameBoard.gameBoard);

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
