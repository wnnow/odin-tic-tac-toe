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

function checkWinCondition() {
    // for(let i = 0;i<rows;i++){

    //     if(board[i].every(cell => cell==='x')
    //     ||board[i].every(cell => cell==='o')){
    //         return true
    //     }
    //     for(let j = 0; j<columns;j++){
           
    //     }
    // }
    
}
function checkRowEquality(board,value) {
    let matchingRows = 0

    for(let rowIndex = 0; rowIndex<board.length; rowIndex++){
        let isRowEqual = true
        for(let colIndex = 0; colIndex<board[rowIndex].length;colIndex++){
         if(board[rowIndex][colIndex] !== value)  {
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

board2 = [['x','x','x'],[0,0,0],[0,0,0]]


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