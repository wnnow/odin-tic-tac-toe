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
        cellElement.classList.add("cell", "material-symbols-outlined");
        rowElement.appendChild(cellElement);
        board[i].push(0);
      }
      container.appendChild(rowElement);
    }
  }
  createBoard();

  const getBoard = () => board;

  //clear board
  function clearBoard() {
    const container = document.querySelector(".container");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  const restartButton = document.querySelector("#clear_board");

  restartButton.addEventListener("click", () => {
    clearBoard();
    createBoard();
    addCellClickEvent();
    switchPlayer();
    announcePlayerTurn(currentPlayer.mark);
  });

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

  function addCellClickEvent() {
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
  }

  addCellClickEvent();

  //change cell value
  function changeCellValue(board, rowIndex, colIndex, currentPlayer, target) {
    if (currentPlayer.mark === "x") {
      target.target.textContent = "close";
    } else {
      target.target.textContent = "circle";
    }
    board[rowIndex][colIndex] = currentPlayer.mark;
  }

  function checkWinCondition(board) {
    console.log("checkwin");
    if (
      checkAnyColumnEquality(board, currentPlayer.mark) ||
      checkAnyDiagonalEquality(board, currentPlayer.mark) ||
      checkAnyRowEquality(board, currentPlayer.mark)
    ) {
      turnText.textContent = `${currentPlayer.name} win!`;
      return true;
    } else {
      console.log(`Please continue`);
      return false;
    }
  }
  let player1Score = 0;
  let player2Score = 0;

  function updatePlayerScore(playerMark) {
    const player1ScoreElement = document.querySelector("#x_score");
    const player2ScoreElement = document.querySelector("#o_score");
    if (playerMark === "x") {
      player1Score++;
      player1ScoreElement.textContent = player1Score;
    } else if (playerMark === "o") {
      player2Score++;
      player2ScoreElement.textContent = player2Score;
    }
  }

  const matchingCellArr = [];
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
        matchingCellArr[colIndex] = [rowIndex, colIndex];
      }
      if (isRowEqual) {
        matchingRows++;
      }
    }
    if (matchingRows === 1) {
      return true;
    }
    matchingCellArr.splice(0, matchingCellArr.length);
    return false;
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
        matchingCellArr[rowIndex] = [rowIndex, colIndex];
      }
      if (isColumnEqual) {
        matchingColumns++;
      }
    }

    if (matchingColumns === 1) {
      return true;
    }
    matchingCellArr.splice(0, matchingCellArr.length);
    return false;
  }

  // check diagonal match
  function checkAnyDiagonalEquality(board, expectedValue) {
    let matchingDiagonalForward = 0;
    let matchingDiagonalBackward = 0;

    for (let i = 0; i < board.length; i++) {
      let isDiagonals = true;
      if (board[i][i] !== expectedValue) {
        isDiagonals = false;
        break;
      }
      if (isDiagonals) {
        matchingCellArr[i] = [i, i];
        matchingDiagonalForward++;
      }
    }
    if (matchingDiagonalForward === board.length) {
      return true;
    }
    matchingCellArr.splice(0, matchingCellArr.length);

    let j = -1;
    for (let i = board.length - 1; i >= 0; i--) {
      let isDiagonals = true;
      j++;

      if (board[j][i] !== expectedValue) {
        isDiagonals = false;
        break;
      }
      if (isDiagonals) {
        matchingCellArr[j] = [j, i];
        matchingDiagonalBackward++;
      }
    }
    if (matchingDiagonalBackward === board.length) {
      return true;
    } else {
      matchingCellArr.splice(0, matchingCellArr.length);
      return false;
    }
  }

  //check Tie
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

  function updateWinnerCellColor() {
    Array.from(document.querySelectorAll(".cell")).forEach((cell) => {
      for (let i = 0; i < gameBoard.matchingCellArr.length; i++) {
        let tempCell = [+cell.dataset.row, +cell.dataset.col];
        if (
          gameBoard.matchingCellArr.some(
            (subArray) =>
              subArray.length === tempCell.length &&
              subArray.every((value, index) => value === tempCell[index])
          )
        ) {
          cell.style.backgroundColor = "salmon";
          cell.style.color = "white";
        }
      }
    });
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
        updatePlayerScore(currentPlayer.mark);
        updateWinnerCellColor();
        return `${currentPlayer.name}`;
      }
      if (checkTie(board)) {
        isTie = true;
        turnText.textContent = "Tie!";
        return isTie;
      }
      switchPlayer();
    } else {
      return;
    }
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
    matchingCellArr,
  };
})();
