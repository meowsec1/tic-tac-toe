// PLAYER FUNCTIONALITY
const player = function(playerName) {
    const name = playerName;
    let score = 0;

    const incrementScore = function() {
        return ++score;
    }

    const handleWin = function() {
        incrementScore();
        console.log(`${name} wins! Their score is now ${score}.`)
    }

    const getName = function() {
        return name;
    }

    const getScore = function() {
        return score;
    }

    return {
        handleWin,
        getName,
        getScore
    }
}

// GAMEBOARD FUNCTIONALITY
const gameBoard = function(player1, player2) {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    const BOARD_LENGTH = 3;

    let numMoves = 0;
    let currentPlayer = player1;
    let currentTurn = "x";

    const getCurrentTurn = function() {
        return currentTurn;
    }

    const resetGame = function() {
        board.length = 0; // Clear the array
        board.push(
            [null, null, null],
            [null, null, null],
            [null, null, null]
        );
        numMoves = 0;
        currentPlayer = player1;
        currentTurn = "x";
    }

    const changeTurn = function() {
        if (currentTurn === "x") {
            currentTurn = "y";
            currentPlayer = player2;
        }
        else {
            currentTurn = "x"
            currentPlayer = player1;
        }
    }

    const isLegalMove = function(row, column) {
        if ((row < BOARD_LENGTH) && (column < BOARD_LENGTH) && !board[row][column]) {
            console.log("Legal move!");
            return true;
        } else {
            console.log("Illegal move!");
            return false;
        }
    }

    const checkWinner = function(row, column) {

        const checkRowWinner = function(row) {
            for (let i = 0; i < BOARD_LENGTH; i++) {
                if (board[row][i] !== currentTurn) {
                    return false;
                }
            }
            return true;
        }

        const checkColWinner = function(column) {
            for (let i = 0; i < BOARD_LENGTH; i++) {
                if (board[i][column] !== currentTurn) {
                    return false;
                }
            }
            return true;
        }

        const checkDiagWinner = function(row, column) {
            if (row === column) {
                // we are on diag
                for (let i = 0; i < BOARD_LENGTH; i++) {
                    if (board[i][i] !== currentTurn) {
                        return false;
                    } 
                }
                return true;
            }
            return false;
        }

        const checkAntiDiagWinner = function(row, column) {
            if (row + column == BOARD_LENGTH - 1) {
                // we are on anti-diagonal
                for (let i = 0; i < BOARD_LENGTH; i++) {
                    if (board[i][BOARD_LENGTH - 1 - i] !== currentTurn) {
                        return false;
                    } 
                }
                return true;
            }
            return false;
        }

        return (checkRowWinner(row) || checkColWinner(column) || checkDiagWinner(row, column) || checkAntiDiagWinner(row, column))
    }

    const makeMove = function(row, column) {
        if (isLegalMove(row, column)) {
            board[row][column] = currentTurn;
            ++numMoves;

            if (checkWinner(row, column)) {
                currentPlayer.handleWin();
                resetGame();
                return { move: true, result: "win", winner: currentPlayer };
            }

            if (numMoves == 9) {
                resetGame();
                return { move: true, result: "draw" };
            }

            changeTurn();
            return { move: true, result: "continue" };
        }
        return { move: false };
    }

    return {
        makeMove,
        getCurrentTurn,
    }
};


const getPlayerNames = (function() {
    const startForm = document.querySelector("form");

    startForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const players = [];
        const inputs = document.querySelectorAll("input");
        for (const input of inputs) {
            players.push(player(input.value));
        }
        startForm.classList.add("hidden")
        displayBoard(players)    
    })
})();


const displayBoard = function(players) {
    const [player1, player2] = players;
    console.log(player1);

    gameBoardInstance = gameBoard(player1, player2);

    const game = document.querySelector(".game");
    const board = document.querySelector(".board")

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.addEventListener("click", function() {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const moveResult = gameBoardInstance.makeMove(row, col);

            if (moveResult.move) {
                if (gameBoardInstance.getCurrentTurn() === "x") {
                    cell.classList.add("activeX");
                } else {
                    cell.classList.add("activeO");
                }

                // Handle result
                if (moveResult.result === "win") {
                    alert(`${moveResult.winner.getName()} wins!`);

                    // clear board
                    const cells = board.querySelectorAll("div");
                    for (const cell of cells) {
                        console.log("Removed!")
                        cell.removeAttribute('class');
                    }
                } else if (moveResult.result === "draw") {
                    alert("It's a draw!");

                    // clear board
                    const cells = board.querySelectorAll("div");
                    for (const cell of cells) {
                        console.log("Removed!")
                        cell.removeAttribute('class');
                    }
                }
            }

            // Always update stats if needed
            playerOneStats.textContent = `${player1.getName()}'s score: ${player1.getScore()}`;
            playerTwoStats.textContent = `${player2.getName()}'s score: ${player2.getScore()}`;
        });
        board.appendChild(cell);
    }

    game.classList.remove("hidden");

    playerOneStats = document.querySelector(".playerOneStats");
    playerTwoStats = document.querySelector(".playerTwoStats");

    playerOneStats.textContent = `${player1.getName()}'s score: ${player1.getScore()}`;
    playerTwoStats.textContent = `${player2.getName()}'s score: ${player2.getScore()}`;

}

