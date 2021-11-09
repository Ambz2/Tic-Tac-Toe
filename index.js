const gameBoard = (function() {
    'use strict';
    const board = [
        ["","",""],
        ["","",""],
        ["1","",""]
    ]

    const cells = document.querySelectorAll('.cell')


    const clickEvent = function() {
        console.log('hi')
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

    cells.forEach(cell => cell.addEventListener('click', clickEvent))

    
    return {updateDisplay}
    

})()
    

gameBoard.updateDisplay()
