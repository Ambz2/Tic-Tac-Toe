const gameBoard = (function() {
    'use strict';
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    


    const clickEvent = function() {
        const coords = this.dataset.coord
        const array = coords.split(",")
        const xcoord = array[0]
        const ycoord = array[1]
        if (board[xcoord][ycoord] == false) {
            insertPlay(xcoord, ycoord)
            updateDisplay()
        }
    }
    
    const insertPlay = function(xcoord, ycoord) {
        board[xcoord][ycoord] = "1"
    }

    const convertBinary = function(i,j) {
        if (board[i][j] == '1') {
            return 'x'
        } else if (board[i][j] == '0') {
            return 'o'
        }   else {return} 
    }
    
    const updateDisplay = function() {
        let cell = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[cell].textContent = convertBinary(i,j)
                cell++
            }
        }
    }

    const clearBoard = function() {
        for (let i=0; i < 3; i++) {
            for (let j=0;j < 3; j++) {
                board[i][j] = ""
            }
        }
        updateDisplay() 
    }

    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => cell.addEventListener('click', clickEvent))

    return {updateDisplay, clearBoard}

})()
    

gameBoard.updateDisplay()



const gameController  = (function() {
    const startGameBtn = document.querySelector('.startgame')
    
    const startGame = function() {
        modal.style.display = 'flex'
        
    }
    
    startGameBtn.addEventListener('click', startGame)
    const modal = document.querySelector('.modal')

    

})()

const Player = (mark) => {
    const playerMark = mark
    return {playerMark}
}