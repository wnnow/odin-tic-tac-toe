// create board

// create check board cell value func if(value = 0) true
// create change cell value func 
// create player1 and player2 (name , mark)
// create switch player each time func 
// check win condition

// create board
const rows = 3
const columns = 3
const board = []
for(let i = 0;i<rows;i++){
    board[i] = []
    for(let j = 0; j<columns;j++){
        board[i].push(0)
    }
}

const getBoard = () => board
//create player
function createPlayer(name,mark){
    return {name,mark}
}
let player1 = createPlayer('Jo1','x')
let player2 = createPlayer('Jane2','o')

// switch player
let currentPlayer = player1

function switchPlayer(){
    currentPlayer = (currentPlayer === player1)?player2:player1;
}
//check cell value
function checkCellValue(board,rowIndex,colIndex,currentPlayer){
    if(board[rowIndex][colIndex]===0){ 
        //run code
        changeCellValue(board,rowIndex,colIndex,currentPlayer)
        switchPlayer()
        getBoard()
        console.log("🚀 ~ file: script.js:41 ~ checkCellValue ~ getBoard():", getBoard())
    } else {
        return
    }
}
//change cell value
function changeCellValue(board,rowIndex,colIndex,changeCellCurrentPlayer){
    board[rowIndex][colIndex] = changeCellCurrentPlayer.mark
}

function checkWinCondition(myBoard) {
  
    
}
// check row match


function checkAnyRowEquality(myBoard,expectedValue) {
    let matchingRows = 0

    for(let rowIndex = 0; rowIndex<myBoard.length; rowIndex++){
        let isRowEqual = true
        for(let colIndex = 0; colIndex<myBoard[rowIndex].length;colIndex++){
         if(myBoard[rowIndex][colIndex] !== expectedValue)  {
            isRowEqual = false;
            break
         } 
        }
        if(isRowEqual){
            matchingRows++
        }
    }
    return matchingRows===1
}

// check column match
function checkAnyColumnEquality(myBoard,expectedValue){
    let matchingColumns = 0
    for(let colIndex = 0; colIndex<myBoard[0].length;colIndex++){
        let isColumnEqual = true
        for(let rowIndex = 0;rowIndex<myBoard.length;rowIndex++){
            if(myBoard[rowIndex][colIndex] !==expectedValue){
                isColumnEqual = false
                break
            }
        }   
        if(isColumnEqual){
            matchingColumns++
        }
    }
    return matchingColumns===1
}


let board2 = [['x', 'x', 'x'], [0, 0, 0], [0, 0, 0]];
board2 = [[0,'x',0],[0,'x',0],[0,'x',0]]


let board3 = [['x', 0, 0], [0, 'x', 0], [0, 0, 'x']];
let reverseBoard = [[0, 0, 'x'], [0, 'x', 0], ['x', 0, 0]];

function checkAnyDiagonalEquality(myBoard,expectedValue){
    let matchingDiagonal = 0
    for(let i = 0;i <myBoard.length;i++){
        let isDiagonals = true 
        console.log(`this is  myBoard[${i}][${i}] = ${myBoard[i][i]}`)
        if(myBoard[i][i]!==expectedValue){
            isDiagonals = false
            break
        }
        if(isDiagonals){
            matchingDiagonal++
        }
    }
    console.log('firstLoop',matchingDiagonal)
    let j = -1
    for(let i = myBoard.length-1;i>=0;i--){
        let isDiagonals = true 
        j++
        console.log(`this is reverse myBoard[${j}][${i}]  = ${myBoard[j][i]}`)
        if(myBoard[j][i]!==expectedValue){
            isDiagonals = false
            break
        }
        if(isDiagonals){
            matchingDiagonal++
        }
    }
    console.log('secondLoop',matchingDiagonal)
    return matchingDiagonal===3
}




// function GameBoard() {
//     const rows = 3   
//     const columns = 3
//     const board = []

//     for(let i = 0;i<rows;i++){
//         board[i] = []
//         for(let j = 0; j<columns;j++){
//             board[i].push(0)
//         }
//     }

//     const getBoard = () => board


    
//     return {getBoard}
// }