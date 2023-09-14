const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const gameBoardDisplay = document.querySelector(".game-board");
const vsPlayerButton = document.querySelectorAll(".vs-player");
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
  const resetGame = () => {
    GameBoard.gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameBoardDisplay.textContent = "";
    displayInfo.textContent = "Player X's turn";
    displayInfo.style.color = "#fb7185";
  };
  const whichPlayersTurn = (p1, p2) => {
    if (p1.getPlayStatus() === true) {
      return p1.getSymbol();
    } else {
      return p2.getSymbol();
    }
  };

  const checkWin = () => {
    const displayWinner = (player) => {
      replayButton.style.opacity = "1";

      //remove eventlistener from squares
      gameBoardDisplay
        .querySelectorAll("div")
        .forEach((div) => div.replaceWith(div.cloneNode(true)));

      if (player != "draw") {
        displayInfo.textContent = `Player ${player} won!`;

        if (player == "X") {
          displayInfo.style.color = "#fb7185";
        } else {
          displayInfo.style.color = "#38bdf8";
        }
      } else {
        displayInfo.textContent = `Draw!`;
        displayInfo.style.color = "black";
      }
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
        displayWinner("draw");
      } else {
        continue;
      }
    }
    return {};
  };

  const startGame = () => {
    // generate players
    let p1 = Player("X", true);
    let p2 = Player("O", false);
    resetGame();

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

const changeScreen = () => {
  startScreen.classList.toggle("off");
  gameScreen.classList.toggle("off");
  GameBrain.startGame();
};

vsPlayerButton.forEach((button) =>
  button.addEventListener("click", changeScreen)
);

returnButton.addEventListener("click", changeScreen);

replayButton.addEventListener("click", GameBrain.startGame);
