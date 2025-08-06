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

    return {
        handleWin
    }
}

const player1 = player("Alice");
const player2 = player("Bob");

const gameBoard = (function(player1, player2) {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    const BOARD_LENGTH = 3;
    let currentPlayer = player1;
    let currentTurn = "x"

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

        if (checkRowWinner(row) || checkColWinner(column)) {
            return true;
        }

    }

    const makeMove = function(row, column) {
        if (isLegalMove(row, column)) {
            console.log(board);
            board[row][column] = currentTurn;

            if (checkWinner(row, column)) {
                currentPlayer.handleWin();
            } 
            else {
            }
            
            changeTurn();
        }

    }
    return {
        makeMove
    }
})(player1, player2);


gameBoard.makeMove(0, 0);
gameBoard.makeMove(1, 0);
gameBoard.makeMove(0, 1);
gameBoard.makeMove(1, 1);
gameBoard.makeMove(2, 0);
gameBoard.makeMove(1, 2);
