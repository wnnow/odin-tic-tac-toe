// create board

// create check board cell value func if(value = 0) true
// create change cell value func 
// create player1 and player2 (name , mark)
// create switch player each time func 
// check win condition


let gameBoard = (
function GameBoard() {
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
    
    let player1 = createPlayer('DefaultPlayer1','x')
    let player2 = createPlayer('DefaultPlayer2','o')
    // switch player
    let currentPlayer = player1
    
    function switchPlayer(){
        currentPlayer = (currentPlayer === player1)?player2:player1;
    }
    //check cell value
    let isTie = false
    function runGame(board,rowIndex,colIndex,currentPlayer){
        if(checkWinCondition(board)) {
            return
        }
        //check cell value if cell empty(equal 0 run code)
        if(board[rowIndex][colIndex]===0){ 
            changeCellValue(board,rowIndex,colIndex,currentPlayer)
            if(checkWinCondition(board)){
                return `${currentPlayer.name}`
            }
            if (checkTie(board)){
                isTie = true
                return isTie
            }
            switchPlayer()
        } else {
            return
        }
    }
    //change cell value
    function changeCellValue(board,rowIndex,colIndex,currentPlayer){
        board[rowIndex][colIndex] = currentPlayer.mark
    }
    
    function checkWinCondition(board) {
        if(checkAnyColumnEquality(board,currentPlayer.mark)
        ||checkAnyDiagonalEquality(board,currentPlayer.mark)
        ||checkAnyRowEquality(board,currentPlayer.mark)
        ) {
            console.log(`${currentPlayer.name} win`)
            return true
        } else {
            console.log(`Please continue`)
            return false
        }
    }
    
    // check row match
    function checkAnyRowEquality(board,expectedValue) {
        let matchingRows = 0
    
        for(let rowIndex = 0; rowIndex<board.length; rowIndex++){
            let isRowEqual = true
            for(let colIndex = 0; colIndex<board[rowIndex].length;colIndex++){
             if(board[rowIndex][colIndex] !== expectedValue)  {
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
    function checkAnyColumnEquality(board,expectedValue){
        let matchingColumns = 0
    
        for(let colIndex = 0; colIndex<board[0].length;colIndex++){
            let isColumnEqual = true
            for(let rowIndex = 0;rowIndex<board.length;rowIndex++){
                if(board[rowIndex][colIndex] !==expectedValue){
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
    
    // check diagonal match
    function checkAnyDiagonalEquality(board,expectedValue){
        let matchingDiagonal = 0
        for(let i = 0;i <board.length;i++){
            let isDiagonals = true 
           
            if(board[i][i]!==expectedValue){
                isDiagonals = false
                break
            }
            if(isDiagonals){
                matchingDiagonal++
            }
        }
    
        let j = -1
        for(let i = board.length-1;i>=0;i--){
            let isDiagonals = true 
            j++
            
            if(board[j][i]!==expectedValue){
                isDiagonals = false
                break
            }
            if(isDiagonals){
                matchingDiagonal++
            }
        }
        return matchingDiagonal===board.length
    }
    
    function checkTie (board){
        let isTie = 0
        for(let i = 0; i<board.length;i++){ 
            if(gameBoard.checkWinCondition(board)) {
                return isTie === 1 
            } else if(board[i].includes(0)){
                isTie = false 
            } else {
                isTie++
            }
            return isTie ===1
        }
    }

   
    return {getBoard,createPlayer,runGame}
})()

//test data
let board2 = [['x', 'x', 'x'], [0, 0, 0], [0, 0, 0]];
let columnsBoard = [[0,'x',0],[0,'x',0],[0,'x',0]]


let board3 = [['x', 0, 0], [0, 'x', 0], [0, 0, 0]];
let reverseBoard = [[0, 0, 'x'], [0, 'x', 0], ['x', 0, 0]];
let tieBoard = [['o', 'o', 'x'], ['x', 'x', 'o'], ['o', 'x', 'o']]; 