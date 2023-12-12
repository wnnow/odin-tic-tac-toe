// create board
// create check board cell value func if(value = 0) true
// create change cell value func
// create player1 and player2 (name , mark)
// create switch player each time func
// check win condition

let gameBoard = (function GameBoard() {
  // create board
  const board = [];
  const confirmPlayerNameBtn = document.querySelector(
    "button#confirm_player_name"
  );
  function createBoard() {
    const rows = 3;
    const columns = 3;
    const container = document.querySelector(".container");

    for (let i = 0; i < rows; i++) {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row-container");
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        const cellElement = document.createElement("span");
        cellElement.setAttribute("data-row", i);
        cellElement.setAttribute("data-col", j);
        // cellElement.textContent = "close";
        cellElement.classList.add("cell", "material-symbols-outlined");

        rowElement.appendChild(cellElement);
        board[i].push(0);
      }
      container.appendChild(rowElement);
    }
  }
  createBoard();

  const getBoard = () => board;

  //create player

  function createPlayer(name, mark) {
    return { name, mark };
  }

  let player1;
  let player2;
  let currentPlayer;
  let getPlayer1 = () => player1;
  let getPlayer2 = () => player2;

  function assignPlayer1(name, mark) {
    if (!player1) {
      player1 = createPlayer(name, mark);
      currentPlayer = player1;
    } else {
      console.log(`player1 already assign`);
      return;
    }
  }

  // const playerContainer = document.querySelector(".player-container");
  // const playerContainerChild = Array.from(playerContainer.children);

  // playerContainerChild.forEach((element) =>
  //   element.addEventListener("click", (e) => {
  //     console.log(e.target.dataset);
  //     assignPlayer1("Default");
  //   })
  // );

  function assignPlayer2(name, mark) {
    if (!player2) {
      player2 = createPlayer(name, mark);
    } else {
      console.log(`player2 already assign`);
      return;
    }
  }

  function changePlayerName() {
    const player1Input = document.querySelector("input#player1_name");
    const player2Input = document.querySelector("input#player2_name");
    const player1Name = document.querySelector("#player1_score_name");
    const player2Name = document.querySelector("#player2_score_name");
    const formSection = document.querySelector(".form-section");

    if (player1Input.value === "" || player2Input.value === "") {
      return `Please input player name`;
    } else {
      assignPlayer1(player1Input.value, "x");
      assignPlayer2(player2Input.value, "o");
      player1Name.textContent = player1Input.value;
      player2Name.textContent = player2Input.value;
      formSection.style.display = "none";
      announcePlayerTurn(currentPlayer.mark);
    }
  }

  confirmPlayerNameBtn.addEventListener("click", (e) => {
    e.preventDefault;
    changePlayerName();
  });

  const turnText = document.querySelector(".player-turn-announce");

  function announcePlayerTurn(text) {
    turnText.textContent = `${text} ' turn`;
  }

  // switch player

  let getCurrentPlayer = () => currentPlayer;

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    announcePlayerTurn(currentPlayer.mark);
  }

  //check cell value
  let isTie = false;

  function runGame(board, rowIndex, colIndex, currentPlayer, target) {
    if (checkWinCondition(board)) {
      return;
    }
    //check cell value if cell empty(equal 0 run code)
    if (board[rowIndex][colIndex] === 0) {
      changeCellValue(board, rowIndex, colIndex, currentPlayer, target);
      if (checkWinCondition(board)) {
        return `${currentPlayer.name}`;
      }
      if (checkTie(board)) {
        isTie = true;
        console.log(`Tie`);
        return isTie;
      }
      switchPlayer();
    } else {
      return;
    }
  }

  Array.from(document.querySelectorAll(".cell")).forEach((cell) =>
    cell.addEventListener("click", (e) => {
      runGame(
        gameBoard.getBoard(),
        e.target.dataset.row,
        e.target.dataset.col,
        gameBoard.getCurrentPlayer(),
        e
      );
    })
  );

  //change cell value
  function changeCellValue(board, rowIndex, colIndex, currentPlayer, target) {
    let cellText;
    if (currentPlayer.mark === "x") {
      // cellText = "close";
      target.target.textContent = "close";
    } else {
      // cellText = "circle";
      target.target.textContent = "circle";
    }
    // board[rowIndex][colIndex] = currentPlayer.mark;
    board[rowIndex][colIndex] = currentPlayer.mark;
  }

  function checkWinCondition(board) {
    console.log("checkwin");
    if (
      checkAnyColumnEquality(board, currentPlayer.mark) ||
      checkAnyDiagonalEquality(board, currentPlayer.mark) ||
      checkAnyRowEquality(board, currentPlayer.mark)
    ) {
      console.log(`${currentPlayer.name} win`);
      return true;
    } else {
      console.log(`Please continue`);
      return false;
    }
  }

  // check row match
  function checkAnyRowEquality(board, expectedValue) {
    let matchingRows = 0;

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      let isRowEqual = true;
      for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
        if (board[rowIndex][colIndex] !== expectedValue) {
          isRowEqual = false;
          break;
        }
      }
      if (isRowEqual) {
        matchingRows++;
      }
    }

    return matchingRows === 1;
  }

  // check column match
  function checkAnyColumnEquality(board, expectedValue) {
    let matchingColumns = 0;

    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
      let isColumnEqual = true;
      for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        if (board[rowIndex][colIndex] !== expectedValue) {
          isColumnEqual = false;
          break;
        }
      }
      if (isColumnEqual) {
        matchingColumns++;
      }
    }

    return matchingColumns === 1;
  }

  // check diagonal match
  function checkAnyDiagonalEquality(board, expectedValue) {
    let matchingDiagonal = 0;
    for (let i = 0; i < board.length; i++) {
      let isDiagonals = true;
      if (board[i][i] !== expectedValue) {
        isDiagonals = false;
        break;
      }
      if (isDiagonals) {
        matchingDiagonal++;
      }
    }
    let j = -1;
    for (let i = board.length - 1; i >= 0; i--) {
      let isDiagonals = true;
      j++;

      if (board[j][i] !== expectedValue) {
        isDiagonals = false;
        break;
      }
      if (isDiagonals) {
        matchingDiagonal++;
      }
    }

    return matchingDiagonal === board.length;
  }

  function checkTie(board) {
    let isTie = 0;
    for (let i = 0; i < board.length; i++) {
      if (checkWinCondition(board)) {
        return isTie === 1;
      } else if (board[i].includes(0)) {
        console.log(`include 0`);
        isTie = false;
      } else {
        console.log(`Tie++`);
        isTie++;
      }
    }
    return isTie === board.length;
  }

  return {
    getBoard,
    runGame,
    assignPlayer1,
    getPlayer1,
    assignPlayer2,
    getPlayer2,
    switchPlayer,
    getCurrentPlayer,
    checkTie,
    checkAnyRowEquality,
    checkAnyDiagonalEquality,
    checkAnyColumnEquality,
  };
})();

