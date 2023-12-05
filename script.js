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
function runGame(board,rowIndex,colIndex,currentPlayer){
    //check cell value if cell empty(equal 0 run code)
    if(board[rowIndex][colIndex]===0){ 
        changeCellValue(board,rowIndex,colIndex,currentPlayer)
        if(checkWinCondition(board)){
            return `${currentPlayer.name}`
        }
        switchPlayer()
    } else {
        return
    }
}
//change cell value
function changeCellValue(board,rowIndex,colIndex,changeCellCurrentPlayer){
    board[rowIndex][colIndex] = changeCellCurrentPlayer.mark
}

function checkWinCondition(myBoard) {
  
    if(checkAnyColumnEquality(myBoard,currentPlayer.mark)
    ||checkAnyDiagonalEquality(myBoard,currentPlayer.mark)
    ||checkAnyRowEquality(myBoard,currentPlayer.mark)
    ) {
        console.log(`${currentPlayer.name} win`)
        return true
    } else {
        console.log(`Please continue`)
        return false
    }
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
let columnsBoard = [[0,'x',0],[0,'x',0],[0,'x',0]]


let board3 = [['x', 0, 0], [0, 'x', 0], [0, 0, 0]];
let reverseBoard = [[0, 0, 'x'], [0, 'x', 0], ['x', 0, 0]];

function checkAnyDiagonalEquality(myBoard,expectedValue){
    let matchingDiagonal = 0
    for(let i = 0;i <myBoard.length;i++){
        let isDiagonals = true 
       
        if(myBoard[i][i]!==expectedValue){
            isDiagonals = false
            break
        }
        if(isDiagonals){
            matchingDiagonal++
        }
    }

    let j = -1
    for(let i = myBoard.length-1;i>=0;i--){
        let isDiagonals = true 
        j++
        
        if(myBoard[j][i]!==expectedValue){
            isDiagonals = false
            break
        }
        if(isDiagonals){
            matchingDiagonal++
        }
    }
  
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