const gameBoard = (function() {
    'use strict';
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    
    let gameOver = false

    const clickEvent = function() {
        const coords = this.dataset.coord
        const array = coords.split(",")
        const xcoord = array[0]
        const ycoord = array[1]
        if (board[xcoord][ycoord] == false && gameOver == false) {
            gameController.updateTurn()
            insertPlay(xcoord, ycoord)
            updateDisplay()
            gameController.nextTurn()
            checkWins()
            gameController.updateTurn()
        }
    }
    
    const insertPlay = function(xcoord, ycoord) {
        const turn = gameController.checkTurn()

        if (turn == playerOne) {
            board[xcoord][ycoord] = 1
        } else {
            board[xcoord][ycoord] = 4
        }
    }

    const convertBinary = function(i,j) {
        if (board[i][j] == '1') {
            return playerOne.mark
        } else if (board[i][j] == '4') {
            return playerTwo.mark
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

    const resetBoard = function() {
        for (let i=0; i < 3; i++) {
            for (let j=0;j < 3; j++) {
                board[i][j] = ""
            }
        }
        updateDisplay() 
        gameOver = false
    }

    const checkWins = function() {
        for (let i=0; i<3; i++) {
            let total = board[i].reduce((a,b) => Number(a)+Number(b), 0)
            if (total == 3) {
                console.log('Player One wins')
                gameOver = true
                gameController.gameOver(playerOne)
            }
            if (total == 12) {
                console.log('Player Two wins')
                gameOver = true
                gameController.gameOver(playerTwo)
            }
        }
        for (let j=0; j<3; j++) {
            let columnArray = [board[0][j],board[1][j],board[2][j]]
            let total = columnArray.reduce((a,b) => Number(a)+Number(b), 0)
            if (total == 3) {
                console.log('Player One wins')
                gameOver = true
                gameController.gameOver(playerOne)
            }
            if (total == 12) {
                console.log('Player Two wins')
                gameOver = true
                gameController.gameOver(playerTwo)
            }
        }
        
        let diagArray1 = [board[0][0],board[1][1],board[2][2]]
        let diagArray2 = [board[0][2], board[1][1], board[2][0]]
        let reducedDiagArray1 = diagArray1.reduce((a,b) => Number(a)+Number(b), 0)
        let reducedDiagArray2 = diagArray2.reduce((a,b) => Number(a) + Number(b))
        if (reducedDiagArray1 == 3 || reducedDiagArray2 == 3) {
            console.log('Player One Wins')
            gameOver = true
            gameController.gameOver(playerOne)
        }
        if (reducedDiagArray2 == 12 || reducedDiagArray2 == 12) {
            console.log('Player Two Wins')
            gameOver = true
            gameController.gameOver(playerTwo)
        }
        
        if (turn == 10) {gameController.gameOver('Tie')}
        
    }  



    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => cell.addEventListener('click', clickEvent))

    return {updateDisplay, resetBoard}

})()
    



const Player = (name, mark) => {
    const playerName = name
    const playerMark = mark
    let wins = 0

    
    return {playerName, wins, mark, }
}


let playerOne
let playerTwo
let turn = 1

const gameController  = (function() {
    const openModalBtn = document.querySelector('.openmodal')
    const startGameBtn = document.querySelector('#startgame')
    const modal = document.querySelector('.modal')
    const closeModalBtn = document.querySelector('.closemodal')
    const nameOne = document.querySelector('#name1') 
    const nameTwo = document.querySelector('#name2') 
    const container = document.querySelector('.container')
    const gameOverModal = document.querySelector('.gameover')
    const tryAgainBtn = document.querySelector('#tryagain')

    

    const startGame = function() {
        modal.style.display = 'none'
        playerOne = Player(nameOne.value, 'x')
        playerTwo = Player(nameTwo.value, 'o')
        container.style.display = 'grid'
        updateTurn()
    }
    
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex'
    })

    closeModalBtn.addEventListener('click', () => {
        modal.style.display='none'
    } )

    startGameBtn.addEventListener('click', startGame)
    
    
    const nextTurn = function()  {
        turn += 1
        return turn
    }

    const resetTurn = function() {
        turn = 1
    }

    const checkTurn = function() {
        if (turn % 2 == 1) {
            return playerOne
            
        }
        if (turn % 2 == 0) {
            return playerTwo
        }
    }

    const addWin = function(player) {
        player.wins += 1
    }

    const updateTurn = function() {
        const turnsHeader = document.querySelector('#turn')
        const currentPlayer = checkTurn()
        console.log(currentPlayer)
        turnsHeader.textContent = `Turn: ${currentPlayer.playerName}, ${currentPlayer.mark}`
    }

    const gameOver = function(winner) {
        gameOverModal.style.display = 'grid'
        
        const winnerDisplay = document.querySelector('#winner')
        addWin(winner)

        if (winner == playerOne || playerTwo) {
            winnerDisplay.textContent = `Winner: ${winner.playerName} Wins: ${winner.wins}`
        } 
        if (winner == 'Tie') {
            winnerDisplay.textContent = `It's a tie!`
        }

    }

    

    const tryAgain = function() {
        gameOverModal.style.display = 'none'
        gameBoard.resetBoard()
    }

    tryAgainBtn.addEventListener('click', tryAgain)

    return {checkTurn, nextTurn, addWin, updateTurn, gameOver}
    

})()