//test data
let board2 = [
  ["x", "x", "x"],
  [0, 0, 0],
  [0, 0, 0],
];
let columnsBoard = [
  [0, "x", 0],
  [0, "x", 0],
  [0, "x", 0],
];

let board3 = [
  ["x", 0, 0],
  [0, "x", 0],
  [0, 0, 0],
];
let reverseBoard = [
  [0, 0, "x"],
  [0, "x", 0],
  ["x", 0, 0],
];
let tieBoard = [
  ["o", "o", "x"],
  ["x", "x", "o"],
  ["o", "x", "o"],
];
let reverseBoard2 = [
  ["x", "o", "x"],
  ["o", "x", "o"],
  ["x", "o", "x"],
];

// gameBoard.assignPlayer1("Miyuki", "x");
// gameBoard.assignPlayer2("Shin", "o");
// gameBoard.runGame(gameBoard.getBoard(), 1, 1, gameBoard.getCurrentPlayer());
// gameBoard.runGame(gameBoard.getBoard(), 0, 0, gameBoard.getCurrentPlayer());
// gameBoard.runGame(gameBoard.getBoard(), 2, 0, gameBoard.getCurrentPlayer());
// gameBoard.runGame(gameBoard.getBoard(), 0, 2, gameBoard.getCurrentPlayer());
// gameBoard.runGame(gameBoard.getBoard(), 0, 1, gameBoard.getCurrentPlayer());
// gameBoard.runGame(gameBoard.getBoard(), 2, 1, gameBoard.getCurrentPlayer());
// gameBoard.runGame(gameBoard.getBoard(), 1, 2, gameBoard.getCurrentPlayer());
// gameBoard.runGame(gameBoard.getBoard(), 2, 2, gameBoard.getCurrentPlayer());
// gameBoard.runGame(gameBoard.getBoard(), 1, 0, gameBoard.getCurrentPlayer());
