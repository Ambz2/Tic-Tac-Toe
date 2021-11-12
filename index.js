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
            gameController.nextTurn()
        }
    }
    
    const insertPlay = function(xcoord, ycoord) {
        const turn = gameController.checkTurn()
        console.log(turn)
        if (turn == 'playerOne') {
            board[xcoord][ycoord] = 1
        } else {
            board[xcoord][ycoord] = 2
        }
    }

    const convertBinary = function(i,j) {
        if (board[i][j] == '1') {
            return 'x'
        } else if (board[i][j] == '2') {
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

    const checkWins = function() {
        
    }



    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => cell.addEventListener('click', clickEvent))

    return {updateDisplay, clearBoard}

})()
    

gameBoard.updateDisplay()

const Player = (name, mark) => {
    const playerName = name
    const playerMark = mark
    const wins = 0
    return {playerName, wins, mark}
}


let playerOne
let playerTwo

const gameController  = (function() {
    const openModalBtn = document.querySelector('.openmodal')
    const startGameBtn = document.querySelector('#startgame')
    const modal = document.querySelector('.modal')
    const closeModalBtn = document.querySelector('.closemodal')
    const nameOne = document.querySelector('#name1') 
    const nameTwo = document.querySelector('#name2') 
    
    const startGame = function() {
        modal.style.display = 'none'
        playerOne = Player(nameOne.value, 'x')
        playerTwo = Player(nameTwo.value, 'o')
        console.log(playerOne)
    }
    
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex'
    })

    closeModalBtn.addEventListener('click', () => {
        modal.style.display='none'
    } )

    startGameBtn.addEventListener('click', startGame)
    
    let turn = 1
    const nextTurn = function()  {
        turn += 1
        console.log(turn)
    }

    const resetTurn = function() {
        turn = 1
    }

    const checkTurn = function() {
        if (turn % 2 == 1) {
            return 'playerOne'
        }
        if (turn % 2 == 0) {
            return 'playerTwo'
        }
    }
    return {checkTurn, nextTurn}
    

})()



